import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Download, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface CVUpload {
    id: string;
    file_url: string;
    file_name: string;
    uploaded_at: string;
    is_active: boolean;
}

export default function CVManager() {
    const [currentCV, setCurrentCV] = useState<CVUpload | null>(null);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCurrentCV();
    }, []);

    const fetchCurrentCV = async () => {
        try {
            const { data, error } = await supabase
                .from("cv_uploads")
                .select("*")
                .eq("is_active", true)
                .single();

            if (error && error.code !== "PGRST116") throw error;
            setCurrentCV(data);
        } catch (error: unknown) {
            console.error("Error fetching CV:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (file.type !== "application/pdf") {
            toast.error("Only PDF files are allowed");
            return;
        }

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            toast.error("File size must be less than 10MB");
            return;
        }

        setUploading(true);

        try {
            // Deactivate current CV if exists
            if (currentCV) {
                await supabase
                    .from("cv_uploads")
                    .update({ is_active: false })
                    .eq("id", currentCV.id);

                // Delete old file from storage
                const oldFileName = currentCV.file_url.split("/").pop();
                await supabase.storage.from("cv-files").remove([oldFileName]);
            }

            // Upload new file
            const fileName = `cv_${Date.now()}.pdf`;
            const { error: uploadError } = await supabase.storage
                .from("cv-files")
                .upload(fileName, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: urlData } = supabase.storage
                .from("cv-files")
                .getPublicUrl(fileName);

            // Save to database
            const { data: newCV, error: dbError } = await supabase
                .from("cv_uploads")
                .insert({
                    file_url: urlData.publicUrl,
                    file_name: file.name,
                    is_active: true,
                })
                .select()
                .single();

            if (dbError) throw dbError;

            setCurrentCV(newCV);
            toast.success("CV uploaded successfully!");
        } catch (error: unknown) {
            console.error("Error uploading CV:", error);
            toast.error("Failed to upload CV");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!currentCV) return;

        if (!confirm("Are you sure you want to delete the current CV?")) return;

        try {
            // Delete from storage
            const fileName = currentCV.file_url.split("/").pop();
            await supabase.storage.from("cv-files").remove([fileName]);

            // Delete from database
            await supabase.from("cv_uploads").delete().eq("id", currentCV.id);

            setCurrentCV(null);
            toast.success("CV deleted successfully!");
        } catch (error: unknown) {
            console.error("Error deleting CV:", error);
            toast.error("Failed to delete CV");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">CV Manager</h1>
                <p className="text-gray-400">Upload and manage your CV/Resume</p>
            </div>

            {/* Current CV Card */}
            {currentCV && (
                <Card className="bg-black/40 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <FileText className="w-5 h-5 text-cyan-400" />
                            Current CV
                        </CardTitle>
                        <CardDescription>Active CV available for download</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                            <div className="flex items-center gap-3">
                                <FileText className="w-8 h-8 text-cyan-400" />
                                <div>
                                    <p className="text-white font-medium">{currentCV.file_name}</p>
                                    <p className="text-sm text-gray-400">
                                        Uploaded {new Date(currentCV.uploaded_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => window.open(currentCV.file_url, "_blank")}
                                    className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleDelete}
                                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Upload Card */}
            <Card className="bg-black/40 border-white/10">
                <CardHeader>
                    <CardTitle className="text-white">
                        {currentCV ? "Replace CV" : "Upload CV"}
                    </CardTitle>
                    <CardDescription>
                        Upload a PDF file (max 10MB). {currentCV && "This will replace the current CV."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <label
                        htmlFor="cv-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/20 rounded-lg cursor-pointer bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploading ? (
                                <>
                                    <Loader2 className="w-12 h-12 mb-4 text-cyan-400 animate-spin" />
                                    <p className="text-sm text-gray-400">Uploading...</p>
                                </>
                            ) : (
                                <>
                                    <Upload className="w-12 h-12 mb-4 text-cyan-400" />
                                    <p className="mb-2 text-sm text-gray-300">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400">PDF only (MAX. 10MB)</p>
                                </>
                            )}
                        </div>
                        <input
                            id="cv-upload"
                            type="file"
                            className="hidden"
                            accept="application/pdf"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                    </label>
                </CardContent>
            </Card>
        </div>
    );
}
