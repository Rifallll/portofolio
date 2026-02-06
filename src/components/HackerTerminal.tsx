"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, Minus, Terminal as TerminalIcon, Maximize2, Cpu, Globe, Shield } from "lucide-react";
import { supabase } from "../lib/supabase";
import useSciFiSound from "@/hooks/use-sound";

const BANNER_ASCII = `
   ____  _ ____       _          ____  ____ 
  |  _ \\(_)  _| __ _ | |        |  _ \\/  ___|
  | |_) | | |_ / _' || |  _____ | |_) \\___ \\
  |  _ <| |  _| (_| || | |_____||  _ < ___) |
  |_| \\_\\_|_|  \\__,_||_|        |_| \\_\\____/ 
                                             
  - SYSTEM: RIFAL-OS v5.0.4
  - STATUS: ENCRYPTED_LINK_ACTIVE
`;

const ADMIN_BYPASS_KEY = "tangoox";

interface HackerTerminalProps {
    onMatrixToggle?: () => void;
    onGhostToggle?: () => void;
    onThemeChange?: (theme: "cyan" | "green" | "red") => void;
}

interface TerminalOutput {
    type: string;
    content: React.ReactNode;
}

interface IpApiData {
    ip: string;
    city: string;
    country_name: string;
    timezone?: string;
    org?: string;
}

interface VisitorData {
    [key: string]: string | number | undefined;
    t: string;
    res: string;
    ua: string;
    tz: string;
    lang: string;
    ip: string;
    city: string;
    country: string;
    isp: string;
    bat: string;
    net: string;
    gpu: string;
    cores: number | string;
    mem: number | string;
}

const TerminalHistory = React.memo(({ output, bottomRef }: { output: TerminalOutput[], bottomRef: React.RefObject<HTMLDivElement> }) => {
    return (
        <div className="p-4 h-[420px] overflow-y-auto custom-scrollbar">
            {output.map((line, i) => (
                <div
                    key={i}
                    className={`mb-1 ${line.type === "error" ? "text-red-400" :
                        line.type === "success" ? "text-green-400" :
                            line.type === "info" ? "text-cyan-400" :
                                line.type === "input" ? "text-white" :
                                    "text-white/80"
                        }`}
                >
                    {typeof line.content === 'string' ? (
                        <pre className="whitespace-pre-wrap font-mono text-xs">{line.content}</pre>
                    ) : (
                        line.content
                    )}
                </div>
            ))}
            <div ref={bottomRef} />
        </div>
    );
});
TerminalHistory.displayName = "TerminalHistory";

