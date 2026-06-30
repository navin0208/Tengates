import { useState, useEffect } from 'react';
import { Loader2, UploadCloud, Trash2, GripVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';
import styles from './HeroSliderManager.module.css';

const HeroSliderManager = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('hero_slides')
      .select('*')
      .order('order_index', { ascending: true })
      .order('created_at', { ascending: false });

    if (!error && data) {
      setSlides(data);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `slides/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filePath);

      const nextOrder = slides.length > 0 ? Math.max(...slides.map(s => s.order_index)) + 1 : 0;

      const { error: dbError } = await supabase
        .from('hero_slides')
        .insert([{ image_url: data.publicUrl, order_index: nextOrder }]);

      if (dbError) throw dbError;

      fetchSlides();
    } catch (err) {
      console.error(err);
      setError('Error uploading image: ' + err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;
    
    try {
      await supabase.from('hero_slides').delete().eq('id', id);
      fetchSlides();
    } catch (err) {
      console.error('Failed to delete slide');
    }
  };

  return (
    <div className={styles.manager}>
      <div className={styles.headerRow}>
        <h2>Hero Slider Images</h2>
        <label className={styles.uploadBtn}>
          {uploading ? <Loader2 size={16} className={styles.spinner} /> : <UploadCloud size={16} />}
          {uploading ? 'Uploading...' : 'Upload New Slide'}
          <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
        </label>
      </div>
      <p className={styles.helperText}>These images will fade automatically on the homepage. High-quality landscape images are recommended.</p>

      {error && <div className={styles.errorAlert}>{error}</div>}

      {loading ? (
        <div className={styles.loader}><Loader2 size={24} className={styles.spinner} /> Loading slides...</div>
      ) : slides.length === 0 ? (
        <div className={styles.emptyState}>No hero images found. Upload one to get started!</div>
      ) : (
        <div className={styles.slideGrid}>
          {slides.map((slide, index) => (
            <div key={slide.id} className={styles.slideCard}>
              <div className={styles.slideImageWrapper}>
                <img src={slide.image_url} alt={`Slide ${index + 1}`} className={styles.slideImage} />
                <button className={styles.deleteBtn} onClick={() => handleDelete(slide.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <div className={styles.slideFooter}>
                <span className={styles.slideOrder}>Slide {index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroSliderManager;
