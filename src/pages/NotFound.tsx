import { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    
    // minHeight: '100vh',
    // backgroundColor: '#f7fafc'
};

const titleStyle = {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#2d3748'
};

const subtitleStyle = {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: '#718096'
};

const buttonStyle = {
    padding: '0.5rem 1rem',
    fontSize: '0.8rem',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default function NotFound() {
    return (
        <div style={
            containerStyle
        }>
            <h1 style={titleStyle}>Not Yet Implemented</h1>
            <p style={subtitleStyle}>This feature is coming soon!</p>
            <Link to="/warehouse">
                <button style={buttonStyle}>Go Back</button>
            </Link>
        </div>
    )
}