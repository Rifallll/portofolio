"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ExperienceManager from "@/pages_legacy/admin/ExperienceManager";
import CVManager from "@/pages_legacy/admin/CVManager";
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
import ProjectsManager from "@/pages_legacy/admin/ProjectsManager";
import SkillsManager from "@/pages_legacy/admin/SkillsManager";
import CertificatesManager from "@/pages_legacy/admin/CertificatesManager";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("projects");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/admin/login");
            } else {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin/login");
    };

    if (isLoading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-cyan-500 font-mono">AUTHENTICATING...</div>;

    const renderContent = () => {
        switch (activeTab) {
            case "projects": return <ProjectsManager />;
            case "skills": return <SkillsManager />;
            case "certificates": return <CertificatesManager />;
            case "experience": return <ExperienceManager />;
            case "cv": return <CVManager />;
            default: return <ProjectsManager />;
        }
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 flex font-sans">
            <div className="md:hidden fixed top-0 w-full bg-[#0A0A0A] border-b border-white/5 z-50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-cyan-500" />
                    <span className="font-bold text-white">Admin</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </Button>
            </div>

            <aside className={`fixed inset-y-0 left-0 w-64 bg-[#0A0A0A] border-r border-white/5 flex flex-col z-40 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"} pt-16 md:pt-0`}>
                <div className="hidden md:block p-6 border-b border-white/5">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5 text-cyan-500" />
                        Admin<span className="text-slate-500">Panel</span>
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {[
                        { id: "projects", icon: FolderOpen, label: "Projects" },
                        { id: "skills", icon: Cpu, label: "Skills" },
                        { id: "certificates", icon: Award, label: "Certificates" },
                        { id: "experience", icon: Briefcase, label: "Experience" },
                        { id: "cv", icon: FileText, label: "CV Upload" },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <Button variant="destructive" className="w-full justify-start gap-2" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" /> Disconnect
                    </Button>
                </div>
            </aside>

            <main className="flex-1 md:ml-64 p-4 md:p-8 relative pt-20 md:pt-8 w-full">
                <div className="max-w-5xl mx-auto relative z-10">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
