import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../components/ArticleList';

function ArticleListPage() {
  // 1. STATE: We need to store the DB data, the search text, and loading status
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. FETCH: Get data from your Database (Port 8000)
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Make sure this port matches your server (8000 based on our fixes)
        const response = await fetch('http://localhost:5000/api/articles');
        
        if (!response.ok) {
           throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        setArticles(data); // Store the real data
        setLoading(false);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Could not load the library. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // 3. FILTER LOGIC: Filter the REAL data based on the search bar
  // We check Title and Content (since DB articles might not have 'category' yet)
  const filteredArticles = articles.filter((article) => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.content && article.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // 4. LOADING STATE DESIGN
  if (loading) {
    return (
      <div className="page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="muted" style={{ fontStyle: 'italic', fontFamily: 'serif' }}>Retrieving volumes from the stacks...</p>
      </div>
    );
  }

  // 5. ERROR STATE
  if (error) {
     return (
        <div className="page" style={{ padding: '40px', textAlign: 'center', color: '#8b0000' }}>
           <h3>Library Temporarily Closed</h3>
           <p>{error}</p>
        </div>
     );
  }

  // 6. RENDER THE BEAUTIFUL UI
  return (
    <div className="page">
      
      {/* HEADER SECTION */}
      <div className="page-header">
        <p className="eyebrow">The Index</p>
        <h1>Browse the full collection.</h1>
        <p className="lead">
          Everything we've ever published, organized for your perusal. 
          Grab a cup of tea and find something new to learn.
        </p>

        {/* SEARCH BAR */}
        <div className="search-container" style={{ marginTop: '24px' }}>
          <input 
            type="text" 
            placeholder="Search the catalogue (e.g., 'Winter', 'Fiction')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <hr style={{ margin: '40px 0', opacity: 0.3 }} />

      {/* LIST SECTION */}
      <div style={{ minHeight: '300px' }}>
        {filteredArticles.length > 0 ? (
          <>
            <p className="muted" style={{ fontSize: '0.9rem', marginBottom: '24px' }}>
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'volume' : 'volumes'}
            </p>
            {/* Pass the filtered DB articles to the list */}
            <ArticleList articles={filteredArticles} />
          </>
        ) : (
          // EMPTY STATE (When search finds nothing)
          <div className="not-found" style={{ padding: '40px', border: '1px dashed var(--border)' }}>
            <h3 style={{ margin: 0 }}>No volumes found.</h3>
            <p style={{ margin: '10px 0 0' }}>
              We couldn't locate that in our stacks. Try a different keyword.
            </p>
            <button 
              className="button-link secondary" 
              style={{ marginTop: '16px' }}
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* FOOTER CTA */}
      <div className="cta-banner" style={{ marginTop: '80px' }}>
        <h3 style={{ fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#c3b8b8ff' }}>Have a story to tell?</h3>
        <p>
          We are always looking for new voices to add to our shelves. 
          If you have a story to tell, we'd love to hear it.
        </p>
        {/* Updated link to point to your new Create Page */}
        <Link to="/create" className="button-link secondary" style={{ background: 'transparent', color: '#fff', borderColor: '#fff' }}>
          Upload Your Reads
        </Link>
      </div>
    </div>
  );
}

export default ArticleListPage;