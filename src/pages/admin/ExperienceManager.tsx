import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash, Save, X, Briefcase, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceManager = () => {
    const [experiences, setExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentExperience, setCurrentExperience] = useState<any>({
        role: "",
        company: "",
        period: "",
        desc: "",
        tech: "" // Comma separated string for input
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const { data, error } = await supabase
                .from("experience")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setExperiences(data || []);
        } catch (error) {
            console.error("Error fetching experience:", error);
            toast.error("Failed to load experience data");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Convert comma separated tech string to array
        const techArray = currentExperience.tech
            ? currentExperience.tech.split(",").map((t: string) => t.trim())
            : [];

        const payload = {
            role: currentExperience.role,
            company: currentExperience.company,
            period: currentExperience.period,
            desc: currentExperience.desc,
            tech: techArray
        };

        try {
            if (currentExperience.id) {
                const { error } = await supabase
                    .from("experience")
                    .update(payload)
                    .eq("id", currentExperience.id);
                if (error) throw error;
                toast.success("Experience updated successfully");
            } else {
                const { error } = await supabase
                    .from("experience")
                    .insert([payload]);
                if (error) throw error;
                toast.success("Experience added successfully");
            }

            setIsEditing(false);
            setCurrentExperience({ role: "", company: "", period: "", desc: "", tech: "" });
            fetchExperiences();
        } catch (error: any) {
            toast.error("Error saving experience: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this experience?")) return;

        try {
            const { error } = await supabase.from("experience").delete().eq("id", id);
            if (error) throw error;
            toast.success("Experience deleted");
            fetchExperiences();
        } catch (error) {
            toast.error("Error deleting experience");
        }
    };

    const handleEdit = (exp: any) => {
        setCurrentExperience({
            ...exp,
            tech: Array.isArray(exp.tech) ? exp.tech.join(", ") : exp.tech
        });
        setIsEditing(true);
    };

    return (
        <div className="p-6 max-w-5xl mx-auto text-slate-200">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Experience Manager</h1>
                    <p className="text-slate-400">Manage your professional history</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setCurrentExperience({ role: "", company: "", period: "", desc: "", tech: "" });
                            setIsEditing(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-colors font-bold"
                    >
                        <Plus className="w-4 h-4" /> Add Experience
                    </button>
                )}
            </div>

            {/* FORM SECTION */}
            <AnimatePresence>
                {isEditing && (
                    <motion.form
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-slate-900/50 border border-white/10 p-6 rounded-xl mb-8 overflow-hidden"
                        onSubmit={handleSubmit}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Role / Job Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentExperience.role}
                                    onChange={e => setCurrentExperience({ ...currentExperience, role: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                    placeholder="e.g. Senior Frontend Developer"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Company</label>
                                <input
                                    type="text"
                                    required
                                    value={currentExperience.company}
                                    onChange={e => setCurrentExperience({ ...currentExperience, company: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                    placeholder="e.g. Tech Corp Ltd."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Period</label>
                                <input
                                    type="text"
                                    required
                                    value={currentExperience.period}
                                    onChange={e => setCurrentExperience({ ...currentExperience, period: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                    placeholder="e.g. Jan 2023 - Present"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Technologies (Comma separated)</label>
                                <input
                                    type="text"
                                    value={currentExperience.tech}
                                    onChange={e => setCurrentExperience({ ...currentExperience, tech: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                    placeholder="e.g. React, Node.js, AWS"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold uppercase text-slate-500">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={currentExperience.desc}
                                    onChange={e => setCurrentExperience({ ...currentExperience, desc: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-cyan-500 outline-none"
                                    placeholder="Brief description of your responsibilities and achievements..."
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-bold transition-all disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {currentExperience.id ? "Update Experience" : "Save Experience"}
                            </button>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* LIST SECTION */}
            <div className="space-y-4">
                {experiences.map(exp => (
                    <div key={exp.id} className="bg-white/5 border border-white/5 rounded-xl p-5 flex flex-col md:flex-row justify-between items-start gap-4 group hover:border-cyan-500/30 transition-all">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/10 text-cyan-400 font-mono border border-cyan-500/20">
                                    {exp.company}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 font-mono mb-3">{exp.period}</p>
                            <p className="text-slate-300 text-sm leading-relaxed mb-4">{exp.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {exp.tech && exp.tech.map((t: string, i: number) => (
                                    <span key={i} className="text-[10px] px-2 py-1 rounded bg-black/40 border border-white/10 text-slate-400">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(exp)}
                                className="p-2 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                            <button
                                onClick={() => handleDelete(exp.id)}
                                className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {experiences.length === 0 && !loading && (
                    <div className="text-center py-20 text-slate-500 border border-dashed border-white/10 rounded-xl">
                        <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No experience records found. Add your first one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceManager;
