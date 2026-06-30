import { useState, useEffect } from 'react';
import { LogOut, Plus, Edit2, Trash2, Image as ImageIcon, MessageSquare, MonitorPlay } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import ProjectEditor from './ProjectEditor';
import HeroSliderManager from './HeroSliderManager';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'projects') {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error) setProjects(data || []);
    } else {
      const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
      if (!error) setInquiries(data || []);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut();
  };

  const renderProjects = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Manage Projects</h2>
        <button className={styles.primaryBtn} onClick={() => { setCurrentProject(null); setIsEditing(true); }}>
          <Plus size={16} /> New Project
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr><td colSpan="4" className={styles.emptyState}>No projects found. Create one to get started.</td></tr>
            ) : (
              projects.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${p.status === 'Completed' ? styles.statusSuccess : styles.statusWarning}`}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.iconBtn} title="Edit" onClick={() => { setCurrentProject(p); setIsEditing(true); }}>
                        <Edit2 size={16} />
                      </button>
                      <button className={styles.iconBtn} title="Delete" onClick={async () => {
                        if(confirm('Are you sure you want to delete this project?')) {
                          await supabase.from('projects').delete().eq('id', p.id);
                          fetchData();
                        }
                      }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderInquiries = () => (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>Inquiries</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 ? (
              <tr><td colSpan="4" className={styles.emptyState}>No inquiries yet.</td></tr>
            ) : (
              inquiries.map(i => (
                <tr key={i.id}>
                  <td>{new Date(i.created_at).toLocaleDateString()}</td>
                  <td>{i.name}</td>
                  <td><a href={`mailto:${i.email}`}>{i.email}</a></td>
                  <td className={styles.messageCell}>{i.message}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img src="/logos/TenGates.png" alt="Ten Gates Admin" className={styles.logoImg} />
          <span className={styles.userEmail}>{user?.email}</span>
        </div>
        
        <nav className={styles.nav}>
          <button 
            className={`${styles.navItem} ${activeTab === 'projects' ? styles.active : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <ImageIcon size={18} /> Projects
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'inquiries' ? styles.active : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <MessageSquare size={18} /> Inquiries
          </button>
          <button 
            className={`${styles.navItem} ${activeTab === 'hero' ? styles.active : ''}`}
            onClick={() => { setActiveTab('hero'); setIsEditing(false); }}
          >
            <MonitorPlay size={18} /> Hero Slider
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        {loading ? (
          <div className={styles.loader}>Loading data...</div>
        ) : (
          <>
            {activeTab === 'projects' && !isEditing && renderProjects()}
            {activeTab === 'inquiries' && renderInquiries()}
            {activeTab === 'hero' && <HeroSliderManager />}
            {isEditing && (
              <div className={styles.editorContainer}>
                <div className={styles.sectionHeader}>
                  <h2>{currentProject ? 'Edit Project' : 'New Project'}</h2>
                </div>
                <ProjectEditor 
                  project={currentProject} 
                  onSave={() => {
                    setIsEditing(false);
                    setCurrentProject(null);
                    fetchData();
                  }}
                  onCancel={() => {
                    setIsEditing(false);
                    setCurrentProject(null);
                  }}
                />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
