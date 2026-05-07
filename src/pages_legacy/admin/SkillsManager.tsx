import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit2, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

// TYPE DEFINITION
type Skill = {
    id: number;
    name: string;
    category: string;
    proficiency: number;
    icon_name: string;
};

const SkillsManager = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Skill>>({});

    // FETCH DATA
    const fetchSkills = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("skills")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            toast.error("Failed to fetch skills");
        } else {
            setSkills(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    // HANDLERS
    const handleEdit = (skill: Skill) => {
        setIsEditing(skill.id);
        setFormData(skill);
    };

    const handleCancel = () => {
        setIsEditing(null);
        setFormData({});
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;

        const { error } = await supabase.from("skills").delete().eq("id", id);
        if (error) {
            toast.error("Delete failed");
        } else {
            toast.success("Skill deleted");
            fetchSkills();
        }
    };

    const handleSave = async () => {
        if (!formData.name) return toast.error("Name is required");

        if (isEditing && isEditing !== -1) {
            // UPDATE
            const { error } = await supabase
                .from("skills")
                .update(formData)
                .eq("id", isEditing);

            if (error) toast.error("Update failed: " + error.message);
            else {
                toast.success("Skill updated");
                handleCancel();
                fetchSkills();
            }
        } else {
            // INSERT
            const { error } = await supabase
                .from("skills")
                .insert([formData]);

            if (error) toast.error("Create failed: " + error.message);
            else {
                toast.success("Skill created");
                handleCancel();
                fetchSkills();
            }
        }
    };

    const handleAddNew = () => {
        setIsEditing(-1);
        setFormData({
            name: "",
            category: "Frontend",
            proficiency: 80,
            icon_name: "Code"
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Skills Matrix</h1>
                    <p className="text-slate-400">Manage technical capabilities.</p>
                </div>
                <Button onClick={handleAddNew} className="bg-cyan-600 hover:bg-cyan-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Skill
                </Button>
            </div>

            {/* EDITOR FORM */}
            {isEditing !== null && (
                <Card className="bg-slate-900 border-cyan-500/30 mb-8">
                    <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">{isEditing === -1 ? "New Skill" : "Edit Skill"}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Skill Name</label>
                                <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-black/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Category</label>
                                <div className="space-y-2">
                                    <select
                                        value={["Frontend", "Backend", "Tools", "Design", "DevOps", "Soft Skills"].includes(formData.category || "") ? formData.category : "Custom"}
                                        onChange={e => {
                                            const val = e.target.value;
                                            if (val !== "Custom") setFormData({ ...formData, category: val });
                                            else setFormData({ ...formData, category: "" });
                                        }}
                                        className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                                    >
                                        <option value="Frontend">Frontend</option>
                                        <option value="Backend">Backend</option>
                                        <option value="Tools">Tools</option>
                                        <option value="Design">Design</option>
                                        <option value="DevOps">DevOps</option>
                                        <option value="Soft Skills">Soft Skills</option>
                                        <option value="Custom">Custom / Other...</option>
                                    </select>
                                    {(!["Frontend", "Backend", "Tools", "Design", "DevOps", "Soft Skills"].includes(formData.category || "")) && (
                                        <Input
                                            placeholder="Enter custom category..."
                                            value={formData.category}
                                            onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            className="bg-black/50 border-cyan-500/50"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Proficiency (0-100)</label>
                                <Input type="number" value={formData.proficiency} onChange={e => setFormData({ ...formData, proficiency: parseInt(e.target.value) })} className="bg-black/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Icon Name</label>
                                <select
                                    value={formData.icon_name}
                                    onChange={e => setFormData({ ...formData, icon_name: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                                >
                                    <option value="Code">Code</option>
                                    <option value="Database">Database</option>
                                    <option value="Layout">Layout</option>
                                    <option value="Server">Server</option>
                                    <option value="Smartphone">Smartphone</option>
                                    <option value="Terminal">Terminal</option>
                                    <option value="Box">Box</option>
                                    <option value="Cpu">Cpu</option>
                                    <option value="Globe">Globe</option>
                                    <option value="PenTool">PenTool</option>
                                    <option value="Palette">Palette</option>
                                    <option value="GitGraph">GitGraph</option>
                                    <option value="Command">Command</option>
                                </select>
                            </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map(skill => (
                        <div key={skill.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:border-cyan-500/30 transition-all">
                            <div>
                                <h3 className="font-bold text-white">{skill.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <span>{skill.category}</span>
                                    <span className="text-cyan-500">• {skill.proficiency}%</span>
                                </div>
                            </div>
                            <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(skill)}>
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(skill.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillsManager;
