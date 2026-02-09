
import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TagsInput({ tags, onAdd, onRemove }) {
    const [currentTag, setCurrentTag] = useState('');

    const handleAdd = () => {
        const val = currentTag.trim();
        if (val && !tags.includes(val)) {
            onAdd(val);
            setCurrentTag('');
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Tags (กด Enter เพื่อเพิ่ม)</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder=""
                />
                <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 font-medium"
                >
                    เพิ่ม
                </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3 min-h-[30px]">
                {tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-700">
                        {tag}
                        <button
                            type="button"
                            onClick={() => onRemove(index)}
                            className="hover:text-pink-900 focus:outline-none ml-1"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>
        </div>
    );
}
