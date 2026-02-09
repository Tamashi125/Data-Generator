
import React, { useState, useEffect } from 'react';
import { RotateCcw, Copy, Check } from 'lucide-react';

export default function JsonPreview({ formData, tags, gallery, onReset }) {
    const [copied, setCopied] = useState(false);
    const [jsonOutput, setJsonOutput] = useState('');

    useEffect(() => {
        const data = {
            id: formData.id ? parseInt(formData.id) : null,
            category: formData.category,
            date: formData.date,
            title: formData.title,
            excerpt: formData.excerpt,
            coverImage: formData.coverImage,
            featured: formData.featured,
            tags: tags,
            gallery: gallery
        };

        // Format as JS Object (keys without quotes)
        let jsonString = JSON.stringify(data, null, 4);
        jsonString = jsonString.replace(/"([^"]+)":/g, '$1:');

        setJsonOutput(jsonString);
    }, [formData, tags, gallery]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(jsonOutput).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-slate-900 text-slate-300 rounded-xl shadow-xl overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
            {/* Toolbar */}
            <div className="bg-slate-800 px-4 py-3 flex justify-between items-center border-b border-slate-700">
                <span className="text-sm font-mono font-medium text-slate-400">result.json</span>
                <div className="flex gap-2">
                    <button
                        onClick={onReset}
                        className="text-xs flex items-center gap-1 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 rounded transition"
                    >
                        <RotateCcw className="w-3 h-3" /> รีเซ็ต
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className={`text-xs flex items-center gap-1 text-white px-3 py-1.5 rounded transition font-medium ${copied ? 'bg-blue-600 hover:bg-blue-500' : 'bg-emerald-600 hover:bg-emerald-500'
                            }`}
                    >
                        {copied ? (
                            <>
                                <Check className="w-3 h-3" /> เรียบร้อย
                            </>
                        ) : (
                            <>
                                <Copy className="w-3 h-3" /> คัดลอก
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Area */}
            <div className="relative flex-1 overflow-auto bg-[#1e1e1e] p-4 font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                <pre className="text-green-400 whitespace-pre-wrap">{jsonOutput}</pre>
            </div>
        </div>
    );
}
