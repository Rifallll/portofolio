import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    className?: string;
    bucket?: string;
    imageFit?: "cover" | "contain";
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    value,
    onChange,
    className = "",
    bucket = "portfolio",
    imageFit = "cover"
}) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file) return;

            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image must be less than 5MB');
                return;
            }

            setUploading(true);
            setError(null);

            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

            onChange(data.publicUrl);
        } catch (err: any) {
            console.error('Upload Error:', err);
            setError(err.message || 'Error uploading image');
        } finally {
            setUploading(false);
            // Reset input so same file can be selected again if needed
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const clearImage = () => {
        onChange('');
        setError(null);
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <div
                className={`relative border-2 border-dashed rounded-xl transition-all duration-300 ${value ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800'
                    }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    disabled={uploading}
                />

                {value ? (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden group bg-black/40">
                        <img
                            src={value}
                            alt="Uploaded preview"
                            className={`w-full h-full object-${imageFit}`}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
                            <button
                                type="button"
                                className="p-2 bg-slate-800 rounded-full text-white hover:bg-cyan-600 transition-colors pointer-events-none"
                            >
                                <Upload className="w-5 h-5" />
                                <span className="sr-only">Change</span>
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent file dialog
                                    e.preventDefault();
                                    clearImage();
                                }}
                                className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-600 transition-colors z-30 cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 flex flex-col items-center justify-center text-slate-400">
                        {uploading ? (
                            <Loader2 className="w-10 h-10 animate-spin text-cyan-500 mb-2" />
                        ) : (
                            <div className="p-4 rounded-full bg-slate-800 mb-3 text-cyan-500">
                                <Upload className="w-6 h-6" />
                            </div>
                        )}
                        <p className="text-sm font-medium mb-1">
                            {uploading ? 'Uploading...' : 'Click to Upload Image'}
                        </p>
                        <p className="text-xs text-slate-500">
                            Max 5MB (PNG, JPG, WEBP)
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="text-red-400 text-xs flex items-center gap-2">
                    <X className="w-3 h-3" /> {error}
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
