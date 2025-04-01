import React from 'react';
import "./Featured.scss"
const Featured = () => {
    return (
        <div className="featured">
            <div className="container">
                <h1>
                    Find the perfect <span>freelance </span> services for your business
                </h1>
                <div className="popular">
                    <span>Popular:</span>
                    <button>Web Design</button>
                    <button>WordPress</button>
                    <button>Logo Design</button>
                    <button>AI Services</button>
                </div>
                <div className="search">
                    <div className="searchInput">
                        <img src="search.png" alt="" />
                        <input type="text" placeholder='Try "building mobil app"'/>
                    </div>
                    <button>Search</button>
                </div>

            </div>
        </div>
    );
};

export default Featured;