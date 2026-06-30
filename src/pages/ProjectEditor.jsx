import { useState } from 'react';
import { Loader2, UploadCloud, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import styles from './AdminDashboard.module.css';

const ProjectEditor = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    id: project?.id,
    slug: project?.slug || '',
    name: project?.name || '',
    location: project?.location || '',
    cost: project?.cost || '',
    year: project?.year || new Date().getFullYear(),
    status: project?.status || 'Completed',
    category: project?.category || 'Industrial',
    client: project?.client || '',
    buildingType: project?.buildingType || '',
    area: project?.area || '',
    duration: project?.duration || '',
    description: project?.description || '',
    img: project?.img || '',
    scope: project?.scope || [],
    highlights: project?.highlights || [],
    gallery: project?.gallery || { before: [], during: [], after: [] },
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Scopes and highlights local state for adding items
  const [newScope, setNewScope] = useState('');
  const [newHighlight, setNewHighlight] = useState('');

  const handleArrayAdd = (field, value, setter) => {
    if (!value.trim()) return;
    setFormData(prev => ({ ...prev, [field]: [...prev[field], value] }));
    setter('');
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => {
      const newArr = [...prev[field]];
      newArr.splice(index, 1);
      return { ...prev, [field]: newArr };
    });
  };

  const handleFileUpload = async (e, type, category = null) => {
    const file = e.target.files[0];
    if (!file) return;

    // Simple unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    try {
      setSaving(true);
      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      if (type === 'main') {
        setFormData(prev => ({ ...prev, img: data.publicUrl }));
      } else if (type === 'gallery' && category) {
        setFormData(prev => ({
          ...prev,
          gallery: {
            ...prev.gallery,
            [category]: [...prev.gallery[category], data.publicUrl],
          }
        }));
      }
    } catch (err) {
      console.error(err);
      setError('Error uploading file: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveGalleryImage = (category, index) => {
    setFormData(prev => {
      const newCat = [...prev.gallery[category]];
      newCat.splice(index, 1);
      return {
        ...prev,
        gallery: { ...prev.gallery, [category]: newCat }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      // Auto-generate slug if empty
      if (!formData.slug) {
        formData.slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      }

      const { error: dbError } = await supabase
        .from('projects')
        .upsert({ ...formData });

      if (dbError) throw dbError;
      onSave();
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  return (
    <form className={styles.editorForm} onSubmit={handleSubmit}>
      {error && <div className={styles.errorAlert}>{error}</div>}

      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label>Project Name *</label>
          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        
        <div className={styles.formGroup}>
          <label>Slug (URL) - Auto-generated if empty</label>
          <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. my-project-name" />
        </div>

        <div className={styles.formGroup}>
          <label>Client *</label>
          <input required type="text" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
        </div>

        <div className={styles.formGroup}>
          <label>Location *</label>
          <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
        </div>

        <div className={styles.formGroup}>
          <label>Category *</label>
          <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option>Industrial</option>
            <option>Agricultural</option>
            <option>Warehousing</option>
            <option>Commercial</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Status *</label>
          <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
            <option>Completed</option>
            <option>In Progress</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Year *</label>
          <input required type="number" value={formData.year} onChange={e => setFormData({...formData, year: parseInt(e.target.value)})} />
        </div>



        <div className={styles.formGroup}>
          <label>Building Type *</label>
          <input required type="text" value={formData.buildingType} onChange={e => setFormData({...formData, buildingType: e.target.value})} />
        </div>

        <div className={styles.formGroup}>
          <label>Total Area *</label>
          <input required type="text" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
        </div>

        <div className={styles.formGroup}>
          <label>Duration *</label>
          <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} />
        </div>
      </div>

      <div className={styles.formGroupFull}>
        <label>Description *</label>
        <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
      </div>

      {/* Dynamic Arrays */}
      <div className={styles.arraysGrid}>
        <div className={styles.arraySection}>
          <label>Scope of Work</label>
          <div className={styles.arrayInput}>
            <input 
              type="text" 
              value={newScope} 
              onChange={e => setNewScope(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('scope', newScope, setNewScope))}
              placeholder="Add scope item & press Enter"
            />
            <button type="button" onClick={() => handleArrayAdd('scope', newScope, setNewScope)}>+</button>
          </div>
          <ul className={styles.arrayList}>
            {formData.scope.map((item, i) => (
              <li key={i}>{item} <button type="button" onClick={() => handleArrayRemove('scope', i)}><X size={14}/></button></li>
            ))}
          </ul>
        </div>

        <div className={styles.arraySection}>
          <label>Key Numbers / Highlights</label>
          <div className={styles.arrayInput}>
            <input 
              type="text" 
              value={newHighlight} 
              onChange={e => setNewHighlight(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleArrayAdd('highlights', newHighlight, setNewHighlight))}
              placeholder="Add highlight & press Enter"
            />
            <button type="button" onClick={() => handleArrayAdd('highlights', newHighlight, setNewHighlight)}>+</button>
          </div>
          <ul className={styles.arrayList}>
            {formData.highlights.map((item, i) => (
              <li key={i}>{item} <button type="button" onClick={() => handleArrayRemove('highlights', i)}><X size={14}/></button></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Image Uploads */}
      <div className={styles.formGroupFull}>
        <h3>Images & Gallery</h3>
        
        <div className={styles.imageUploadSection}>
          <label>Main Thumbnail (Hero Image)</label>
          <div className={styles.uploadArea}>
            {formData.img && <img src={formData.img} alt="Thumbnail" className={styles.previewThumb} />}
            <label className={styles.uploadBtn}>
              <UploadCloud size={18} /> Upload Image
              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'main')} style={{display: 'none'}} />
            </label>
          </div>
        </div>

        {['before', 'during', 'after'].map(cat => (
          <div key={cat} className={styles.imageUploadSection}>
            <label>Gallery: {cat.toUpperCase()}</label>
            <div className={styles.galleryPreviews}>
              {formData.gallery[cat]?.map((imgUrl, i) => (
                <div key={i} className={styles.galleryPreviewItem}>
                  <img src={imgUrl} alt={cat} />
                  <button type="button" onClick={() => handleRemoveGalleryImage(cat, i)}><X size={14}/></button>
                </div>
              ))}
              <label className={styles.galleryUploadBtn}>
                <UploadCloud size={24} />
                <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'gallery', cat)} style={{display: 'none'}} />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.formActions}>
        <button type="button" className={styles.ghostBtn} onClick={onCancel} disabled={saving}>Cancel</button>
        <button type="submit" className={styles.primaryBtn} disabled={saving}>
          {saving ? <Loader2 size={18} className={styles.spinner} /> : 'Save Project'}
        </button>
      </div>
    </form>
  );
};

export default ProjectEditor;
