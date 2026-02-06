import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cloud, CloudRain, CloudLightning, Sun, Wind, MapPin,
    Loader2, Search, ChevronDown, Check, Droplets,
    Thermometer, SunMedium, Calendar, Clock,
    Sunrise, Sunset, Waves, Gauge, Activity
} from 'lucide-react';

// --- Types & Constants ---
interface WeatherData {
    current: {
        temp: number;
        feels_like: number;
        humidity: number;
        wind_speed: number;
        uv_index: number;
        condition: string;
        icon: React.ReactNode;
        is_day: boolean;
        pressure: number;
        visibility: number;
        sunrise: string;
        sunset: string;
    };
    air_quality: { aqi: number; label: string; color: string; };
    marine: { wave_height: number; wave_period: number; };
    hourly: Array<{ time: string; temp: number; icon: React.ReactNode; }>;
    daily: Array<{ day: string; maxTemp: number; minTemp: number; condition: string; icon: React.ReactNode; }>;
    location: string;
}

interface City { name: string; lat: number; lon: number; }

const INDONESIA_CITIES: City[] = [
    { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { name: "Bandung", lat: -6.9175, lon: 107.6191 },
    { name: "Surabaya", lat: -7.2575, lon: 112.7521 },
    { name: "Medan", lat: 3.5952, lon: 98.6722 },
    { name: "Semarang", lat: -6.9667, lon: 110.4167 },
    { name: "Makassar", lat: -5.1476, lon: 119.4327 },
    { name: "Denpasar", lat: -8.6705, lon: 115.2126 },
    { name: "Yogyakarta", lat: -7.7956, lon: 110.3695 },
    { name: "Banjarmasin", lat: -3.3167, lon: 114.5917 },
    { name: "Balikpapan", lat: -1.2650, lon: 116.8312 },
    { name: "Manado", lat: 1.4748, lon: 124.8421 },
    { name: "Jayapura", lat: -2.5337, lon: 140.7181 },
    { name: "Ambon", lat: -3.6547, lon: 128.1906 },
    { name: "Kupang", lat: -10.1707, lon: 123.6070 },
    { name: "Mataram", lat: -8.5767, lon: 116.0961 },
    { name: "Pontianak", lat: -0.0263, lon: 109.3425 },
    { name: "Banten", lat: -6.4444, lon: 106.0623 },
    { name: "Pandeglang", lat: -6.3084, lon: 106.1067 },
];

const getAQIInfo = (aqi: number) => {
    if (aqi <= 50) return { label: "EXCELLENT", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (aqi <= 100) return { label: "GOOD", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" };
    if (aqi <= 200) return { label: "MODERATE", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" };
    return { label: "POOR", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" };
};

const getWeatherIcon = (code: number, isDay: boolean = true) => {
    const sizeCls = "w-full h-full";
    if (code === 0) return <Sun className={`${sizeCls} ${isDay ? 'text-yellow-400' : 'text-blue-200'}`} />;
    if (code >= 1 && code <= 3) return <Cloud className={`${sizeCls} text-slate-400`} />;
    if (code >= 45 && code <= 48) return <Waves className={`${sizeCls} text-slate-500`} />;
    if (code >= 51 && code <= 67) return <CloudRain className={`${sizeCls} text-blue-400`} />;
    if (code >= 95) return <CloudLightning className={`${sizeCls} text-purple-400`} />;
    return <Sun className={`${sizeCls} text-yellow-500`} />;
};

const getConditionText = (code: number) => {
    if (code === 0) return "CLEAR";
    if (code >= 1 && code <= 3) return "CLOUDY";
    if (code >= 45 && code <= 48) return "FOGGY";
    if (code >= 51 && code <= 67) return "RAINY";
    if (code >= 95) return "STORMY";
    return "STABLE";
};

// --- Sub-Components ---

const BentoGridItem = ({ title, icon, value, subValue, colorClass = "text-white" }: { title: string, icon: React.ReactNode, value: string | number, subValue?: string, colorClass?: string }) => (
    <div className="bg-white/5 p-4 rounded-[1.5rem] border border-white/5 hover:border-cyan-500/20 transition-all group">
        <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded-lg bg-white/5 group-hover:scale-110 transition-transform">{icon}</div>
            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{title}</span>
        </div>
        <div className="flex items-baseline gap-1.5">
            <span className={`text-xl font-black ${colorClass}`}>{value}</span>
            {subValue && <span className="text-[10px] text-slate-500 font-bold uppercase">{subValue}</span>}
        </div>
    </div>
);

// --- Main Component ---

const WeatherWidget = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<City[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchWeatherData = async (lat: number, lon: number, customName?: string) => {
        setLoading(true);
        try {
            const baseUrl = "https://api.open-meteo.com/v1/forecast";
            const currentParams = "temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,surface_pressure";
            const hourlyParams = "temperature_2m,weather_code,visibility";
            const dailyParams = "weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,sunrise,sunset";

            const [fRes, aRes, mRes, gRes] = await Promise.all([
                fetch(`${baseUrl}?latitude=${lat}&longitude=${lon}&current=${currentParams}&hourly=${hourlyParams}&daily=${dailyParams}&timezone=auto`),
                fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi`),
                fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_period`),
                customName ? Promise.resolve(null) : fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=id`)
            ]);

            const fData = await fRes.json();
            const aData = await aRes.json();
            const mData = await mRes.json();

            let cityName = customName;
            if (!cityName && gRes) {
                const geoData = await gRes.json();
                cityName = geoData.locality || geoData.city || geoData.town || "Unknown Location";
            }

            if (fData.current) {
                const aq = getAQIInfo(aData.current.european_aqi);
                setWeather({
                    current: {
                        temp: Math.round(fData.current.temperature_2m),
                        feels_like: Math.round(fData.current.apparent_temperature),
                        humidity: fData.current.relative_humidity_2m,
                        wind_speed: Math.round(fData.current.wind_speed_10m),
                        uv_index: Math.round(fData.daily.uv_index_max[0]),
                        condition: getConditionText(fData.current.weather_code),
                        icon: getWeatherIcon(fData.current.weather_code, fData.current.is_day === 1),
                        is_day: fData.current.is_day === 1,
                        pressure: Math.round(fData.current.surface_pressure),
                        visibility: Math.round(fData.hourly.visibility[0] / 1000),
                        sunrise: new Date(fData.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        sunset: new Date(fData.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    },
                    air_quality: { aqi: aData.current.european_aqi, label: aq.label, color: aq.color },
                    marine: { wave_height: mData.current?.wave_height || 0, wave_period: mData.current?.wave_period || 0 },
                    hourly: fData.hourly.time.slice(0, 8).map((time: string | number | Date, i: number) => ({
                        time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        temp: Math.round(fData.hourly.temperature_2m[i]),
                        icon: getWeatherIcon(fData.hourly.weather_code[i])
                    })),
                    daily: fData.daily.time.slice(1, 6).map((time: string | number | Date, i: number) => ({
                        day: new Date(time).toLocaleDateString([], { weekday: 'short' }),
                        maxTemp: Math.round(fData.daily.temperature_2m_max[i]),
                        minTemp: Math.round(fData.daily.temperature_2m_min[i]),
                        condition: getConditionText(fData.daily.weather_code[i]),
                        icon: getWeatherIcon(fData.daily.weather_code[i])
                    })),
                    location: cityName!
                });
            }
        } finally { setLoading(false); }
    };

    const runSearch = async (query: string) => {
        if (query.length < 3) { setSearchResults(INDONESIA_CITIES); return; }
        setIsSearching(true);
        try {
            // Using a more lenient search or handling CORS better is hard without a backend proxy.
            // For now, we'll keep Nominatim but add a fallback error handler or just suppress the error to user.
            // Alternatively, switch to a simple mocked list filter if API fails.
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=id&limit=5`, {
                headers: { 'Accept-Language': 'id' }
            });
            if (!res.ok) throw new Error("Search failed");
            const data = await res.json();
            setSearchResults(data.map((item: { display_name: string, lat: string, lon: string }) => ({ name: item.display_name.split(',')[0], lat: parseFloat(item.lat), lon: parseFloat(item.lon) })));
        } catch (e) {
            console.warn("Search API failed, falling back to local list", e);
            // Fallback to filtering local list
            const localResults = INDONESIA_CITIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
            setSearchResults(localResults);
        } finally { setIsSearching(false); }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchWeatherData(pos.coords.latitude, pos.coords.longitude),
                () => fetchWeatherData(-6.2088, 106.8456, "Jakarta")
            );
        } else { fetchWeatherData(-6.2088, 106.8456, "Jakarta"); }
    }, []);

    useEffect(() => {
        if (searchQuery) {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
            searchTimeout.current = setTimeout(() => runSearch(searchQuery), 500);
        } else { setSearchResults(INDONESIA_CITIES); }
    }, [searchQuery]);

    useEffect(() => {
        const outSide = (e: MouseEvent) => { if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsMenuOpen(false); };
        document.addEventListener('mousedown', outSide);
        return () => document.removeEventListener('mousedown', outSide);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            {/* --- PILL TOGGLE --- */}
            <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 sm:gap-4 px-3 sm:px-5 py-2 rounded-full bg-slate-900/40 border border-white/5 backdrop-blur-md group hover:border-cyan-500/30 transition-all duration-300 shadow-xl"
            >
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div key="loader" className="flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin text-cyan-500" />
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em] font-bold hidden sm:inline">Atmosphere...</span>
                        </motion.div>
                    ) : weather ? (
                        <motion.div key="data" className="flex items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-1.5 sm:gap-2.5">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform">{weather.current.icon}</div>
                                <span className="text-xs sm:text-sm font-black text-white">{weather.current.temp}°C</span>
                            </div>

                            <div className="h-3 sm:h-4 w-[1px] bg-white/10" />

                            <div className="flex flex-col text-left">
                                <div className="flex items-center gap-1.5 leading-none mb-0.5 sm:mb-1">
                                    <span className="text-[8px] sm:text-[9px] font-black text-cyan-400 uppercase tracking-tighter">{weather.current.condition}</span>
                                    <span className="hidden sm:inline text-[8px] text-slate-600">•</span>
                                    <span className={`hidden sm:inline text-[9px] font-black uppercase ${weather.air_quality.color}`}>AQI {weather.air_quality.aqi}</span>
                                </div>
                                <div className="hidden sm:flex items-center gap-1 leading-none">
                                    <MapPin className="w-2 h-2 text-slate-500" />
                                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-wider truncate max-w-[80px]">{weather.location}</span>
                                </div>
                            </div>

                            <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isMenuOpen ? 'rotate-180 text-cyan-500' : ''}`} />
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </motion.button>

            {/* --- MEGA DASHBOARD DROPDOWN --- */}
            <AnimatePresence>
                {isMenuOpen && weather && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                        className="absolute top-full mt-4 right-[-60px] sm:right-0 w-[90vw] sm:w-[420px] bg-[#0d1520]/95 border border-white/10 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)] backdrop-blur-3xl z-[99999] overflow-hidden p-6 sm:p-8"
                    >
                        {/* Search Internal */}
                        <div className="relative mb-8">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search Indonesian cities..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all font-bold uppercase tracking-widest text-[10px]"
                            />
                            <AnimatePresence>
                                {(searchQuery.length > 0) && (
                                    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute inset-x-0 top-full mt-2 bg-slate-950/95 border border-white/10 rounded-2xl z-20 shadow-2xl p-2 max-h-56 overflow-y-auto custom-scrollbar backdrop-blur-xl">
                                        {isSearching ? (
                                            <div className="p-8 text-center"><Loader2 className="w-6 h-6 animate-spin text-cyan-500 mx-auto" /></div>
                                        ) : (
                                            searchResults.map(city => (
                                                <button key={city.name + city.lat} onClick={() => { fetchWeatherData(city.lat, city.lon, city.name); setSearchQuery(""); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-400 transition-all font-black text-[10px] uppercase tracking-[0.2em]">
                                                    <MapPin className="w-3.5 h-3.5 text-slate-600" />
                                                    {city.name}
                                                </button>
                                            ))
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bento Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <BentoGridItem
                                title="Air Quality"
                                icon={<Activity className="w-4 h-4 text-emerald-400" />}
                                value={`AQI ${weather.air_quality.aqi}`}
                                subValue={weather.air_quality.label}
                                colorClass={weather.air_quality.color}
                            />
                            <BentoGridItem
                                title="Marine Wave"
                                icon={<Waves className="w-4 h-4 text-cyan-400" />}
                                value={`${weather.marine.wave_height}m`}
                                subValue={`${weather.marine.wave_period}s Delay`}
                                colorClass="text-cyan-400"
                            />
                            <BentoGridItem
                                title="Wind Vector"
                                icon={<Wind className="w-4 h-4 text-slate-400" />}
                                value={weather.current.wind_speed}
                                subValue="km/h"
                            />
                            <BentoGridItem
                                title="Atmosphere"
                                icon={<Gauge className="w-4 h-4 text-slate-400" />}
                                value={weather.current.pressure}
                                subValue="hPa"
                            />
                        </div>

                        {/* Hourly Pulse */}
                        <div className="mb-8 overflow-hidden">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-3 h-3 text-slate-500" />
                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none">Hourly Pulse</span>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar hide-scrollbar">
                                {weather.hourly.map((h, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 px-3 py-2 bg-white/[0.02] border border-white/5 rounded-2xl shrink-0 hover:bg-white/5 transition-colors">
                                        <span className="text-[9px] text-slate-500 font-bold uppercase">{h.time}</span>
                                        <div className="w-6 h-6">{h.icon}</div>
                                        <span className="text-xs font-black text-white">{h.temp}°</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Specs Row */}
                        <div className="grid grid-cols-3 gap-2 mb-8">
                            {[
                                { icon: <Sunrise />, label: "Sunrise", val: weather.current.sunrise },
                                { icon: <Sunset />, label: "Sunset", val: weather.current.sunset },
                                { icon: <SunMedium />, label: "UV Index", val: weather.current.uv_index }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/5 p-3 rounded-2xl border border-white/5 text-center">
                                    <div className="text-cyan-500/50 w-4 h-4 mx-auto mb-1.5">{item.icon}</div>
                                    <p className="text-[10px] font-black text-white leading-none mb-1">{item.val}</p>
                                    <p className="text-[8px] text-slate-600 uppercase font-black tracking-tighter">{item.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* 5-Day Insight */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-3 h-3 text-slate-500" />
                                <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest leading-none">Nusantara Outlook (5D)</span>
                            </div>
                            {weather.daily.map((d, i) => (
                                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/10 border border-transparent hover:border-cyan-500/20 transition-all group">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] font-black text-slate-500 w-10 uppercase tracking-widest">{d.day}</span>
                                        <div className="w-6 h-6 group-hover:scale-110 transition-transform">{d.icon}</div>
                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">{d.condition}</span>
                                    </div>
                                    <div className="flex gap-4 font-mono">
                                        <span className="text-xs font-black text-white">{d.maxTemp}°</span>
                                        <span className="text-[10px] font-bold text-slate-600">{d.minTemp}°</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WeatherWidget;
