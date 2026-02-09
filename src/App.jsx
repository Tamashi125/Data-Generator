import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ActivityForm from './components/ActivityForm';
import JsonPreview from './components/JsonPreview';
import { CATEGORIES } from './config';

export default function App() {
  // State for form fields
  const [formData, setFormData] = useState({
    id: '',
    category: CATEGORIES[0],
    date: '',
    title: '',
    excerpt: '',
    coverImage: '',
    featured: false,
  });

  // State for collections
  const [tags, setTags] = useState([]);
  const [gallery, setGallery] = useState([]);

  // State for inputs (these are now managed within ActivityForm)
  // const [currentTag, setCurrentTag] = useState('');
  // const [currentGalleryInput, setCurrentGalleryInput] = useState('');
  // const [galleryCount, setGalleryCount] = useState('');

  // State for UI feedback (these are now managed within JsonPreview)
  // const [copied, setCopied] = useState(false);
  // const [jsonOutput, setJsonOutput] = useState('');

  // Form key to force re-render on reset
  const [formKey, setFormKey] = useState(0);

  // Update JSON output whenever data changes (this logic is now in JsonPreview)
  // useEffect(() => {
  //   const data = {
  //     id: formData.id ? parseInt(formData.id) : null,
  //     category: formData.category,
  //     date: formData.date,
  //     title: formData.title,
  //     excerpt: formData.excerpt,
  //     coverImage: formData.coverImage,
  //     featured: formData.featured,
  //     tags: tags,
  //     gallery: gallery
  //   };

  //   // Format as JS Object (keys without quotes)
  //   let jsonString = JSON.stringify(data, null, 4);
  //   jsonString = jsonString.replace(/"([^"]+)":/g, '$1:');

  //   setJsonOutput(jsonString);
  // }, [formData, tags, gallery]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTag = (val) => {
    if (val && !tags.includes(val)) {
      setTags([...tags, val]);
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addGalleryItem = (val) => {
    if (val && !gallery.includes(val)) {
      setGallery([...gallery, val]);
    }
  };

  const removeGalleryItem = (index) => {
    setGallery(gallery.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    if (window.confirm('ต้องการล้างข้อมูลทั้งหมดใช่หรือไม่?')) {
      setFormData({
        id: '',
        category: CATEGORIES[0],
        date: '',
        title: '',
        excerpt: '',
        coverImage: '',
        featured: false,
      });
      setTags([]);
      setGallery([]);
      setFormKey(prev => prev + 1); // Increment key to force re-render of ActivityForm
    }
  };

  // Auto-fill Logic
  // Auto-fill Logic
  const getAutoPath = (type) => {
    let date = new Date(); // Default to today

    if (formData.date) {
      // Parse date from "29 มกราคม 2569"
      const parts = formData.date.split(' ');
      if (parts.length === 3) {
        const months = [
          'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
          'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
        ];
        const day = parseInt(parts[0]);
        const monthIndex = months.indexOf(parts[1]);
        const yearBE = parseInt(parts[2]);
        const yearCE = yearBE - 543;

        if (monthIndex !== -1) {
          date = new Date(yearCE, monthIndex, day);
        }
      }
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = (date.getFullYear() + 543).toString().slice(-2); // BE Short Year
    return `/${type}/${day}-${month}-${year}/1.jpg`;
  };

  const autoFillCover = (type) => {
    setFormData(prev => ({
      ...prev,
      coverImage: getAutoPath(type)
    }));
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Left Column: Input Form */}
        <ActivityForm
          key={formKey} // Use key to force re-render on reset
          formData={formData}
          onChange={handleInputChange}
          onAutoFillCover={autoFillCover}
          tags={tags}
          onAddTag={addTag}
          onRemoveTag={removeTag}
          gallery={gallery}
          onAddGallery={addGalleryItem}
          onRemoveGallery={removeGalleryItem}
          onSetGallery={setGallery} // Pass setGallery for bulk generation
        />

        {/* Right Column: Output */}
        <div className="sticky top-24 h-fit space-y-4">
          <JsonPreview
            formData={formData}
            tags={tags}
            gallery={gallery}
            onReset={resetForm}
          />

          <div className="text-center text-xs text-slate-400">
            ข้อมูลจะอัพเดทอัตโนมัติเมื่อมีการแก้ไข
          </div>
        </div>
      </div>
    </div>
  );
}