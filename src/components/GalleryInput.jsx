
import React, { useState } from 'react';
import { Wand2, Trash2 } from 'lucide-react';

export default function GalleryInput({ gallery, coverImage, onAdd, onRemove, onSetGallery }) {
    const [currentGalleryInput, setCurrentGalleryInput] = useState('');
    const [galleryCount, setGalleryCount] = useState('');

    const handleAdd = () => {
        const val = currentGalleryInput.trim();
        if (val && !gallery.includes(val)) {
            onAdd(val);
            setCurrentGalleryInput('');
        }
    };

    const generateGalleryFromCover = () => {
        const coverPath = coverImage ? coverImage.trim() : '';
        const count = parseInt(galleryCount);

        if (!coverPath) {
            alert('กรุณากรอก Path รูปปกก่อนครับ');
            return;
        }
        if (!count || count < 1) {
            alert('กรุณาระบุจำนวนรูปครับ');
            return;
        }

        const lastSlashIndex = coverPath.lastIndexOf('/');
        if (lastSlashIndex === -1) {
            alert('รูปแบบ Path รูปปกไม่ถูกต้อง');
            return;
        }

        const basePath = coverPath.substring(0, lastSlashIndex);
        let extension = '.jpg';
        const dotIndex = coverPath.lastIndexOf('.');
        if (dotIndex !== -1) {
            extension = coverPath.substring(dotIndex);
        }

        const newGallery = [];
        for (let i = 1; i <= count; i++) {
            newGallery.push(`${basePath}/${i}${extension}`);
        }

        onSetGallery(newGallery);
    };

    return (
        <div>
            <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-slate-700">Gallery Images</label>

                {/* Bulk Add Tool */}
                <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
                    <span className="text-xs text-slate-500 font-medium pl-1">จำนวนรูป</span>
                    <input
                        type="number"
                        value={galleryCount}
                        onChange={(e) => setGalleryCount(e.target.value)}
                        className="w-12 px-2 py-0.5 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500 outline-none text-center"
                        placeholder=""
                        min="1"
                    />
                    <span className="text-xs text-slate-400">รูป</span>
                    <button
                        type="button"
                        onClick={generateGalleryFromCover}
                        className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded transition flex items-center gap-1 shadow-sm"
                    >
                        <Wand2 className="w-3 h-3" /> สร้าง
                    </button>
                </div>
            </div>

            {/* Manual Add */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={currentGalleryInput}
                    onChange={(e) => setCurrentGalleryInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                    placeholder="หรือพิมพ์เพิ่มเอง..."
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-slate-100 text-slate-600 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-200 font-medium text-sm"
                >
                    เพิ่ม
                </button>
            </div>

            <div className="flex flex-col gap-2 mt-3 max-h-40 overflow-y-auto pr-2">
                {gallery.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm bg-slate-100 p-2 rounded border border-slate-200 group">
                        <span className="truncate font-mono text-slate-600">{item}</span>
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="text-slate-400 hover:text-red-500 p-1"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
