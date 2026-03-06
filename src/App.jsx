import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ExternalLink, Code2, Cpu, Database, CpuIcon, Award, GraduationCap, ChevronDown, Rocket, Layers, Terminal, Trophy, Send, User, MessageSquare, Briefcase, Star, Globe, Shield, Zap, Coffee, Code, Phone } from 'lucide-react';
import './index.css';

// --- Animated Components ---

const Particles = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            scale: [0, 1.5, 0],
            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            y: [Math.random() * 100 + '%', Math.random() * 100 + '%']
          }}
          transition={{
            duration: Math.random() * 15 + 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            background: i % 3 === 0 ? 'var(--neon-blue)' : i % 3 === 1 ? 'var(--neon-purple)' : 'var(--neon-cyan)',
            borderRadius: '50%',
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};

const SectionReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const LoadingScreen = () => {
  const [messages, setMessages] = useState([]);
  const fullMessages = [
    "Initializing Portfolio...",
    "Loading Developer Profile...",
    "Fetching Projects...",
    "Launching Interface..."
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < fullMessages.length) {
        setMessages(prev => [...prev, fullMessages[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: '#020617',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="loading-container" style={{ position: 'relative', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 3rem' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', inset: 0, border: '4px solid rgba(56, 189, 248, 0.1)', borderTopColor: 'var(--neon-blue)', borderRadius: '50%' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ position: 'absolute', inset: '20px', border: '4px solid rgba(139, 92, 246, 0.1)', borderTopColor: 'var(--neon-purple)', borderRadius: '50%' }}
          />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', fontWeight: 900, fontSize: '2rem', fontFamily: 'Outfit' }}
          >
            HHN
          </motion.div>
        </div>

        <div style={{ width: '300px', textAlign: 'left', fontFamily: 'monospace', color: 'var(--neon-cyan)', fontSize: '0.9rem' }}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ marginBottom: '0.5rem' }}
            >
              <span style={{ color: 'var(--neon-purple)' }}>[✓]</span> {msg}
            </motion.div>
          ))}
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ width: '10px', height: '18px', background: 'var(--neon-blue)', display: 'inline-block', verticalAlign: 'middle' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <nav className="glass" style={{
        position: 'fixed',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '800px',
        zIndex: 1001,
        padding: '0.8rem 1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '2rem',
        border: '1px solid rgba(255,255,255,0.08)',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ padding: '0 1rem', fontSize: '1.4rem', fontWeight: 900, fontFamily: 'Outfit', cursor: 'pointer' }} className="gradient-text" onClick={() => window.scrollTo(0, 0)}>HHN</div>
        <div className="nav-links">
          {['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={activeSection === item.toLowerCase() ? 'active' : ''}
              style={{ color: activeSection === item.toLowerCase() ? 'var(--neon-blue)' : 'var(--text-secondary)' }}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="mobile-menu-btn" style={{ display: 'none' }}>
          {/* Add mobile toggle if needed, but for now we hide nav info on mobile via CSS */}
        </div>
      </nav>
      <style>{`
        .nav-links { display: flex; gap: 0.5rem; }
        .nav-links a { 
          padding: 0.5rem 1rem; 
          border-radius: 1rem; 
          text-decoration: none; 
          font-size: 0.9rem; 
          font-weight: 600; 
          transition: all 0.3s; 
          position: relative;
        }
        .nav-links a:hover { color: var(--text-primary); background: rgba(255,255,255,0.05); }
        .nav-links a.active { background: rgba(56, 189, 248, 0.1); }
        .nav-links a.active::after { 
          content: ''; position: absolute; bottom: 0.2rem; left: 50%; 
          transform: translateX(-50%); width: 0.3rem; height: 0.3rem; 
          background: var(--neon-blue); border-radius: 50%; box-shadow: 0 0 10px var(--neon-blue);
        }
      `}</style>
    </>
  );
};

const Hero = () => {
  const titles = ["Software Developer", "Java Developer", "React Developer", "Professional Coder"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentTitle = titles[index % titles.length];
      if (!isDeleting) {
        setText(currentTitle.substring(0, text.length + 1));
        if (text === currentTitle) setTimeout(() => setIsDeleting(true), 1500);
      } else {
        setText(currentTitle.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setIndex(index + 1);
        }
      }
    }, isDeleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', paddingTop: '8rem' }}>
      <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }}></div>
      <div className="grid-responsive hero-grid" style={{ "--grid-cols": 'minmax(0, 1.3fr) 1fr', width: '100%', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} style={{ color: 'var(--neon-cyan)', fontWeight: 700, letterSpacing: '0.2em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ width: '40px', height: '2px', background: 'var(--neon-cyan)' }} className="hide-mobile"></span>
            HI, I'M HARI HARA NANDAN C V
          </motion.div>
          <h1 style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', lineHeight: 0.9, marginBottom: '2rem', fontFamily: 'Outfit', fontWeight: 900 }}>
            Building <span className="gradient-text">Future</span> <br />Digital Assets.
          </h1>
          <div style={{ height: '3rem', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: 'var(--text-primary)', fontWeight: 800, marginBottom: '2.5rem', fontFamily: 'Outfit' }}>
            <span style={{ color: 'var(--neon-blue)' }}>&gt;</span> {text}<span style={{ borderRight: '4px solid var(--neon-cyan)', animation: 'blink 1s infinite' }}></span>
          </div>
          <p style={{ maxWidth: '600px', color: 'var(--text-secondary)', marginBottom: '3.5rem', fontSize: '1.25rem', lineHeight: 1.6, marginInline: 'auto' }}>
            "Building intelligent web applications and innovative digital solutions."
          </p>
          <div className="hero-btns" style={{ display: 'flex', gap: '2rem' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(56, 189, 248, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              style={{ padding: '1.3rem 2.5rem', background: 'var(--neon-blue)', color: 'var(--bg-dark)', border: 'none', borderRadius: '1.2rem', cursor: 'pointer', fontWeight: 800, fontSize: '1.1rem' }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              View Projects
            </motion.button>
            <motion.a
              href="/Hari Hara Nandan C V.pdf"
              download
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              className="glass"
              style={{ padding: '1.3rem 2.5rem', color: 'white', borderRadius: '1.2rem', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', textDecoration: 'none' }}
            >
              Resume <Download size={20} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }} className="floating" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: -50, background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 60%)', filter: 'blur(40px)', zIndex: 0 }}></div>
          <div className="hero-artwork" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '8px solid rgba(56, 189, 248, 0.2)',
              boxShadow: '0 0 60px rgba(56, 189, 248, 0.3)'
            }}>
              <img src="/CV HARI HARA NANDAN.jpg" alt="Hari Hara Nandan C V" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Tech Icons Orbiting */}
            {[Code2, Rocket, Cpu, Database].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  padding: '1.2rem',
                  borderRadius: '1.2rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                  color: i % 2 === 0 ? 'var(--neon-blue)' : 'var(--neon-purple)',
                  zIndex: 2,
                  ...[
                    { top: '0%', right: '5%' },
                    { bottom: '15%', left: '0%' },
                    { top: '60%', right: '-5%' },
                    { top: '0%', left: '10%' }
                  ][i]
                }}
              >
                <Icon size={32} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const SectionHeading = ({ children, subtitle }) => (
  <SectionReveal>
    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
      <motion.p initial={{ letterSpacing: '0.1em' }} whileInView={{ letterSpacing: '0.5em' }} style={{ color: 'var(--neon-blue)', fontSize: '0.9rem', marginBottom: '1rem', textTransform: 'uppercase', fontWeight: 800 }}>{subtitle}</motion.p>
      <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontFamily: 'Outfit', fontWeight: 900, marginBottom: '2rem' }}>{children}</h2>
      <div style={{ width: '120px', height: '6px', background: 'linear-gradient(to right, var(--neon-blue), var(--neon-purple), var(--neon-cyan))', margin: '0 auto', borderRadius: '10px' }}></div>
    </div>
  </SectionReveal>
);

