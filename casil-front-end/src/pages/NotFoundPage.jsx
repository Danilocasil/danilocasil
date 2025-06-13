import React from 'react';

function NotFoundPage() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            minHeight: '100vh',
            padding: '2rem',
        }}>
            <img
                src="http://www.bypeople.com/wp-content/uploads/2016/03/2016-03-09_16-30-59.gif"
                alt="404 Error Animation"
                style={{
                    maxWidth: '600px', 
                    height: 'auto',
                }}
            />
        </div>
    );
}

export default NotFoundPage;
