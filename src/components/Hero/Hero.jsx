import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      {/* LEFT MARKETING TITLE BLOCK */}
      <div className="hero-left">
        <h1>
          Learn New Skills Online With <span className="hero-gradient-text">LernX</span>
        </h1>

        <p>
          Unlock your true learning potential. Join our global classroom, 
          study at your own pace, and acquire industry-ready skills under expert guidance.
        </p>

        <button className="hero-btn" onClick={() => {
          document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" });
        }}>
          Explore Courses
        </button>
      </div>

      {/* RIGHT ABSTRACT INTERFACE BLOCK */}
      <div className="hero-right">
        <div className="hero-card">
          {/* Subtle animated neon light sphere backdrop */}
          <div className="tech-glow-circle"></div>
          
          {/* Decorative tech vector art shapes */}
          <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.15 }}>
            <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="50,25 75,65 25,65" stroke="#ffffff" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Premium floating glass indicator badge */}
        <div className="glass-stat-badge">
          <div className="badge-icon">🎓</div>
          <div className="badge-info">
            <span className="badge-num">10K+</span>
            <span className="badge-text">Active Global Students</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;