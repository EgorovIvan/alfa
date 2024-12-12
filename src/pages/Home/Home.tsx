import React from 'react';
import './Home.scss';
import Navbar from "../../components/UI/Navbar/Navbar.tsx";

const Home: React.FC = () => {
    return (
        <div className="home">
                <div className="container">
                    <Navbar />
                </div>
        </div>
    );
};

export default Home;
