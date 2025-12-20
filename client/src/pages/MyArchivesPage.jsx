import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import ConfirmModal from '../components/ConfirmModal';
import '../styles/ArticleList.css'; 

const MyArchivesPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // State for Success Modal
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    
    // State for Confirm Modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null); 

    // Fetch user's articles on load
    useEffect(() => {
        const fetchMyArticles = async () => {
            const token = localStorage.getItem('userToken');
            try {
                const response = await fetch('http://localhost:5000/api/articles/mine', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await response.json();
                setArticles(data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchMyArticles();
    }, []);

    const handleDeleteClick = (id) => {
        setDeleteId(id); 
        setShowConfirmModal(true); 
    };

    const confirmDelete = async () => {
        setShowConfirmModal(false);

        const token = localStorage.getItem('userToken');
        try {
            const response = await fetch(`http://localhost:5000/api/articles/${deleteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setArticles(articles.filter((article) => article._id !== deleteId));
                setShowSuccessPopup(true);
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    setDeleteId(null);
                }, 2000);
            } else {
                alert('Could not delete story.');
            }
        } catch (error) {
            alert('Network error during deletion.');
        }
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setDeleteId(null);
    };

    if (loading) return <div style={{textAlign:'center', marginTop: '50px'}}>Opening your archives...</div>;

    return (
        <div className="page">
            
            {/* --- UPDATED HEADER SECTION --- */}
            <div style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-end', 
                marginBottom: '40px',
                flexWrap: 'wrap', // Ensures it looks good on mobile
                gap: '20px',
                borderBottom: '1px solid #efeae1', // Nice divider line
                paddingBottom: '20px'
            }}>
                <div>
                    <h1>My Archives</h1>
                    <p className="lead" style={{marginBottom: 0}}>Manage your published works.</p>
                </div>

                {/* THE NEW BUTTON */}
                <Link to="/create" className="button-link primary">
                    + Add a Book
                </Link>
            </div>
            {/* ----------------------------- */}

            {articles.length === 0 ? (
                <div style={{textAlign: 'center', marginTop: '50px'}}>
                    <p>You haven't written anything yet.</p>
                    {/* Secondary button if list is empty */}
                    <Link to="/create" className="button-link secondary">Start Writing</Link>
                </div>
            ) : (
                <div className="article-list-grid">
                    {articles.map((article) => (
                        <div key={article._id} className="article-card" style={{position: 'relative'}}>
                            <div className="card-content">
                                <h3 className="card-title">{article.title}</h3>
                                <p className="card-excerpt">
                                    {article.content.substring(0, 100)}...
                                </p>
                                
                                <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
                                    <Link to={`/edit/${article._id}`} className="button-link secondary" style={{fontSize: '0.8rem', padding: '5px 10px'}}>
                                        Edit
                                    </Link>
                                    
                                    <button 
                                        onClick={() => handleDeleteClick(article._id)} 
                                        className="button-link" 
                                        style={{fontSize: '0.8rem', padding: '5px 10px', background: '#c53030', color: 'white', border: 'none'}}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmModal 
                isOpen={showConfirmModal}
                title="Burn Manuscript?"
                message="Are you sure you want to burn this manuscript? This cannot be undone."
                onClose={cancelDelete}
                onConfirm={confirmDelete}
            />

            <SuccessModal 
                isOpen={showSuccessPopup}
                title="Deleted"
                message="The story has been removed from your archives."
            />
        </div>
    );
};

export default MyArchivesPage;