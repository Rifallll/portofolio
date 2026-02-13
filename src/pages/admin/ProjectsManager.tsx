import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit2, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/ImageUpload";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

// TYPE DEFINITION
type Project = {
    id: number;
    title: string;
    client: string;
    category: string;
    description: string;
    image_url: string;
    technologies: string[];
    year: string;
    link: string;
    demo_url?: string;
    repo_url?: string;
    is_featured: boolean;
};

const ProjectsManager = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Project>>({});

    // FETCH DATA
    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            toast.error("Failed to fetch projects");
        } else {
            // Map database fields to TypeScript interface
            const mappedData = (data || []).map(item => ({
                id: item.id,
                title: item.title,
                client: item.client,
                category: item.category,
                description: item.desc,
                image_url: item.image,
                technologies: item.tech || [],
                year: item.year,
                link: item.link,
                demo_url: item.demo_url,
                repo_url: item.repo_url,
                is_featured: item.featured
            }));
            setProjects(mappedData);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // HANDLERS
    const handleEdit = (project: Project) => {
        setIsEditing(project.id);
        setFormData(project);
        // Ensure technologies is handled as array usually, but for simple text input we might join by comma
    };

    const handleCancel = () => {
        setIsEditing(null);
        setFormData({});
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (error) {
            toast.error("Delete failed");
        } else {
            toast.success("Project deleted");
            fetchProjects();
        }
    };

    const handleSave = async () => {
        if (!formData.title) return toast.error("Title is required");

        const payload = {
            title: formData.title,
            client: formData.client,
            category: formData.category,
            desc: formData.description,
            image: formData.image_url,
            tech: Array.isArray(formData.technologies)
                ? formData.technologies
                : typeof formData.technologies === 'string'
                    ? (formData.technologies as string).split(',').map((t: string) => t.trim())
                    : [],
            year: formData.year,
            link: formData.link,
            demo_url: formData.demo_url || null,
            repo_url: formData.repo_url || null,
            featured: formData.is_featured || false
        };

        if (isEditing && isEditing !== -1) {
            // UPDATE
            const { error } = await supabase
                .from("projects")
                .update(payload)
                .eq("id", isEditing);

            if (error) toast.error("Update failed: " + error.message);
            else {
                toast.success("Project updated");
                handleCancel();
                fetchProjects();
            }
        } else {
            // INSERT
            const { error } = await supabase
                .from("projects")
                .insert([payload]);

            if (error) toast.error("Create failed: " + error.message);
            else {
                toast.success("Project created");
                handleCancel();
                fetchProjects();
            }
        }
    };

    const handleAddNew = () => {
        setIsEditing(-1); // -1 indicates new
        setFormData({
            title: "",
            client: "",
            category: "Web Dev",
            description: "",
            image_url: "",
            technologies: [],
            year: new Date().getFullYear().toString(),
            link: "#",
            demo_url: "",
            repo_url: "",
            is_featured: false
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projects Database</h1>
                    <p className="text-slate-400">Manage case studies and works.</p>
                </div>
                <Button onClick={handleAddNew} className="bg-cyan-600 hover:bg-cyan-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Project
                </Button>
            </div>

            {/* EDITOR FORM */}
            {isEditing !== null && (
                <Card className="bg-slate-900 border-cyan-500/30 mb-8">
                    <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">{isEditing === -1 ? "New Project" : "Edit Project"}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Title</label>
                                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-black/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Client</label>
                                <Input value={formData.client} onChange={e => setFormData({ ...formData, client: e.target.value })} className="bg-black/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Category</label>
                                <select
                                    aria-label="Project Category"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                                >
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile App">Mobile App</option>
                                    <option value="Data Analysis">Data Analysis</option>
                                    <option value="UI/UX Design">UI/UX Design</option>
                                    <option value="Machine Learning">Machine Learning</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Year</label>
                                <Input value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} className="bg-black/50" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Live Demo URL (Optional)</label>
                                <Input
                                    value={formData.demo_url || ""}
                                    onChange={e => setFormData({ ...formData, demo_url: e.target.value })}
                                    className="bg-black/50"
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">GitHub Repo URL (Optional)</label>
                                <Input
                                    value={formData.repo_url || ""}
                                    onChange={e => setFormData({ ...formData, repo_url: e.target.value })}
                                    className="bg-black/50"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-slate-400">Description</label>
                            <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="bg-black/50" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-slate-400">Project Image (Upload or URL)</label>
                            <ImageUpload
                                value={formData.image_url}
                                onChange={(url) => setFormData({ ...formData, image_url: url })}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-slate-400">Technologies (comma separated)</label>
                            <Input
                                value={Array.isArray(formData.technologies) ? formData.technologies.join(", ") : formData.technologies || ""}
                                onChange={e => setFormData({ ...formData, technologies: e.target.value.split(',') })}
                                className="bg-black/50"
                                placeholder="React, TypeScript, Tailwind"
                            />
                        </div>

                        <div className="flex gap-2 justify-end pt-4">
                            <Button variant="ghost" onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-500">
                                <Save className="w-4 h-4 mr-2" /> Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* LIST */}
            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:border-cyan-500/30 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-12 bg-slate-800 rounded bg-cover bg-center" style={{ backgroundImage: `url(${project.image_url})` }} />
                                <div>
                                    <h3 className="font-bold text-white">{project.title}</h3>
                                    <p className="text-xs text-slate-400">{project.client} • {project.year}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {projects.length === 0 && (
                        <div className="text-center p-12 text-slate-500 border border-dashed border-white/10 rounded-xl">
                            No projects found. Add one to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
