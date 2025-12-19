import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="page">
      
      {/* 1. HEADER: Personal & Narrative */}
      <div className="page-header">
        <p className="eyebrow">Est. 2025</p>
        <h1>A sanctuary for stories in a digital world.</h1>
        <p className="lead">
          In an age of infinite scrolling and 15-second clips, we wanted to build a 
          quiet corner of the internet. A place where words matter, and where 
          every story gets the time it deserves.
        </p>
      </div>

      {/* 2. THE VISUAL BREAK: Coffee & Books */}
      <div className="hero-visual" style={{ margin: '20px 0 40px' }}>
        <div className="hero-panel" style={{ transform: 'rotate(1deg)' }}>
          <img 
            src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80" 
            alt="Open book and coffee on a wooden table"
          />
        </div>
      </div>

      {/* 3. CORE VALUES: Renamed to sound like 'Library Principles' */}
      <div className="section-heading">
        <h2>Our Philosophy.</h2>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="feature-icon" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>I</div>
          <h3>Slow Reading</h3>
          <p>
            We believe reading shouldn't be rushed. We design our interface to fade away,
            leaving just you and the words on the page. No distractions, no ads.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>II</div>
          <h3>Human Curation</h3>
          <p>
            Algorithms can predict what you click, but not what you feel. Every title 
            in our collection is hand-picked by our team of bibliophiles.
          </p>
        </div>
        <div className="about-card">
          <div className="feature-icon" style={{ fontFamily: 'serif', fontStyle: 'italic' }}>III</div>
          <h3>Archival Quality</h3>
          <p>
            We treat digital text with the reverence of physical ink. Typography, 
            spacing, and contrast are tuned for the most comfortable reading experience.
          </p>
        </div>
      </div>

      {/* 4. TIMELINE: Reimagined as "Chapters" */}
      <div className="section-heading" style={{ marginTop: '64px' }}>
        <h2>The History.</h2>
      </div>

      <div className="timeline">
        <div className="timeline-row">
          <strong style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', color: 'var(--accent)' }}>
            Chapter I
          </strong>
          <div>
            <span className="muted" style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>2024</span>
            <p>
              The concept is born. Tired of cluttered reading apps, we began sketching 
              layouts on the back of napkins in a small cafe in Quezon City.
            </p>
          </div>
        </div>
        <div className="timeline-row">
          <strong style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', color: 'var(--accent)' }}>
            Chapter II
          </strong>
          <div>
            <span className="muted" style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Early 2025</span>
            <p>
              The foundation is laid. We collected our first 50 titles and opened our 
              digital doors to a small group of beta readers.
            </p>
          </div>
        </div>
        <div className="timeline-row">
          <strong style={{ fontFamily: 'Playfair Display', fontSize: '1.2rem', color: 'var(--accent)' }}>
            Chapter III
          </strong>
          <div>
            <span className="muted" style={{ display: 'block', marginBottom: '4px', fontSize: '0.85rem' }}>Today</span>
            <p>
              Taglay is now open to the public. We are constantly expanding our shelves 
              and building features that bring readers together.
            </p>
          </div>
        </div>
      </div>

      {/* 5. SIGNATURE FOOTER: Replaces the generic CTA */}
      <div className="cta-banner" style={{ 
        marginTop: '60px', 
        background: 'var(--bg-paper)', 
        border: '1px solid var(--accent)', 
        color: 'var(--text)',
        boxShadow: 'none'
      }}>
        <h3 style={{ fontFamily: 'Playfair Display', fontStyle: 'italic' }}>
          "Come for the stories, stay for the quiet."
        </h3>
        
        {/* A handwritten-style signature */}
        <div style={{ marginTop: '20px', fontFamily: 'cursive', fontSize: '1.5rem', color: 'var(--accent)' }}>
          The Hearth & Pages Team
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <Link to="/articles" className="button-link primary">
            Browse Collection
          </Link>
        </div>
      </div>

    </div>
  );
}
export default AboutPage;