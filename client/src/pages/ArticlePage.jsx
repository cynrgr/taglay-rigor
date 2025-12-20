import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';

function ArticlePage() {
  const { name } = useParams(); // 'name' here actually holds the ID because of your route path
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Fetch specific article by ID
        const response = await fetch(`http://localhost:5000/api/articles/${name}`);
        if (!response.ok) {
           setLoading(false);
           return;
        }
        const data = await response.json();
        setArticle(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [name]);

  if (loading) return <div style={{textAlign:'center', marginTop: '50px'}}>Loading story...</div>;
  if (!article) return <NotFoundPage />;

  // Calculate read time roughly
  const words = article.content ? article.content.split(' ').length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return (
    <div className="page article-page">
      <div className="page-header">
        <p className="eyebrow">Article</p>
        <h1>{article.title}</h1>
        <div className="article-meta">
          <span className="pill">Story</span>
          <span className="muted">{minutes} min read</span>
          {article.user && <span className="muted" style={{marginLeft: '10px'}}>By {article.user.firstName} {article.user.lastName}</span>}
        </div>
      </div>

      <div className="article-body">
        {/* We use white-space: pre-wrap so the line breaks from the textarea are preserved */}
        <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'Merriweather, serif', lineHeight: '1.8', color: '#333' }}>
           {article.content}
        </div>

        <div className="card callout" style={{ marginTop: '50px' }}>
          <h3>Want another angle?</h3>
          <p>
            Browse our full collection of stories and archives.
          </p>
          <Link to="/articles" className="button-link primary">
            Back to Collection
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;