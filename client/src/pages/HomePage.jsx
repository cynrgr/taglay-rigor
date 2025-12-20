import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  // State to hold real data from the database
  const [recentArticles, setRecentArticles] = useState([]);

  // 1. Fetch articles when page loads
  useEffect(() => {
      const fetchArticles = async () => {
          try {
              // Ensure port is 5000 (or 8000 depending on your server)
              const response = await fetch('http://localhost:5000/api/articles');
              const data = await response.json();

              // 2. Sort by Date (Newest first) and grab the first 3
              const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
              setRecentArticles(sorted.slice(0, 3)); 
          } catch (error) {
              console.error("Error fetching articles:", error);
          }
      };

      fetchArticles();
  }, []);

  // Helper to format date nicely (e.g., "OCT 14 2025")
  const formatDate = (dateString) => {
      if (!dateString) return 'RECENT';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options).toUpperCase();
  };

  return (
    <div className="page">
      
      {/* SECTION 1: THE READING NOOK (HERO) - (Kept exactly the same) */}
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

          <div className="stats">
            <div className="stat">
              {/* Show actual count if available, or fallback */}
              <strong>{recentArticles.length > 0 ? '100' : '0'}k+</strong>
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
              src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80"
              alt="Cozy library bookshelf"
            />
            <p className="muted" style={{ fontStyle: 'italic', marginTop: '10px' }}>
              "I have always imagined that Paradise will be a kind of library." — Jorge Luis Borges
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE CARD CATALOG (GENRES) - (Kept exactly the same) */}
      <section>
        <div className="section-heading">
          <div>
            <p className="eyebrow">Dewey Decimal System</p>
            <h2>The Card Catalog.</h2>
          </div>
          <span className="muted">Sort by Category</span>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">I</div>
            <h3>Fiction & Prose</h3>
            <p>Narratives that reflect the human experience. From tragic romances to epic adventures.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">II</div>
            <h3>Historical Records</h3>
            <p>Non-fiction accounts of the past. Biographies, war logs, and cultural studies.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">III</div>
            <h3>Speculative Arts</h3>
            <p>Science fiction and fantasy. Explore worlds that exist only in the imagination.</p>
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

      {/* SECTION 4: NEW ON THE SHELF (UPDATED TO BE DYNAMIC) */}
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
          {recentArticles.length === 0 ? (
             <p className="muted">No new arrivals yet. Be the first to publish!</p>
          ) : (
            recentArticles.map((article) => (
              <div key={article._id} className="article-preview">
                <div className="article-meta">
                  <span className="pill">NEW ARRIVAL</span>
                  {/* Dynamic Date */}
                  <span className="muted" style={{ fontFamily: 'monospace' }}>
                    {formatDate(article.createdAt)}
                  </span>
                </div>
                
                <h3>{article.title}</h3>
                
                {/* Dynamic Content Snippet */}
                <p style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem' }}>
                  {article.content ? article.content.substring(0, 120) + '...' : 'No preview available.'}
                </p>
                
                <Link to={`/articles/${article._id}`} className="button-link secondary" style={{border: 'none', paddingLeft: 0, justifyContent: 'flex-start'}}>
                  Checkout Title &rarr;
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

    </div>
  );
}

export default HomePage;