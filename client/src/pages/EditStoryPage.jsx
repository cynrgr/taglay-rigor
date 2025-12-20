import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import '../styles/CreateStory.css';

const EditStoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(''); // <--- NEW STATE
    const [content, setContent] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    
    // 1. Fetch existing data
    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/articles/${id}`);
                const data = await response.json();
                setTitle(data.title);
                setAuthor(data.author || ''); // <--- Pre-fill author
                setContent(data.content);
            } catch (err) {
                console.error("Error fetching story", err);
            }
        };
        fetchArticle();
    }, [id]);

    // 2. Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');

        const response = await fetch(`http://localhost:5000/api/articles/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            // Include author in the update
            body: JSON.stringify({ title, author, content }),
        });

        if (response.ok) {
                // Show modal instead of alert
                setShowSuccessPopup(true);
                setTimeout(() => navigate('/my-archives'), 2000); 
            } else {
                alert('Failed to update.');
            }
    };

    return (
        <div className="page">
            <div className="create-wrapper">
                <div className="create-card">
                    <div className="page-header" style={{textAlign: 'center', maxWidth: '100%'}}>
                        <h2>Edit Manuscript</h2>
                    </div>
                    
                    <form onSubmit={handleUpdate} className="create-form">
                        <div style={{marginBottom: '20px'}}>
                            <label style={{display:'block', marginBottom:'10px', fontWeight:'bold'}}>Title</label>
                            <input 
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                                required 
                            />
                        </div>

                        {/* NEW AUTHOR INPUT */}
                        <div style={{marginBottom: '20px'}}>
                            <label style={{display:'block', marginBottom:'10px', fontWeight:'bold'}}>Author</label>
                            <input 
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)} 
                                required 
                            />
                        </div>
                        
                        <div style={{marginBottom: '20px'}}>
                            <label style={{display:'block', marginBottom:'10px', fontWeight:'bold'}}>Content</label>
                            <textarea 
                                value={content}
                                onChange={(e) => setContent(e.target.value)} 
                                rows="15" 
                                required 
                            />
                        </div>
                        
                        <div style={{display: 'flex', gap: '15px'}}>
                            <button type="submit" className="button-link primary" style={{flex: 1}}>Save Changes</button>
                            <button 
                                type="button" 
                                onClick={() => navigate('/my-archives')}
                                className="button-link secondary"
                                style={{flex: 1}}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <SuccessModal 
                isOpen={showSuccessPopup} 
                title="Manuscript Updated" 
                message="Your changes have been saved."
                subMessage="Returning to archives..."
            />
        </div>
    );
};

export default EditStoryPage;