const About = () => {
  const stats = [
    { label: "Projects Built", value: "12+", icon: <Zap size={24} />, color: 'var(--neon-blue)' },
    { label: "Hackathons Won", value: "5", icon: <Trophy size={24} />, color: 'var(--neon-purple)' },
    { label: "Technologies", value: "8", icon: <Code size={24} />, color: 'var(--neon-cyan)' },
  ];

  return (
    <section id="about">
      <SectionHeading subtitle="Profile">About Me</SectionHeading>
      <div className="grid-responsive" style={{ "--grid-cols": '1.2fr 1fr' }}>
        <SectionReveal>
          <div className="glass-card" style={{ padding: 'clamp(2rem, 5vw, 4rem)', borderRadius: '3rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '200px', height: '200px', background: 'var(--neon-purple)', opacity: 0.1, filter: 'blur(60px)' }}></div>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '2rem', lineHeight: 1.7, fontWeight: 500 }}>
              Computer Science and Data Science student with strong foundations in <span style={{ color: 'var(--neon-blue)', fontWeight: 800 }}>Java, React, and Web Technologies</span>.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Passionate about building scalable applications and solving real-world problems using modern technologies. I thrive in competitive environments like hackathons and am always looking to push the boundaries of technical innovation.
            </p>
            <div style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
              <div style={{ borderLeft: '4px solid var(--neon-blue)', paddingLeft: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>8.7<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/10</span></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700 }}>CGPA ACROSS 5 SEMESTERS</div>
              </div>
              <div style={{ borderLeft: '4px solid var(--neon-purple)', paddingLeft: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)' }}>100<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>%</span></div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 700 }}>DEDICATION TO INNOVATION</div>
              </div>
            </div>
          </div>
        </SectionReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {stats.map((stat, i) => (
            <SectionReveal key={i} delay={i * 0.2}>
              <motion.div whileHover={{ x: 15 }} className="glass" style={{ padding: '2.5rem', borderRadius: '2rem', display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ padding: '1.2rem', borderRadius: '1.2rem', background: `rgba(${i === 0 ? '56, 189, 248' : i === 1 ? '139, 92, 246' : '34, 211, 238'}, 0.1)`, color: stat.color }}>{stat.icon}</div>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>{stat.value}</div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                </div>
                <div style={{ position: 'absolute', right: '-10px', bottom: '-10px', opacity: 0.03, transform: 'rotate(-15deg)' }}>{stat.icon}</div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const groups = [
    { title: "Languages", skills: ["Java", "SQL"], icon: <Terminal />, color: 'var(--neon-blue)', glow: 'rgba(56, 189, 248, 0.4)' },
    { title: "Web Mastery", skills: ["React", "JavaScript", "Vite"], icon: <Layers />, color: 'var(--neon-purple)', glow: 'rgba(139, 92, 246, 0.4)' },
    { title: "Data Systems", skills: ["MySQL", "JDBC"], icon: <Database />, color: 'var(--neon-cyan)', glow: 'rgba(34, 211, 238, 0.4)' },
  ];

  return (
    <section id="skills">
      <SectionHeading subtitle="Expertise">Technical Arsenal</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {groups.map((group, i) => (
          <SectionReveal key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -10 }}
              className="glass-card skill-card"
              style={{ padding: '3rem', height: '100%', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}
            >
              <div className="card-glow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${group.glow}, transparent 40%)`, opacity: 0, transition: 'opacity 0.5s' }}></div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ color: group.color, background: `${group.color}11`, padding: '1.2rem', borderRadius: '1.5rem', boxShadow: `0 0 20px ${group.color}22` }}>
                    {React.cloneElement(group.icon, { size: 30 })}
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'Outfit' }}>{group.title}</h3>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  {group.skills.map((skill, j) => (
                    <motion.span
                      key={j}
                      whileHover={{ scale: 1.1, color: group.color, borderColor: group.color }}
                      style={{ padding: '0.8rem 1.6rem', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.2rem', fontSize: '1rem', fontWeight: 700, transition: 'all 0.3s' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
      <style>{`
        .skill-card:hover .card-glow { opacity: 0.15; }
        .skill-card { cursor: crosshair; }
      `}</style>
    </section>
  );
};

const Projects = () => {
  const list = [
    {
      title: "AgriTech Smart Farming",
      problem: "Farmers struggle with unpredictable crop planning and limited market reach.",
      solution: "An AI-powered dashboard offering predictive analytics and direct consumer connections.",
      impact: "Optimized crop yields and increased farmer revenue by providing data-driven decision tools.",
      tech: ["React", "JavaScript", "Vite"],
      image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800",
      color: 'var(--neon-blue)',
      github: "https://github.com/Hari-2426",
      live: "https://github.com/Hari-2426"
    },
    {
      title: "Driver Management System",
      problem: "Logistics companies face inefficiencies in driver tracking and performance evaluation.",
      solution: "A robust Java-based administration system with real-time analytics and modular tracking.",
      impact: "Streamlined operational efficiency and improved safety monitoring through automated reporting.",
      tech: ["Java", "OOP", "MySQL"],
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800",
      color: 'var(--neon-purple)',
      github: "https://github.com/Hari-2426",
      live: "https://github.com/Hari-2426"
    }
  ];

  return (
    <section id="projects">
      <SectionHeading subtitle="Success Stories">Premium Projects</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 550px), 1fr))', gap: '4rem' }}>
        {list.map((p, i) => (
          <SectionReveal key={i} delay={i * 0.2}>
            <motion.div
              whileHover={{ y: -20 }}
              className="glass-card"
              style={{ borderRadius: '2.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}
            >
              <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="project-img" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent, rgba(2, 6, 23, 0.9))' }}></div>
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '2rem', right: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.8rem' }}>
                    {p.tech.map((t, j) => (
                      <span key={j} style={{ fontSize: '0.7rem', padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', color: 'white', borderRadius: '0.8rem', border: '1px solid rgba(255,255,255,0.1)', fontWeight: 700 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ padding: '2.5rem' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'Outfit', fontWeight: 900 }}>{p.title}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div style={{ background: 'rgba(56, 189, 248, 0.03)', padding: '1.2rem', borderRadius: '1.2rem', borderLeft: '3px solid var(--neon-blue)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--neon-blue)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1rem' }}>The Problem</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{p.problem}</p>
                  </div>
                  <div style={{ background: 'rgba(139, 92, 246, 0.03)', padding: '1.2rem', borderRadius: '1.2rem', borderLeft: '3px solid var(--neon-purple)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--neon-purple)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.1rem' }}>The Solution</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>{p.solution}</p>
                  </div>
                </div>

                <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '2.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <Star size={18} style={{ color: '#fbbf24' }} fill="#fbbf24" /> IMPACT: <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{p.impact}</span>
                </div>

                <div style={{ display: 'flex', gap: '1.2rem' }}>
                  <motion.a
                    href={p.live}
                    target="_blank"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)' }}
                    style={{ flex: 1.5, padding: '1.1rem', background: 'var(--neon-blue)', color: '#020617', borderRadius: '1.2rem', fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', textDecoration: 'none' }}
                  >
                    <Rocket size={18} /> LIVE DEMO
                  </motion.a>
                  <motion.a
                    href={p.github}
                    target="_blank"
                    whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.05)' }}
                    className="glass"
                    style={{ flex: 1, padding: '1.1rem', borderRadius: '1.2rem', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', textDecoration: 'none', color: 'white' }}
                  >
                    <Github size={18} /> GITHUB
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
      <style>{`
        .glass-card:hover .project-img { transform: scale(1.1); }
      `}</style>
    </section>
  );
};

const Achievements = () => {
  const items = [
    {
      title: "1st Place",
      event: "National Level Hackathon",
      desc: "Secured top position among 100+ competing teams nationwide. Developed a smart logistics solution.",
      color: "#fbbf24",
      glow: "rgba(251, 191, 36, 0.4)",
      impact: "Credibility: High • Scale: National"
    },
    {
      title: "3rd Place",
      event: "Vibe Coding Hackathon",
      desc: "Recognized for rapid prototyping and seamless integration of modern web frameworks.",
      color: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.4)",
      impact: "Credibility: Elite • Scale: Regional"
    },
    {
      title: "3rd Place",
      event: "College Tech Fest",
      desc: "Awarded for technical presentation excellence and innovative software architecture.",
      color: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.4)",
      impact: "Credibility: Strong • Scale: Campus"
    },
  ];

  return (
    <section id="achievements">
      <SectionHeading subtitle="Recognition">Global Achievements</SectionHeading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        {items.map((item, i) => (
          <SectionReveal key={i} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -15 }}
              className="glass-card achievement-card"
              style={{ padding: '4rem', textAlign: 'center', position: 'relative', overflow: 'hidden', border: `1px solid ${item.color}22` }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: item.color, boxShadow: `0 0 20px ${item.color}` }}></div>
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at center, ${item.glow}, transparent 70%)`, opacity: 0.05 }}></div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{ fontSize: '6rem', marginBottom: '2rem', filter: `drop-shadow(0 0 20px ${item.color}44)` }}
              >
                <Trophy size={80} color={item.color} strokeWidth={1.5} />
              </motion.div>

              <h3 style={{ fontSize: '2.2rem', color: item.color, marginBottom: '0.5rem', fontWeight: 900, fontFamily: 'Outfit' }}>{item.title}</h3>
              <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>{item.event}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>{item.desc}</p>

              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: item.color, letterSpacing: '0.1rem', textTransform: 'uppercase', background: `${item.color}11`, padding: '0.6rem', borderRadius: '0.8rem', display: 'inline-block' }}>
                {item.impact}
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>
      <style>{`
        .achievement-card:hover { border-color: inherit !important; box-shadow: 0 30px 60px rgba(0,0,0,0.5); }
      `}</style>
    </section>
  );
};

const Terminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'info', content: 'HHN-OS v1.0.4 - Initializing secure terminal...' },
    { type: 'info', content: 'Type "help" to see available commands.' }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      const newHistory = [...history, { type: 'cmd', content: `> ${input}` }];

      switch (cmd) {
        case 'help':
          newHistory.push({ type: 'res', content: 'Available commands: projects, skills, contact, clear, about, resume' });
          break;
        case 'projects':
          newHistory.push({ type: 'res', content: '1. AgriTech Smart Farming (React/ML)\n2. Driver Management System (Java/MySQL)' });
          break;
        case 'skills':
          newHistory.push({ type: 'res', content: 'Languages: Java, SQL\nWeb: React, JavaScript, Vite\nData: MySQL, JDBC' });
          break;
        case 'contact':
          newHistory.push({ type: 'res', content: 'Email: vedavyas2410@gmail.com\nLinkedIn: hari-hara-nandan-cv-608240354' });
          break;
        case 'about':
          newHistory.push({ type: 'res', content: 'CS Student | 8.7 CGPA | Hackathon Enthusiast | Building Future Assets.' });
          break;
        case 'resume':
          newHistory.push({ type: 'res', content: 'Downloading transmission data... (Check your browser)' });
          window.open('/Hari Hara Nandan C V.pdf', '_blank');
          break;
        case 'clear':
          setHistory([{ type: 'info', content: 'Console cleared. Type "help" for commands.' }]);
          setInput('');
          return;
        default:
          newHistory.push({ type: 'res', content: `Command not found: ${cmd}. Type "help" for a list of valid commands.` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <section id="terminal" style={{ paddingBottom: '10rem' }}>
      <SectionHeading subtitle="Advanced">Command Interface</SectionHeading>
      <SectionReveal>
        <div className="glass-card" style={{
          background: 'rgba(2, 6, 23, 0.95)',
          border: '1px solid var(--neon-cyan)33',
          borderRadius: '1.5rem',
          padding: '2rem',
          fontFamily: 'monospace',
          boxShadow: '0 0 50px rgba(34, 211, 238, 0.1)',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', opacity: 0.5 }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            <span style={{ fontSize: '0.8rem', marginLeft: '1rem' }}>hhn-os — bash — 80x24</span>
          </div>

          <div ref={scrollRef} style={{ height: '350px', overflowY: 'auto', marginBottom: '1.5rem', color: 'var(--neon-cyan)', fontSize: '1rem', lineHeight: 1.6 }}>
            {history.map((line, i) => (
              <div key={i} style={{
                marginBottom: '0.5rem',
                color: line.type === 'cmd' ? 'var(--text-primary)' : line.type === 'res' ? 'var(--neon-blue)' : 'var(--text-secondary)',
                whiteSpace: 'pre-wrap'
              }}>
                {line.content}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--neon-purple)', fontWeight: 900 }}>guest@HHN:~$</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--neon-cyan)', fontFamily: 'monospace', outline: 'none', fontSize: '1.1rem' }}
            />
          </div>
        </div>
      </SectionReveal>
    </section>
  );
};

const Contact = () => {
  const [sent, setSent] = useState(false);
  const contactLinks = [
    { icon: <Mail size={24} />, label: "Email", value: "vedavyas2410@gmail.com", href: "mailto:vedavyas2410@gmail.com", color: 'var(--neon-blue)' },
    { icon: <Linkedin size={24} />, label: "LinkedIn", value: "hari-hara-nandan-cv-608240354", href: "https://linkedin.com/in/hari-hara-nandan-cv-608240354", color: 'var(--neon-purple)' },
    { icon: <Github size={24} />, label: "GitHub", value: "Hari-2426", href: "https://github.com/Hari-2426", color: 'var(--neon-cyan)' },
    { icon: <Phone size={24} />, label: "Phone", value: "+91 83094 45394", href: "tel:+918309445394", color: 'var(--neon-blue)' }
  ];

  return (
    <section id="contact" style={{ marginBottom: '5rem' }}>
      <SectionHeading subtitle="Connection">Contact Transmission</SectionHeading>
      <div className="grid-responsive" style={{ "--grid-cols": '1fr 1.5fr' }}>
        <SectionReveal>
          <div className="glass-card" style={{ padding: 'clamp(2rem, 5vw, 4rem)', height: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900 }}>Let's Build the <span className="gradient-text">Future.</span></h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>My core objective is to leverage AI and software to solve real-world problems. Let's discuss a potential project or collaboration.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {contactLinks.map((link, i) => (
                <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <motion.div whileHover={{ x: 10 }} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ color: link.color }}>{link.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>{link.label}</div>
                      <div style={{ fontSize: '1rem', fontWeight: 600 }}>{link.value}</div>
                    </div>
                  </motion.div>
                </a>
              ))}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', gap: '1.5rem' }}>
              <motion.a href="https://github.com/Hari-2426" target="_blank" whileHover={{ y: -5, color: 'var(--neon-blue)' }} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}><Github size={32} /></motion.a>
              <motion.a href="https://linkedin.com/in/hari-hara-nandan-cv-608240354" target="_blank" whileHover={{ y: -5, color: 'var(--neon-purple)' }} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}><Linkedin size={32} /></motion.a>
              <motion.a href="mailto:vedavyas2410@gmail.com" whileHover={{ y: -5, color: 'var(--neon-cyan)' }} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }}><Mail size={32} /></motion.a>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.2}>
          <form className="glass-card" style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }} onSubmit={(e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div className="input-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: 700 }}>IDENTIFICATION</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--neon-blue)' }} />
                  <input type="text" placeholder="Your Name" required style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', color: 'white', transition: 'border-color 0.3s' }} className="form-input" />
                </div>
              </div>
              <div className="input-group">
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: 700 }}>EMAIL ADDRESS</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--neon-purple)' }} />
                  <input type="email" placeholder="Your Email" required style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', color: 'white' }} className="form-input" />
                </div>
              </div>
            </div>
            <div className="input-group">
              <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontSize: '0.9rem', fontWeight: 700 }}>TRANSMISSION DATA</label>
              <div style={{ position: 'relative' }}>
                <MessageSquare size={18} style={{ position: 'absolute', left: '1.2rem', top: '1.2rem', color: 'var(--neon-cyan)' }} />
                <textarea rows="6" placeholder="Project details or collaboration proposal..." required style={{ width: '100%', padding: '1.2rem 1.2rem 1.2rem 3.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem', color: 'white', resize: 'none' }} className="form-input"></textarea>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(56, 189, 248, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              style={{ padding: '1.5rem', background: 'linear-gradient(to right, var(--neon-blue), var(--neon-purple))', border: 'none', borderRadius: '1.2rem', color: 'var(--bg-dark)', fontWeight: 900, fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
            >
              {sent ? "TRANSMISSION SUCCESSFUL ✓" : "FINALIZE TRANSMISSION"} <Send size={20} />
            </motion.button>
          </form>
        </SectionReveal>
      </div>
      <style>{`
        .form-input:focus { outline: none; border-color: var(--neon-blue); box-shadow: 0 0 15px rgba(56, 189, 248, 0.2); }
      `}</style>
    </section>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container">
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="noise"></div>
          <Particles />
          <Navbar />

          <main style={{ padding: '0 2rem' }}>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Terminal />
            <Contact />
          </main>

          <footer style={{ padding: '6rem 2rem 4rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'Outfit', marginBottom: '2rem' }} className="gradient-text">HHN</div>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.2rem' }}>ENGINEERING THE FUTURE © {new Date().getFullYear()}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '3rem', color: 'var(--text-secondary)' }}>
              <a href="https://github.com/Hari-2426" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GITHUB</a>
              <a href="https://linkedin.com/in/hari-hara-nandan-cv-608240354" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LINKEDIN</a>
              <a href="mailto:vedavyas2410@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>EMAIL</a>
            </div>
            <div style={{ marginTop: '3rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
              Built for Hari Hara Nandan C V • React • Vite • Cinematic Brilliance.
            </div>
          </footer>
        </motion.div>
      )}

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .app-container { min-height: 100vh; background: var(--bg-dark); }
        main { max-width: 1400px; margin: 0 auto; }
      `}</style>
    </div>
  );
}