export const HackerTerminal: React.FC<HackerTerminalProps> = ({
    onMatrixToggle,
    onGhostToggle,
    onThemeChange
}) => {
    const [output, setOutput] = useState<TerminalOutput[]>([
        { type: "info", content: BANNER_ASCII },
        { type: "warning", content: "INITIALIZING_GATEWAY..." },
    ]);
    const [isScanning, setIsScanning] = useState(false);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [visitorIP, setVisitorIP] = useState<string>("");

    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const { playSound } = useSciFiSound();

    const PROMPT = isAdmin ? "root@rifal-azhar:~#" : "guest@rifal-azhar:~$";

    // Auto-scroll to bottom
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [output]);

    // Harvest visitor data and send to Telegram
    const harvestData = useCallback(async () => {
        try {
            const response = await fetch('https://ipapi.co/json/');
            const data: IpApiData = await response.json();
            setVisitorIP(data.ip);

            // Get GPU info
            const getSilentHardwareInfo = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const gl = canvas.getContext('webgl');
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (!gl) return { gpu: "Generic Renderer", cores: navigator.hardwareConcurrency || "N/A", mem: (navigator as any).deviceMemory || "N/A" };


                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    let gpu = "Generic Renderer";

                    if (debugInfo) {
                        gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "Generic Renderer";
                    }

                    return {
                        gpu: gpu,
                        cores: navigator.hardwareConcurrency || "N/A",
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        mem: (navigator as any).deviceMemory || "N/A"
                    };
                } catch (e) {
                    // ignore
                    return { gpu: "Generic (Blocked)", cores: navigator.hardwareConcurrency || "N/A", mem: "N/A" };
                }
            };

            const hw = getSilentHardwareInfo();

            const session = {
                t: new Date().toISOString(),
                res: `${window.screen.width}x${window.screen.height}`,
                ua: navigator.userAgent.substring(0, 255),
                tz: data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
                lang: navigator.language,
                ip: data.ip,
                city: data.city || "Unknown",
                country: data.country_name || "Unknown",
                isp: (data.org || "Unknown").substring(0, 255),
                bat: "N/A",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                net: (navigator as any).connection?.effectiveType || "unknown",
                gpu: hw.gpu.substring(0, 255)
            };

            // Send to Supabase with error handling
            const { data: insertData, error: supabaseError } = await supabase
                .from('panci_visitors')
                .upsert([session], { onConflict: 'ip' });

            if (supabaseError) {
                console.error('❌ Supabase error:', supabaseError);
            } else {
                console.log('✅ Visitor data saved to Supabase');
            }

            // Store cores & mem for Telegram message (not in DB)
            const cores = hw.cores;
            const mem = hw.mem;

            // Send to Telegram with proper error handling
            const TELEGRAM_BOT_TOKEN = "8131238156:AAGl0bIQ6oUApwtE8QgPCAvOHEktdwK3ieE";
            const TELEGRAM_CHAT_ID = "6342273524";

            const message = `🔔 NEW VISITOR DETECTED\n\n` +
                `📍 IP: ${session.ip}\n` +
                `🌍 Location: ${session.city}, ${session.country}\n` +
                `🏢 ISP: ${session.isp}\n` +
                `💻 GPU: ${session.gpu}\n` +
                `🧠 CPU: ${cores} cores\n` +
                `🖥️ RAM: ${mem} GB\n` +
                `📱 Resolution: ${session.res}\n` +
                `🌐 Network: ${session.net}\n` +
                `⏰ Time: ${new Date(session.t).toLocaleString('id-ID')}`;

            try {
                const telegramResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message
                    })
                });

                const telegramResult = await telegramResponse.json();
                if (telegramResult.ok) {
                    console.log('✅ Telegram notification sent');
                } else {
                    console.error('❌ Telegram error:', telegramResult);
                }
            } catch (telegramError) {
                console.error('❌ Telegram send failed:', telegramError);
            }

        } catch (error) {
            console.error("Data harvest failed:", error);
        }

    }, []);

    // Telegram notification helper
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const notifyTelegram = async (data: any, isAdmin: boolean, type: string) => {
        try {
            const TELEGRAM_BOT_TOKEN = "8131238156:AAGl0bIQ6oUApwtE8QgPCAvOHEktdwK3ieE";
            const TELEGRAM_CHAT_ID = "6342273524";

            let message = `⚠️ ${type}\n\n`;
            Object.entries(data).forEach(([key, value]) => {
                message += `${key}: ${value}\n`;
            });

            await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: message
                })
            });
        } catch (e) {
            console.error("Telegram notification failed:", e);
        }
    };

    // Auto-scan on terminal open
    useEffect(() => {
        if (isOpen && !isScanning) {
            performAutoScan();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Re-scan if admin status changes
    useEffect(() => {
        if (isAdmin && !isScanning) {
            performAutoScan();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin]);

    const performAutoScan = useCallback(async () => {
        setIsScanning(true);

        // Scan animation sequence
        const scanSteps = [
            { delay: 300, msg: "[SCAN] Detecting hardware signature...", type: "info" },
            { delay: 400, msg: "[SCAN] Analyzing GPU renderer...", type: "info" },
            { delay: 350, msg: "[SCAN] Probing CPU architecture...", type: "info" },
            { delay: 300, msg: "[SCAN] Mapping network topology...", type: "info" },
            { delay: 400, msg: "[SCAN] Fingerprinting browser engine...", type: "info" },
            { delay: 350, msg: "[SCAN] Geolocation acquired.", type: "success" },
            { delay: 300, msg: "[SCAN] SCAN_COMPLETE. All systems nominal.", type: "success" },
        ];

        for (const step of scanSteps) {
            await new Promise(resolve => setTimeout(resolve, step.delay));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setOutput(prev => [...prev, { type: step.type as any, content: step.msg }]);
        }

        // Silent harvest data and send to Telegram
        await harvestData();

        // Show help prompt after scan
        await new Promise(resolve => setTimeout(resolve, 500));
        setOutput(prev => [...prev, {
            type: "success",
            content: "GATEWAY_READY. Type 'help' for available commands."
        }]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Dragging handlers
    const startDrag = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.terminal-header')) {
            setIsDragging(true);
            setDragOffset({
                x: e.clientX - position.x,
                y: e.clientY - position.y
            });
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDragging, dragOffset]);

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        playSound('click');

        // Admin bypass
        if (cmd.trim() === ADMIN_BYPASS_KEY) {
            setIsAdmin(true);
            setOutput(prev => [...prev,
            { type: "input", content: `${PROMPT} ********` },
            { type: "success", content: "🔓 ADMIN_ACCESS_GRANTED. ROOT_SHELL_INITIALIZED." },
            { type: "info", content: "Type 'help' to see admin commands." }
            ]);
            return;
        }

        setOutput(prev => [...prev, { type: "input", content: `${PROMPT} ${cmd}` }]);

        const projects = [
            { id: "01", name: "PORTFOLIO_SITE", url: "https://rifal-portfolio.vercel.app" },
            { id: "02", name: "TORINO_TRAFFIC_AI", url: "https://torino-traffic.vercel.app" },
            { id: "03", name: "WISATA_KOMODO", url: "https://wisata-komodo.vercel.app" }
        ];

        // Check for deploy with project ID
        if (cleanCmd.startsWith("open ")) {
            const id = cleanCmd.split(" ")[1];
            const target = projects.find(p => p.id === id);
            if (target) {
                setOutput(prev => [...prev,
                { type: "success", content: `DEPLOYING_PAYLOAD: ${target.name}...` },
                { type: "info", content: "ESTABLISHING_SECURE_TUNNEL..." }
                ]);
                setTimeout(() => window.open(target.url, '_blank'), 1000);
            } else {
                setOutput(prev => [...prev, { type: "error", content: `PAYLOAD_ID_${id}_NOT_FOUND.` }]);
            }
            return;
        }

        switch (cleanCmd.split(" ")[0]) {
            case "scan": {
                setOutput(prev => [...prev, { type: "info", content: `INITIATING_DEEP_SYSTEM_SCAN...` }]);

                const getRealData = async () => {
                    await new Promise(r => setTimeout(r, 800));

                    // GPU Detection
                    let gpuRenderer = "UNKNOWN_GPU_UNIT";
                    try {
                        const canvas = document.createElement('canvas');
                        const gl = canvas.getContext('webgl');
                        if (gl) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info') as any;
                            if (debugInfo) {
                                gpuRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                            }
                        }
                    } catch (e) { /* ignore */ }

                    const cores = navigator.hardwareConcurrency || "N/A";
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const memory = (navigator as any).deviceMemory || "N/A";
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const user = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;
                    const username = user?.username ? `@${user.username}` : "Anonymous";

                    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
                    const netType = connection ? connection.effectiveType : "UNKNOWN";
                    const rtt = connection ? connection.rtt : "N/A";

                    const telemetry = [
                        { label: "GPU_RENDERER", val: gpuRenderer, safe: false },
                        { label: "CPU_CORES", val: `${cores} LOGICAL_CORES`, safe: true },
                        { label: "RAM_ALLOC", val: `~${memory} GB`, safe: true },
                        { label: "OS_PLATFORM", val: platform.toUpperCase(), safe: false },
                        { label: "NETWORK_LINK", val: `${netType.toUpperCase()} (RTT: ${rtt}ms)`, safe: true },
                        { label: "BROWSER_ENGINE", val: userAgent.substring(0, 30) + "...", safe: false }
                    ];

                    for (const metric of telemetry) {
                        await new Promise(r => setTimeout(r, 400));
                        setOutput(prev => [...prev, {
                            type: "response",
                            content: (
                                <div className="flex justify-between w-full max-w-md font-mono text-[11px] border-b border-white/5 py-1">
                                    <span className="text-white/60">{metric.label}:</span>
                                    <span className={metric.safe ? "text-cyan-300" : "text-amber-400 font-bold"}>{metric.val}</span>
                                </div>
                            )
                        }]);
                    }

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if ((window as any).Telegram?.WebApp) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const tg = (window as any).Telegram.WebApp;
                        tg.ready();
                        tg.expand();
                    }
                    // Silent Telegram Notification
                    notifyTelegram({
                        ip: visitorIP || "HIDDEN",
                        gpu: gpuRenderer,
                        platform: platform,
                        cores: cores,
                        action: "DEVICE_SCAN"
                    }, isAdmin, "SCAN_ALERT");

                    setOutput(prev => [...prev, {
                        type: "success",
                        content: (
                            <div className="mt-4 border border-teal-500/30 bg-teal-500/10 p-2 rounded">
                                <p className="font-bold text-teal-400">DEVICE_FINGERPRINT_CAPTURED</p>
                                <p className="text-[10px] text-white/80">Your digital footprint has been analyzed. Total unique identifiers found: {telemetry.length}</p>
                            </div>
                        )
                    }]);
                };
                getRealData();
                break;
            }

            case "help": {
                if (isAdmin) {
                    setOutput(prev => [...prev, {
                        type: "response",
                        content: (
                            <div className="space-y-2">
                                <div className="text-red-500 font-bold text-xs border-b border-red-500/30 pb-1 mb-2">🔴 ADMIN COMMANDS:</div>
                                <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1 text-[11px]">
                                    <span className="text-red-400 font-bold">spy [ip]</span> <span>View visitor intel</span>
                                    <span className="text-red-400 font-bold">track</span> <span className="text-emerald-400">Live visitor list</span>
                                    <span className="text-red-400 font-bold">stats</span> <span className="text-emerald-400">Analytics dashboard</span>
                                    <span className="text-red-400 font-bold">ban-remote [ip]</span> <span>Global IP ban</span>
                                    <span className="text-red-400 font-bold">unban-remote [ip]</span> <span>Remove ban</span>
                                    <span className="text-red-400 font-bold">logout</span> <span>Revoke admin</span>
                                </div>

                                <div className="text-cyan-500 font-bold text-xs border-b border-cyan-500/30 pb-1 mb-2 mt-3">📘 GUEST COMMANDS:</div>
                                <div className="grid grid-cols-[140px_1fr] gap-x-4 gap-y-1 text-[11px]">
                                    <span className="text-white font-bold italic">neofetch</span> <span>System summary</span>
                                    <span className="text-white font-bold italic">deploy</span> <span className="text-emerald-400">Project Payloads</span>
                                    <span className="text-white font-bold italic">scan</span> <span className="text-emerald-400">Device Fingerprint</span>
                                    <span className="text-white font-bold italic">check [ip]</span> <span className="text-emerald-400">IP reputation</span>
                                    <span className="text-white font-bold italic">social</span> <span>Social links</span>
                                    <span className="text-white font-bold italic">whoami</span> <span>Node identity</span>
                                    <span className="text-white font-bold italic">clear</span> <span>Clean buffer</span>
                                </div>
                            </div>
                        )
                    }]);
                } else {
                    setOutput(prev => [...prev, {
                        type: "response",
                        content: (
                            <div className="space-y-1 text-cyan-400">
                                <div className="border-b border-cyan-400/20 pb-1 mb-2 font-bold text-xs">AVAILABLE COMMANDS:</div>
                                <div className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-1 text-[11px]">
                                    <span className="text-white font-bold italic">neofetch</span> <span>System summary</span>
                                    <span className="text-white font-bold italic">deploy</span> <span className="text-emerald-400">Project Payloads</span>
                                    <span className="text-white font-bold italic">scan</span> <span className="text-emerald-400">Device Fingerprint</span>
                                    <span className="text-white font-bold italic">check [ip]</span> <span className="text-emerald-400">IP reputation</span>
                                    <span className="text-white font-bold italic">social</span> <span>Social links</span>
                                    <span className="text-white font-bold italic">whoami</span> <span>Node identity</span>
                                    <span className="text-white font-bold italic">clear</span> <span>Clean buffer</span>
                                    <span className="text-white font-bold italic">exit</span> <span>Close terminal</span>
                                </div>
                            </div>
                        )
                    }]);
                }
                break;
            }

            case "spy": {
                if (!isAdmin) {
                    setOutput(prev => [...prev, { type: "error", content: "ACCESS_DENIED. SUDO_PRIVILEGE_REQUIRED." }]);
                    break;
                }
                const targetIp = cleanCmd.split(" ")[1];
                if (!targetIp) {
                    setOutput(prev => [...prev, { type: "error", content: "USAGE: spy [ip_address]" }]);
                    break;
                }

                setOutput(prev => [...prev, { type: "info", content: `DRAGGING_VISITOR_INTEL_FOR: ${targetIp}...` }]);

                const fetchIntel = async () => {
                    const { data, error } = await supabase
                        .from('panci_visitors')
                        .select('*')
                        .eq('ip', targetIp)
                        .limit(1);

                    if (error) {
                        setOutput(prev => [...prev, { type: "error", content: `DB_QUERY_FAILED: ${error.message}` }]);
                        return;
                    }

                    if (!data || data.length === 0) {
                        setOutput(prev => [...prev, { type: "info", content: "No visitor data found for this IP." }]);
                        return;
                    }

                    const visitor = data[0];
                    setOutput(prev => [...prev, {
                        type: "response",
                        content: (
                            <div className="mt-2 border border-red-500/30 p-2 bg-red-950/20 rounded">
                                <div className="text-[10px] text-red-500 font-bold border-b border-red-500/20 mb-2 pb-1">VISITOR_DOSSIER: {targetIp}</div>
                                <div className="space-y-1 text-[10px]">
                                    <p><span className="text-cyan-400">IP:</span> {visitor.ip}</p>
                                    <p><span className="text-cyan-400">Location:</span> {visitor.city}, {visitor.country}</p>
                                    <p><span className="text-cyan-400">ISP:</span> {visitor.isp}</p>
                                    <p><span className="text-cyan-400">GPU:</span> {visitor.gpu}</p>
                                    <p><span className="text-cyan-400">CPU:</span> {visitor.cores} cores</p>
                                    <p><span className="text-cyan-400">RAM:</span> {visitor.mem} GB</p>
                                    <p><span className="text-cyan-400">Resolution:</span> {visitor.res}</p>
                                    <p><span className="text-cyan-400">Network:</span> {visitor.net}</p>
                                    <p><span className="text-cyan-400">Timezone:</span> {visitor.tz}</p>
                                    <p><span className="text-cyan-400">Last Seen:</span> {new Date(visitor.t).toLocaleString('id-ID')}</p>
                                </div>
                            </div>
                        )
                    }]);
                };
                fetchIntel();
                break;
            }

            case "track": {
                if (!isAdmin) {
                    setOutput(prev => [...prev, { type: "error", content: "ACCESS_DENIED. SUDO_PRIVILEGE_REQUIRED." }]);
                    break;
                }

                setOutput(prev => [...prev, { type: "info", content: "LOADING_VISITOR_TRACKING_SYSTEM..." }]);

                const fetchAllVisitors = async () => {
                    const { data, error } = await supabase
                        .from('panci_visitors')
                        .select('ip, city, country, res, net, t')
                        .order('t', { ascending: false })
                        .limit(15);

                    if (error) {
                        setOutput(prev => [...prev, { type: "error", content: `DB_QUERY_FAILED: ${error.message}` }]);
                        return;
                    }

                    if (!data || data.length === 0) {
                        setOutput(prev => [...prev, { type: "info", content: "No visitors found in database." }]);
                        return;
                    }

                    setOutput(prev => [...prev, {
                        type: "response",
                        content: (
                            <div className="mt-2 border border-cyan-500/30 p-3 bg-cyan-950/10 rounded">
                                <div className="text-[11px] text-cyan-400 font-bold border-b border-cyan-500/20 mb-2 pb-1">LIVE_VISITOR_TRACKER ({data.length} NODES)</div>
                                <div className="space-y-2">
                                    {data.map((visitor, i) => {
                                        const timeDiff = Math.floor((Date.now() - new Date(visitor.t).getTime()) / 1000 / 60);
                                        const isRecent = timeDiff < 30;
                                        return (
                                            <div key={i} className="text-[9px] border-l-2 border-white/10 pl-2 py-1 hover:bg-white/5 transition-all">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-white font-mono">{visitor.ip}</span>
                                                    <span className={`text-[8px] px-1 rounded ${isRecent ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'}`}>
                                                        {isRecent ? 'ACTIVE' : `${timeDiff}m ago`}
                                                    </span>
                                                </div>
                                                <div className="text-white/60 mt-1">
                                                    📍 {visitor.city}, {visitor.country} | 📱 {visitor.res} | 📡 {visitor.net}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-[8px] text-white/40 mt-2 italic">Use 'spy [ip]' for detailed intel on any node.</p>
                            </div>
                        )
                    }]);
                };
                fetchAllVisitors();
                break;
            }

            case "stats": {
                if (!isAdmin) {
                    setOutput(prev => [...prev, { type: "error", content: "ACCESS_DENIED. SUDO_PRIVILEGE_REQUIRED." }]);
                    break;
                }

                setOutput(prev => [...prev, { type: "info", content: "COMPILING_INTELLIGENCE_DASHBOARD..." }]);

                const fetchStats = async () => {
                    const { data, error } = await supabase
                        .from('panci_visitors')
                        .select('*');

                    if (error) {
                        setOutput(prev => [...prev, { type: "error", content: `DB_QUERY_FAILED: ${error.message}` }]);
                        return;
                    }

                    if (!data || data.length === 0) {
                        setOutput(prev => [...prev, { type: "info", content: "No data available for analysis." }]);
                        return;
                    }

                    const totalVisitors = data.length;
                    const countries = data.reduce((acc: any, v) => {
                        acc[v.country] = (acc[v.country] || 0) + 1;
                        return acc;
                    }, {});
                    const topCountries = Object.entries(countries)
                        .sort((a: any, b: any) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([country, count]) => ({ country, count }));

                    const now = Date.now();
                    const recentVisitors = data.filter(v => (now - new Date(v.t).getTime()) < 24 * 60 * 60 * 1000).length;

                    setOutput(prev => [...prev, {
                        type: "response",
                        content: (
                            <div className="mt-2 border border-purple-500/30 p-3 bg-purple-950/10 rounded">
                                <div className="text-[11px] text-purple-400 font-bold border-b border-purple-500/20 mb-3 pb-1">INTELLIGENCE_DASHBOARD</div>

                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="bg-white/5 p-2 rounded border border-white/10">
                                        <div className="text-[8px] text-white/40">TOTAL VISITORS</div>
                                        <div className="text-xl font-bold text-cyan-400">{totalVisitors}</div>
                                    </div>
                                    <div className="bg-white/5 p-2 rounded border border-white/10">
                                        <div className="text-[8px] text-white/40">LAST 24H</div>
                                        <div className="text-xl font-bold text-green-400">{recentVisitors}</div>
                                    </div>
                                </div>

                                <div className="text-[10px] text-white/80 font-bold mb-1">TOP COUNTRIES:</div>
                                <div className="space-y-1">
                                    {topCountries.map((item: any, i) => (
                                        <div key={i} className="flex justify-between text-[9px]">
                                            <span className="text-white/60">{i + 1}. {item.country}</span>
                                            <span className="text-cyan-400 font-mono">{item.count} visits</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-3 text-[8px] text-white/40 italic border-t border-white/10 pt-2">
                                    Database: panci_visitors | Last sync: {new Date().toLocaleTimeString('id-ID')}
                                </div>
                            </div>
                        )
                    }]);
                };
                fetchStats();
                break;
            }

            case "ban-remote": {
                if (!isAdmin) {
                    setOutput(prev => [...prev, { type: "error", content: "ACCESS_DENIED. SUDO_PRIVILEGE_REQUIRED." }]);
                    break;
                }
                const targetIp = cleanCmd.split(" ")[1];
                if (!targetIp) {
                    setOutput(prev => [...prev, { type: "error", content: "USAGE: ban-remote [ip_address]" }]);
                    break;
                }

                setOutput(prev => [...prev, { type: "info", content: `INITIATING_GLOBAL_LOCKDOWN: ${targetIp}...` }]);

                const execBan = async () => {
                    const { error } = await supabase
                        .from('panci_remote_bans')
                        .upsert([{ ip: targetIp, reason: "Manual_Admin_Action" }]);

                    if (error) {
                        setOutput(prev => [...prev, { type: "error", content: `BAN_EXECUTION_FAILED: ${error.message}` }]);
                    } else {
                        setOutput(prev => [...prev, { type: "success", content: `NODE_LOCKED: ${targetIp} has been blacklisted globally.` }]);
                        notifyTelegram({ ip: targetIp, action: "REMOTE_BAN" }, true, "INTRUSION_ATTEMPT");
                    }
                };
                execBan();
                break;
            }

            case "unban-remote": {
                if (!isAdmin) {
                    setOutput(prev => [...prev, { type: "error", content: "ACCESS_DENIED. SUDO_PRIVILEGE_REQUIRED." }]);
                    break;
                }
                const targetIp = cleanCmd.split(" ")[1];
                if (!targetIp) {
                    setOutput(prev => [...prev, { type: "error", content: "USAGE: unban-remote [ip_address]" }]);
                    break;
                }

                setOutput(prev => [...prev, { type: "info", content: `REMOVING_LOCKDOWN: ${targetIp}...` }]);

                const execUnban = async () => {
                    const { error } = await supabase
                        .from('panci_remote_bans')
                        .delete()
                        .eq('ip', targetIp);

                    if (error) {
                        setOutput(prev => [...prev, { type: "error", content: `BAN_REVOCATION_FAILED: ${error.message}` }]);
                    } else {
                        setOutput(prev => [...prev, { type: "success", content: `NODE_FREED: ${targetIp} has been removed from blacklist.` }]);
                    }
                };
                execUnban();
                break;
            }

            case "logout":
            case "exit-admin": {
                if (!isAdmin) {
                    setOutput(prev => [...prev, { type: "info", content: "No active admin session found." }]);
                    break;
                }
                setIsAdmin(false);
                setOutput(prev => [...prev, { type: "success", content: "SESSION_TERMINATED. ROOT_ACCESS_REVOKED. GUEST_SHELL_INITIALIZED." }]);
                break;
            }

            case "check-ip":
            case "check": {
                const targetIp = cleanCmd.split(" ")[1];
                if (!targetIp) {
                    setOutput(prev => [...prev, { type: "error", content: "USAGE: check-ip [target_ip_address]" }]);
                    return;
                }

                setOutput(prev => [...prev, { type: "info", content: `INITIATING_REPUTATION_SCAN: ${targetIp}...` }]);

                const checkIpReputation = async () => {
                    try {
                        // Fallback to ipapi.co (free)
                        const response = await fetch(`https://ipapi.co/${targetIp}/json/`);
                        const apiData = await response.json();
                        const data = {
                            ip: apiData.ip,
                            isp: apiData.org,
                            country: apiData.country_name,
                            city: apiData.city,
                            risk: 0
                        };

                        setOutput(prev => [...prev, {
                            type: "response",
                            content: (
                                <div className="mt-2 space-y-2 border-l border-cyan-500/30 pl-4 py-1">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-3 h-3 text-cyan-400" />
                                        <span className="text-xs font-black text-white uppercase tracking-tighter">INTEL_REPORT: {data.ip}</span>
                                    </div>
                                    <div className="space-y-1 text-[10px]">
                                        <p><span className="text-white/40">Location:</span> <span className="text-white">{data.city}, {data.country}</span></p>
                                        <p><span className="text-white/40">ISP:</span> <span className="text-white">{data.isp}</span></p>
                                        <p className="text-[9px] text-yellow-500/60 italic">Using free API - limited data</p>
                                    </div>
                                </div >
                            )
                        }]);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } catch (error: any) {
                        setOutput(prev => [...prev, { type: "error", content: `IP_LOOKUP_FAILED: ${error.message}` }]);
                    }
                };
                checkIpReputation();
                break;
            }

            case "deploy": {
                setOutput(prev => [...prev,
                { type: "info", content: "AVAILABLE_PAYLOADS:" },
                {
                    type: "response",
                    content: (
                        <div className="space-y-1 mt-2">
                            {projects.map(p => (
                                <div key={p.id} className="text-[11px] flex gap-2 border-l-2 border-cyan-500/30 pl-2 py-1">
                                    <span className="text-cyan-400 font-mono">[{p.id}]</span>
                                    <span className="text-white">{p.name}</span>
                                </div>
                            ))}
                            <p className="text-[10px] text-white/60 mt-2 italic">Type 'open [id]' to deploy. Example: open 01</p>
                        </div>
                    )
                }
                ]);
                break;
            }

            case "neofetch": {
                setOutput(prev => [...prev, {
                    type: "response",
                    content: (
                        <div className="flex gap-4 p-2 border border-white/10 bg-white/5 rounded">
                            <div className="text-[10px] space-y-0.5">
                                <p><span className="text-cyan-400">OS:</span> Rifal-OS v5.0.4</p>
                                <p><span className="text-cyan-400">Host:</span> rifal-azhar.dev</p>
                                <p><span className="text-cyan-400">User:</span> {isAdmin ? "root" : "guest"}</p>
                                <p><span className="text-cyan-400">IP:</span> {visitorIP || "detecting..."}</p>
                                <p><span className="text-cyan-400">Status:</span> <span className="text-green-400">ACTIVE</span></p>
                            </div>
                        </div>
                    )
                }]);
                break;
            }

            case "social": {
                setOutput(prev => [...prev, {
                    type: "response",
                    content: (
                        <div className="space-y-1 text-[11px]">
                            <p className="text-cyan-400 font-bold">SOCIAL_LINKS:</p>
                            <p>🐙 GitHub: <a href="https://github.com/rifallll" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">github.com/rifallll</a></p>
                            <p>📸 Instagram: <a href="https://instagram.com/rifal.azhr_" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">@rifal.azhr_</a></p>
                            <p>📧 Email: rifalazhar742@gmail.com</p>
                        </div>
                    )
                }]);
                break;
            }

            case "whoami": {
                setOutput(prev => [...prev, {
                    type: "response",
                    content: `${isAdmin ? "root" : "guest"}@rifal-azhar | IP: ${visitorIP || "detecting..."}`
                }]);
                break;
            }

            case "clear": {
                setOutput([]);
                break;
            }

            case "exit": {
                setIsOpen(false);
                break;
            }

            default: {
                setOutput(prev => [...prev, {
                    type: "error",
                    content: `Command not found: ${cleanCmd.split(" ")[0]}. Type 'help' for available commands.`
                }]);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput("");
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg px-4 py-2 flex items-center gap-2 text-white transition-all hover:scale-105 z-50"
            >
                <TerminalIcon className="w-5 h-5" />
                <span className="text-sm font-mono">Open Terminal</span>
            </button>
        );
    }

    return (
        <div
            ref={terminalRef}
            className="fixed bg-black/95 backdrop-blur-md border border-cyan-500/50 rounded-lg shadow-2xl shadow-cyan-500/20 font-mono text-sm z-50 overflow-hidden"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: isMinimized ? '300px' : '650px',
                height: isMinimized ? '40px' : '500px'
            }}
        >
            {/* Header */}
            <div
                className="terminal-header flex items-center justify-between bg-gradient-to-r from-cyan-900/50 to-blue-900/50 px-3 py-2 cursor-move border-b border-cyan-500/30"
                onMouseDown={startDrag}
            >
                <div className="flex items-center gap-2">
                    <TerminalIcon className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-cyan-400 font-bold">RIFAL_TERMINAL</span>
                    {isAdmin && <span className="text-[10px] text-red-500 font-bold animate-pulse">⚡ ROOT</span>}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="hover:bg-yellow-500/20 p-1 rounded transition-all"
                        aria-label="Minimize Terminal"
                    >
                        <Minus className="w-3 h-3 text-yellow-400" />
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="hover:bg-red-500/20 p-1 rounded transition-all"
                        aria-label="Close Terminal"
                    >
                        <X className="w-3 h-3 text-red-400" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {!isMinimized && (
                <>
                    <TerminalHistory output={output} bottomRef={bottomRef} />

                    <form onSubmit={handleSubmit} className="p-3 border-t border-cyan-500/30 bg-black/50">
                        <div className="flex items-center gap-2">
                            <span className={`text-xs ${isAdmin ? 'text-red-400' : 'text-cyan-400'}`}>{PROMPT}</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white text-xs font-mono"
                                autoFocus
                                spellCheck={false}
                                autoComplete="off"
                                aria-label="Terminal Input"
                            />
                        </div>
                    </form>
                </>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.3);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(6, 182, 212, 0.5);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(6, 182, 212, 0.7);
                }
            `}</style>
        </div>
    );
};

export default HackerTerminal;
