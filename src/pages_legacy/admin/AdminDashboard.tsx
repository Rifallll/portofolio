import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ExperienceManager from "./ExperienceManager";
import CVManager from "./CVManager";
import {
    LayoutDashboard,
    FolderOpen,
    Cpu,
    Award,
    Briefcase,
    FileText,
    LogOut,
    User,
    Menu,
    X
} from "lucide-react";
import ProjectsManager from "./ProjectsManager";
import SkillsManager from "./SkillsManager";
import CertificatesManager from "./CertificatesManager";

// ... (inside component)

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("projects");
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    const renderContent = () => {
        switch (activeTab) {
            case "projects":
                return <ProjectsManager />;
            case "skills":
                return <SkillsManager />;
            case "certificates":
                return <CertificatesManager />;
            case "experience":
                return <ExperienceManager />;
            case "cv":
                return <CVManager />;
            default:
                return <ProjectsManager />;
        }
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans">
            {/* MOBILE HEADER */}
            <div className="md:hidden fixed top-0 w-full bg-[#0A0A0A] border-b border-white/5 z-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-cyan-500" />
                    <span className="font-bold text-white">Admin</span>
                </div>
                <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
            </div>

            {/* SIDEBAR */}
            <aside className={`fixed md:fixed inset-y-0 left-0 w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} pt-16 md:pt-0`}>
                <div className="hidden md:block p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5 text-cyan-500" />
                        Admin<span className="text-slate-500">Panel</span>
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => { setActiveTab("projects"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "projects" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <FolderOpen className="w-4 h-4" />
                        Projects
                    </button>
                    <button
                        onClick={() => { setActiveTab("skills"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "skills" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <Cpu className="w-4 h-4" />
                        Skills
                    </button>
                    <button
                        onClick={() => { setActiveTab("certificates"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "certificates" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <Award className="w-4 h-4" />
                        Certificates
                    </button>
                    <button
                        onClick={() => { setActiveTab("experience"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "experience" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <Briefcase className="w-4 h-4" />
                        Experience
                    </button>
                    <button
                        onClick={() => { setActiveTab("cv"); setSidebarOpen(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "cv" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <FileText className="w-4 h-4" />
                        CV Upload
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white">Operator</p>
                            <p className="text-xs text-green-400">● Online</p>
                        </div>
                    </div>
                    <Button
                        variant="destructive"
                        className="w-full justify-start gap-2"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4" />
                        Disconnect
                    </Button>
                </div>
            </aside>

            {/* OVERLAY for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* MAIN CONTENT */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 relative pt-20 md:pt-8 w-full">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
                <div className="max-w-5xl mx-auto relative z-10">
                    {renderContent()}
                </div>
            </main>
        </div >
    );
};

export default AdminDashboard;
