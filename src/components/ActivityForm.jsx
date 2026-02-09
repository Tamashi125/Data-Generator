import React from 'react';
import { Edit3 } from 'lucide-react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { th } from 'date-fns/locale/th';
import "react-datepicker/dist/react-datepicker.css";
import TagsInput from './TagsInput';
import GalleryInput from './GalleryInput';
import { CATEGORIES, COVER_IMAGE_OPTIONS } from '../config';

// Register Thai locale
registerLocale('th', th);

const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

// Helper to format Date to "d MMMM yyyy" (BE)
const formatThaiDate = (date) => {
    if (!date) return '';
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear() + 543;
    return `${day} ${month} ${year}`;
};

// Helper to parse "d MMMM yyyy" (BE) back to Date
const parseThaiDate = (dateString) => {
    if (!dateString) return null;
    try {
        const parts = dateString.split(' ');
        if (parts.length !== 3) return null;

        const day = parseInt(parts[0]);
        const monthIndex = months.indexOf(parts[1]);
        const yearBE = parseInt(parts[2]);
        const yearCE = yearBE - 543;

        if (monthIndex === -1) return null;

        return new Date(yearCE, monthIndex, day);
    } catch (e) {
        return null;
    }
};

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
                        <label className="block text-sm font-medium text-slate-700 mb-1">วันที่ (Date)</label>
                        <div className="relative">
                            <DatePicker
                                selected={formData.date ? parseThaiDate(formData.date) : null}
                                onChange={(date) => {
                                    if (date) {
                                        // Update formData with the formatted Thai date string
                                        onChange({
                                            target: {
                                                name: 'date',
                                                value: formatThaiDate(date)
                                            }
                                        });
                                    } else {
                                        onChange({
                                            target: {
                                                name: 'date',
                                                value: ''
                                            }
                                        });
                                    }
                                }}
                                locale="th"
                                dateFormat="d MMMM yyyy"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-full"
                                placeholderText="เลือกวันที่"
                                renderCustomHeader={({
                                    date,
                                    changeYear,
                                    changeMonth,
                                    decreaseMonth,
                                    increaseMonth,
                                    prevMonthButtonDisabled,
                                    nextMonthButtonDisabled,
                                }) => (
                                    <div className="flex items-center justify-between px-2 py-2">
                                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} type="button" className="p-1 hover:bg-slate-100 rounded">
                                            {'<'}
                                        </button>
                                        <div className="flex gap-2">
                                            <select
                                                value={date.getFullYear()}
                                                onChange={({ target: { value } }) => changeYear(parseInt(value))}
                                                className="p-1 border rounded"
                                            >
                                                {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 10 + i).map((y) => (
                                                    <option key={y} value={y}>
                                                        {y + 543}
                                                    </option>
                                                ))}
                                            </select>
                                            <select
                                                value={months[date.getMonth()]}
                                                onChange={({ target: { value } }) =>
                                                    changeMonth(months.indexOf(value))
                                                }
                                                className="p-1 border rounded"
                                            >
                                                {months.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled} type="button" className="p-1 hover:bg-slate-100 rounded">
                                            {'>'}
                                        </button>
                                    </div>
                                )}
                            />
                        </div>
                        
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
