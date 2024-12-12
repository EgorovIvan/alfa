import React from "react";
import "./NotFound.scss";

const NotFound: React.FC = () => {
    return (
        <div className="not-found">
            <div className="not-found__content">
                <h1 className="not-found__title">404</h1>
                <p className="not-found__message">Page Not Found</p>
                <a href="/" className="not-found__link">Go Back to Home</a>
            </div>
        </div>
    );
};

export default NotFound;