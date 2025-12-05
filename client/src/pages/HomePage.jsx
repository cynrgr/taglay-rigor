import React from 'react';
import { Link } from 'react-router-dom';
import articles from '../article-content';

function HomePage() {
  // Get the latest 3 books
  const newArrivals = articles.slice(0, 3);

  return (
    <div className="page">
      
      {/* SECTION 1: THE READING NOOK (HERO) */}
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Established 2025</p>
          <h1>The Grand Library.</h1>
          <p className="lead">
            Welcome to your digital sanctuary. Wander through our curated aisles 
            of timeless classics and modern masterpieces. Silence is optional, 
            but curiosity is required.
          </p>
          
          <div className="hero-actions">
            <Link to="/articles" className="button-link primary">
              Enter the Stacks
            </Link>
            <Link to="/about" className="button-link secondary">
              Library Card
            </Link>
          </div>

          {/* Styled to look like a "Circulation Stamp" */}
          <div className="stats">
            <div className="stat">
              <strong>{articles.length}k+</strong>
              <span>Volumes</span>
            </div>
            <div className="stat">
              <strong>Open</strong>
              <span>24/7 Access</span>
            </div>
            <div className="stat">
              <strong>Free</strong>
              <span>Membership</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-panel">
            <img
    // Keep this Unsplash link or ensure your local image is warm/cozy
    src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
    alt="Cozy library bookshelf"
  />
            <p className="muted" style={{ fontStyle: 'italic', marginTop: '10px' }}>
              "I have always imagined that Paradise will be a kind of library." — Jorge Luis Borges
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE CARD CATALOG (GENRES) */}
      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Dewey Decimal System</p>
            <h2>The Card Catalog.</h2>
          </div>
          <span className="muted">Sort by Category</span>
        </div>
        
        <div className="feature-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="feature-icon">I</div>
            <h3>Fiction & Prose</h3>
            <p>
              Narratives that reflect the human experience. From tragic romances 
              to epic adventures.
            </p>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="feature-icon">II</div>
            <h3>Historical Records</h3>
            <p>
              Non-fiction accounts of the past. Biographies, war logs, and 
              cultural studies.
            </p>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="feature-icon">III</div>
            <h3>Speculative Arts</h3>
            <p>
              Science fiction and fantasy. Explore worlds that exist only 
              in the imagination.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: LITERARY QUOTE BREAK */}
      <section className="cta-banner">
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#c3b8b8ff' }}>
          "A reader lives a thousand lives before he dies. The man who never reads lives only one."
        </h3>
        <p>— George R.R. Martin</p>
      </section>

      {/* SECTION 4: NEW ON THE SHELF */}
      <section className="articles-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Circulation Desk</p>
            <h2>Just Arrived.</h2>
          </div>
          <Link to="/articles" className="button-link secondary">
            View Full Index
          </Link>
        </div>

        <div className="article-preview-grid">
          {newArrivals.map((article) => (
            <div key={article.name} className="article-preview">
              <div className="article-meta">
                <span className="pill">{article.category || 'General Collection'}</span>
                {/* Simulated "Date Stamped" look */}
                <span className="muted" style={{ fontFamily: 'monospace' }}>
                  OCT 14 2025
                </span>
              </div>
              
              <h3>{article.title}</h3>
              
              {/* Using a serif font for the excerpt to look like book text */}
              <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem' }}>
                {article.content[0].substring(0, 120)}...
              </p>
              
              <Link to={`/articles/${article.name}`} className="button-link secondary" style={{border: 'none', paddingLeft: 0, justifyContent: 'flex-start'}}>
                Checkout Title &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default HomePage;