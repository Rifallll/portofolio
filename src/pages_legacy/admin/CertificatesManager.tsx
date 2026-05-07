import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, Edit2, Save, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/ImageUpload";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

// TYPE DEFINITION
type Certificate = {
    id: number;
    title: string;
    issuer: string;
    date: string;
    link: string;
    category: string;
    image_url?: string;
};

const CertificatesManager = () => {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Certificate>>({});

    // FETCH DATA
    const fetchCertificates = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("certificates")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            toast.error("Failed to fetch certificates");
        } else {
            // Map DB fields (org, year, credential_url) to frontend state (issuer, date, link)
            const mappedData = (data || []).map(item => ({
                id: item.id,
                title: item.title,
                issuer: item.org || "",
                date: item.year || "",
                link: item.credential_url || "",
                category: item.category || "Course",
                image_url: item.image_url || ""
            }));
            setCertificates(mappedData);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    // HANDLERS
    const handleEdit = (cert: Certificate) => {
        setIsEditing(cert.id);
        setFormData(cert);
    };

    const handleCancel = () => {
        setIsEditing(null);
        setFormData({});
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;

        const { error } = await supabase.from("certificates").delete().eq("id", id);
        if (error) {
            toast.error("Delete failed");
        } else {
            toast.success("Certificate deleted");
            fetchCertificates();
        }
    };

    const handleSave = async () => {
        if (!formData.title) return toast.error("Title is required");

        // Map frontend state back to DB fields
        const payload = {
            title: formData.title,
            org: formData.issuer,
            year: formData.date,
            credential_url: formData.link,
            category: formData.category,
            image_url: formData.image_url
        };

        if (isEditing && isEditing !== -1) {
            // UPDATE
            const { error } = await supabase
                .from("certificates")
                .update(payload)
                .eq("id", isEditing);

            if (error) toast.error("Update failed: " + error.message);
            else {
                toast.success("Certificate updated");
                handleCancel();
                fetchCertificates();
            }
        } else {
            // INSERT
            const { error } = await supabase
                .from("certificates")
                .insert([payload]);

            if (error) toast.error("Create failed: " + error.message);
            else {
                toast.success("Certificate created");
                handleCancel();
                fetchCertificates();
            }
        }
    };

    const handleAddNew = () => {
        setIsEditing(-1);
        setFormData({
            title: "",
            issuer: "",
            date: new Date().getFullYear().toString(),
            link: "#",
            category: "Tech",
            image_url: ""
        });
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">Certificates Vault</h1>
                    <p className="text-slate-400">Manage credentials and awards.</p>
                </div>
                <Button onClick={handleAddNew} className="bg-cyan-600 hover:bg-cyan-500">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Certificate
                </Button>
            </div>

            {/* EDITOR FORM */}
            {isEditing !== null && (
                <Card className="bg-slate-900 border-cyan-500/30 mb-8">
                    <CardContent className="p-6 space-y-4">
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">{isEditing === -1 ? "New Certificate" : "Edit Certificate"}</h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 col-span-2">
                                <label className="text-xs text-slate-400">Certificate Image (Optional)</label>
                                <ImageUpload
                                    value={formData.image_url}
                                    onChange={(url) => setFormData({ ...formData, image_url: url })}
                                    imageFit="contain"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Title</label>
                                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="bg-black/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Issuer</label>
                                <Input value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} className="bg-black/50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs text-slate-400">Date/Year</label>
                                <Input value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="bg-black/50" />
                            </div>
                             <div className="space-y-2">
                                 <label className="text-xs text-slate-400">Category</label>
                                 <div className="space-y-2">
                                     <select
                                         value={["Course", "Bootcamp", "Competition", "Workshop", "Certification"].includes(formData.category || "") ? formData.category : "Custom"}
                                         onChange={e => {
                                             const val = e.target.value;
                                             if (val !== "Custom") setFormData({ ...formData, category: val });
                                             else setFormData({ ...formData, category: "" });
                                         }}
                                         className="w-full bg-black/50 border border-white/10 rounded-md p-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                                     >
                                         <option value="Course">Course</option>
                                         <option value="Bootcamp">Bootcamp</option>
                                         <option value="Competition">Competition</option>
                                         <option value="Workshop">Workshop</option>
                                         <option value="Certification">Certification</option>
                                         <option value="Custom">Custom / Other...</option>
                                     </select>
                                     {(!["Course", "Bootcamp", "Competition", "Workshop", "Certification"].includes(formData.category || "")) && (
                                         <Input
                                             placeholder="Enter custom category..."
                                             value={formData.category}
                                             onChange={e => setFormData({ ...formData, category: e.target.value })}
                                             className="bg-black/50 border-cyan-500/50"
                                         />
                                     )}
                                 </div>
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
            )
            }

            {/* LIST */}
            {
                loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {certificates.map(cert => (
                            <div key={cert.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:border-cyan-500/30 transition-all">
                                <div>
                                    <h3 className="font-bold text-white">{cert.title}</h3>
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <span>{cert.issuer}</span>
                                        <span className="text-cyan-500">• {cert.date}</span>
                                        <span className="border border-white/10 px-2 rounded-full">{cert.category}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(cert)}>
                                        <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleDelete(cert.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
};

export default CertificatesManager;
