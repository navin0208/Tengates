import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, Clock, Building2, Ruler, User, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { allProjects } from '../data/projects';
import styles from './ProjectDetailPage.module.css';

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const ProjectDetailPage = () => {
  const { slug } = useParams();
  
  // Optimistic load: check local data first
  const initialProject = allProjects.find(p => p.slug === slug);
  
  const [project, setProject] = useState(initialProject || null);
  const [loading, setLoading] = useState(!initialProject);
  const [activeTab, setActiveTab] = useState('before');

  useEffect(() => {
    const fetchProject = async () => {
      if (!initialProject) {
        setLoading(true);
      }
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (!error && data) {
        setProject(data);
      }
      setLoading(false);
    };
    
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.notFound}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={styles.notFound}>
        <div className="container">
          <h2>Project not found</h2>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className={styles.backLink}>
            <ArrowLeft size={18} />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = project.gallery?.[activeTab] || [];
  const tabs = ['before', 'during', 'after'];

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={project.img} alt={project.name} className={styles.heroImage} />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={`container ${styles.heroContent}`}>
          <motion.div {...fadeIn()}>
            <Link to="/projects" className={styles.backLink}>
              <ArrowLeft size={18} />
              All Projects
            </Link>
          </motion.div>
          <motion.div className={styles.heroText} {...fadeIn(0.1)}>
            <div className={styles.heroBadges}>
              <span className={styles.categoryBadge}>{project.category}</span>
              <span className={`${styles.statusBadge} ${project.status === 'In Progress' ? styles.statusLive : styles.statusDone}`}>
                {project.status === 'In Progress' && <span className={styles.liveDot}></span>}
                {project.status}
              </span>
            </div>
            <h1 className={styles.heroTitle}>{project.name}</h1>
            <p className={styles.heroLocation}>
              <MapPin size={16} />
              {project.location}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details Grid */}
      <section className={styles.detailsSection}>
        <div className="container">
          <div className={styles.detailsGrid}>
            
            {/* Main Content */}
            <motion.div className={styles.mainContent} {...fadeIn()}>
              <h2 className={styles.sectionTitle}>About This Project</h2>
              <p className={styles.description}>{project.description}</p>

              {/* Scope of Work */}
              {project.scope && project.scope.length > 0 && (
                <div className={styles.scopeSection}>
                  <h3 className={styles.subTitle}>Scope of Work</h3>
                  <ul className={styles.scopeList}>
                    {project.scope.map((item, i) => (
                      <motion.li key={i} {...fadeIn(i * 0.05)}>
                        <span className={styles.scopeDot}></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className={styles.scopeSection}>
                  <h3 className={styles.subTitle}>Key Numbers</h3>
                  <div className={styles.highlightsGrid}>
                    {project.highlights.map((h, i) => (
                      <motion.div key={i} className={styles.highlightCard} {...fadeIn(i * 0.05)}>
                        {h}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.aside className={styles.sidebar} {...fadeIn(0.15)}>
              <div className={styles.factCard}>
                <h3 className={styles.factTitle}>Project Details</h3>
                <div className={styles.factList}>
                  <div className={styles.factItem}>
                    <div className={styles.factIcon}><User size={16} /></div>
                    <div>
                      <span className={styles.factLabel}>Client</span>
                      <span className={styles.factValue}>{project.client}</span>
                    </div>
                  </div>
                  <div className={styles.factItem}>
                    <div className={styles.factIcon}><Building2 size={16} /></div>
                    <div>
                      <span className={styles.factLabel}>Building Type</span>
                      <span className={styles.factValue}>{project.buildingType}</span>
                    </div>
                  </div>
                  <div className={styles.factItem}>
                    <div className={styles.factIcon}><Ruler size={16} /></div>
                    <div>
                      <span className={styles.factLabel}>Total Area</span>
                      <span className={styles.factValue}>{project.area}</span>
                    </div>
                  </div>
                  <div className={styles.factItem}>
                    <div className={styles.factIcon}><Calendar size={16} /></div>
                    <div>
                      <span className={styles.factLabel}>Year</span>
                      <span className={styles.factValue}>{project.year}</span>
                    </div>
                  </div>
                  <div className={styles.factItem}>
                    <div className={styles.factIcon}><Clock size={16} /></div>
                    <div>
                      <span className={styles.factLabel}>Duration</span>
                      <span className={styles.factValue}>{project.duration}</span>
                    </div>
                  </div>
                  <div className={styles.factItem}>
                    <div className={styles.factIcon}><MapPin size={16} /></div>
                    <div>
                      <span className={styles.factLabel}>Location</span>
                      <span className={styles.factValue}>{project.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className={styles.gallerySection}>
        <div className="container">
          <motion.div {...fadeIn()}>
            <h2 className={styles.sectionTitle}>Project Gallery</h2>
            <div className={styles.galleryTabs}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`${styles.galleryTab} ${activeTab === tab ? styles.galleryTabActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'before' ? 'Before' : tab === 'during' ? 'During Construction' : 'After Completion'}
                </button>
              ))}
            </div>
          </motion.div>

          <div className={styles.galleryGrid}>
            {galleryImages.length > 0 ? (
              galleryImages.map((imgSrc, i) => (
                <motion.div
                  key={`${activeTab}-${i}`}
                  className={styles.galleryItem}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <img src={imgSrc} alt={`${project.name} - ${activeTab} ${i + 1}`} />
                </motion.div>
              ))
            ) : (
              <div className={styles.emptyGallery}>
                <div className={styles.emptyIcon}>📷</div>
                <p className={styles.emptyText}>
                  {activeTab === 'before' && 'Before construction photos will be added here.'}
                  {activeTab === 'during' && 'Construction progress photos will be added here.'}
                  {activeTab === 'after' && 'Completed project photos will be added here.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className={styles.navSection}>
        <div className="container">
          <Link to="/projects" className={styles.backBtn}>
            <ArrowLeft size={18} />
            Back to All Projects
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
