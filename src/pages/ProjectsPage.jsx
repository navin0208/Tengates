import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import styles from './ProjectsPage.module.css';

const categories = ['All', 'Industrial', 'Agricultural', 'Warehousing', 'Commercial'];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('year', { ascending: false });
      
      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className={styles.page}>
      {/* Stats bar */}
      <div className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{projects.length}</span>
              <span className={styles.statLabel}>Key Projects</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>4</span>
              <span className={styles.statLabel}>States</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{projects.filter(p => p.status === 'In Progress').length}</span>
              <span className={styles.statLabel}>In Progress</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className={styles.filterSection}>
        <div className="container">
          <div className={styles.filterRow}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${activeFilter === cat ? styles.filterActive : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <section className={styles.gridSection}>
        <div className="container">
          <motion.div className={styles.grid} layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.article
                  key={project.id}
                  className={styles.card}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link to={`/projects/${project.slug}`} className={styles.cardLink}>
                    <div className={styles.cardImage}>
                      <img src={project.img} alt={project.name} />
                      <div className={styles.cardOverlay}>
                        <span className={styles.cardYear}>{project.year}</span>
                      </div>
                      {project.status === 'In Progress' && (
                        <span className={styles.liveBadge}>
                          <span className={styles.liveDot}></span>
                          In Progress
                        </span>
                      )}
                    </div>

                    <div className={styles.cardBody}>
                      <div className={styles.cardMeta}>
                        <span className={styles.cardCategory}>{project.category}</span>
                      </div>
                      <h3 className={styles.cardTitle}>{project.name}</h3>
                      <p className={styles.cardLocation}>{project.location}</p>
                      <p className={styles.cardDesc}>{project.description}</p>

                      {project.highlights && (
                        <ul className={styles.highlights}>
                          {project.highlights.slice(0, 3).map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                      <span className={styles.viewLink}>View Project →</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
