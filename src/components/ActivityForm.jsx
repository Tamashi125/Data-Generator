
import React from 'react';
import { Edit3 } from 'lucide-react';
import TagsInput from './TagsInput';
import GalleryInput from './GalleryInput';
import { CATEGORIES, COVER_IMAGE_OPTIONS } from '../config';

export default function ActivityForm({
    formData,
    onChange,
    onAutoFillCover,
    tags,
    onAddTag,
    onRemoveTag,
    gallery,
    onAddGallery,
    onRemoveGallery,
    onSetGallery
}) {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-700">
                    <Edit3 className="w-5 h-5" /> กรอกข้อมูล
                </h2>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">

                    <div className="grid grid-cols-2 gap-4">
                        {/* ID */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">ID (ลำดับ)</label>
                            <input
                                type="number"
                                name="id"
                                value={formData.id}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="ลำดับ"
                            />
                        </div>
                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">หมวดหมู่ (Category)</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={onChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">วันที่ (ข้อความ)</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={onChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="วัน เดือน ปี"
                        />
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">หัวข้อกิจกรรม (Title)</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={onChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="ชื่อกิจกรรม..."
                        />
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">เนื้อหาโดยย่อ (Excerpt)</label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={onChange}
                            rows="4"
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            placeholder="รายละเอียดกิจกรรม..."
                        ></textarea>
                    </div>

                    {/* Featured Checkbox */}
                    <div className="py-2">
                        <label className="inline-flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={formData.featured}
                                onChange={onChange}
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-slate-300"
                            />
                            <span className="text-sm font-medium text-slate-700">แนะนำ (Featured)</span>
                        </label>
                    </div>

                    {/* Cover Image */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-slate-700">รูปปก (Cover Image Path)</label>
                            <div className="flex gap-2">
                                <span className="text-xs text-slate-400 self-center">สร้างอัตโนมัติ:</span>
                                {COVER_IMAGE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => onAutoFillCover(opt.value)}
                                        className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded transition"
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <input
                            type="text"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={onChange}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm"
                            placeholder=""
                        />
                    </div>

                    <hr className="border-slate-200" />

                    {/* Tags Management */}
                    <TagsInput
                        tags={tags}
                        onAdd={onAddTag}
                        onRemove={onRemoveTag}
                    />

                    {/* Gallery Management */}
                    <GalleryInput
                        gallery={gallery}
                        coverImage={formData.coverImage}
                        onAdd={onAddGallery}
                        onRemove={onRemoveGallery}
                        onSetGallery={onSetGallery}
                    />

                </form>
            </div>
        </div>
    );
}
