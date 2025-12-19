import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import articles from '../article-content';

function ArticleListPage() {
  const [articleList, setArticleList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief "retrieving" delay for effect
    setTimeout(() => {
      setArticleList(articles);
      setIsLoading(false);
    }, 600);
  }, []);

  // Filter logic: Search by title or category
  const filteredArticles = articleList.filter((article) => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (article.category && article.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="muted" style={{ fontStyle: 'italic', fontFamily: 'serif' }}>Retrieving volumes from the stacks...</p>
      </div>
    );
  }

  return (
    <div className="page">
      
      {/* 1. ARCHIVE HEADER */}
      <div className="page-header">
        <p className="eyebrow">The Index</p>
        <h1>Browse the full collection.</h1>
        <p className="lead">
          Everything we've ever published, organized for your perusal. 
          Grab a cup of tea and find something new to learn.
        </p>

        {/* 2. THE SEARCH BAR (New Feature) */}
        <div className="search-container" style={{ marginTop: '24px' }}>
          <input 
            type="text" 
            placeholder="Search the catalogue (e.g., 'React', 'Fiction')..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <hr style={{ margin: '40px 0', opacity: 0.3 }} />

      {/* 3. THE LIST */}
      <div style={{ minHeight: '300px' }}>
        {filteredArticles.length > 0 ? (
          <>
             {/* Optional: Show how many results found */}
            <p className="muted" style={{ fontSize: '0.9rem', marginBottom: '24px' }}>
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'volume' : 'volumes'}
            </p>
            <ArticleList articles={filteredArticles} />
          </>
        ) : (
          // Empty State
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

      {/* 4. FOOTER CTA */}
      <div className="cta-banner" style={{ marginTop: '80px' }}>
        <h3>Have a story to tell?</h3>
        <p>
          We are always looking for new voices to add to our shelves. 
          If you have an idea for an article, we'd love to hear it.
        </p>
        <Link to="/about" className="button-link secondary" style={{ background: 'transparent', color: '#fff', borderColor: '#fff' }}>
          Submit a Manuscript
        </Link>
      </div>
    </div>
  );
}

export default ArticleListPage;