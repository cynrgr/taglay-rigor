import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../components/SuccessModal';
import '../styles/CreateStory.css'; 

const CreateStoryPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(''); // <--- NEW STATE
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const navigate = useNavigate();

    const handleUpload = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('userToken');

        if (!token) {
            setError('You must be logged in to upload a story.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                // Include author in the request body
                body: JSON.stringify({ title, author, content }),
            });

            const data = await response.json();

            if (response.ok) {
                // Trigger the reusable modal
                setShowSuccessPopup(true);
                setTimeout(() => navigate('/articles'), 2500); 
            } else {
                const data = await response.json();
                setError(data.message || 'Could not upload story');
            }
        } catch (err) {
            setError('Network error.');
        }
    };

    return (
        <div className="create-wrapper">
            <div className="create-card">
                <div className="create-header">
                    <h2>Pen Your Reads</h2>
                    <p>Add your voice to the Hearth & Pages collection.</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleUpload} className="create-form">
                    <div className="form-group">
                        <label htmlFor="title">Title of the Book</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., A Winter's Tale"
                            required
                        />
                    </div>

                    {/* NEW AUTHOR INPUT */}
                    <div className="form-group">
                        <label htmlFor="author">Author of the Book</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="e.g., William Shakespeare"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="content">Story Content</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Once upon a time..."
                            rows="12"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">Publish to Archive</button>
                </form>
            </div>
            <SuccessModal 
                isOpen={showSuccessPopup} 
                title="Success!" 
                message="Story added to the archive."
                subMessage="Redirecting to reading list..."
            />
        </div>
    );
};

export default CreateStoryPage;