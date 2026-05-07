import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Shield, Lock, Terminal, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const AdminLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                toast.success("ACCESS GRANTED", { description: "Welcome back, Operator." });
                navigate("/admin/dashboard");
            }
        } catch (error: any) {
            toast.error("ACCESS DENIED", { description: error.message || "Invalid credentials." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative overflow-hidden group shadow-2xl"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500" />

                <div className="flex flex-col items-center mb-8">
                    <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4 group-hover:scale-110 transition-transform duration-500">
                        <Shield className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Admin Console</h1>
                    <p className="text-slate-400 text-sm font-mono mt-2">SECURE_LOGIN_PROTOCOL_V1</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-mono text-cyan-500 uppercase tracking-widest ml-1">Identity (Email)</label>
                        <div className="relative">
                            <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@system.local"
                                className="pl-10 bg-black/50 border-white/10 focus:border-cyan-500/50 text-white font-mono"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-mono text-cyan-500 uppercase tracking-widest ml-1">Passcode</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="pl-10 pr-10 bg-black/50 border-white/10 focus:border-cyan-500/50 text-white font-mono"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold tracking-widest uppercase h-12 rounded-xl transition-all"
                    >
                        {loading ? "Authenticating..." : "Initialize Session"}
                    </Button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-slate-600 font-mono uppercase">
                        Restricted Area // Authorized Personnel Only <br />
                        IP Logged & Monitored
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLoginPage;
