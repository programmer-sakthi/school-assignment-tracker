import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const styles = {
    pageNotFound: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        textAlign: 'center',
    },
    iconContainer: {
        fontSize: '5rem',
        color: '#ff6b6b',
        animation: 'pulse 1.5s infinite',
    },
    errorHeading: {
        fontSize: '3rem',
        color: '#343a40',
        margin: '20px 0',
    },
    errorMessage: {
        fontSize: '1.2rem',
        color: '#6c757d',
        marginBottom: '30px',
    },
    goHomeButton: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    goHomeButtonHover: {
        backgroundColor: '#0056b3',
    },
};

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.pageNotFound}>
            <div style={styles.iconContainer}>
                <FaExclamationTriangle />
            </div>
            <h1 style={styles.errorHeading}>Error 404</h1>
            <p style={styles.errorMessage}>Oops! The page you're looking for doesn't exist.</p>
            <button 
                style={styles.goHomeButton} 
                onMouseOver={(e) => e.target.style.backgroundColor = styles.goHomeButtonHover.backgroundColor} 
                onMouseOut={(e) => e.target.style.backgroundColor = styles.goHomeButton.backgroundColor} 
                onClick={() => navigate("/")}
            >
                Go to Home Page
            </button>
        </div>
    );
};

export default PageNotFound;
