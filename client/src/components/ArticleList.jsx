import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ArticleList.css';

const ArticleList = ({ articles }) => {
  return (
    <div className="article-list-grid">
      {articles.map((article) => (
        <Link 
          to={`/articles/${article._id}`} 
          key={article._id} 
          className="article-card"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div className="card-content">
            <p className="card-category">Story</p>
            
            <h3 className="card-title">{article.title}</h3>

            {/* NEW: Display the Book Author here */}
            {article.author && (
                <p style={{ 
                    fontStyle: 'italic', 
                    color: '#8C3f3F', // Using your accent color
                    marginBottom: '10px',
                    fontSize: '0.9rem',
                    fontFamily: 'Playfair Display, serif'
                }}>
                    By {article.author}
                </p>
            )}
            
            <p className="card-excerpt">
              {article.content ? article.content.substring(0, 100) + '...' : 'No preview available.'}
            </p>
            
            <div className="card-meta">
              {/* This shows who UPLOADED the review */}
              {article.user && (
                  <span className="author">Uploaded by {article.user.firstName} {article.user.lastName}</span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ArticleList;