import React from 'react';
import "./Home.scss"
import Featured from "../../components/featured/Featured.jsx";
import TrustedBy from "../../components/trustedBy/TrustedBy.jsx";
import Slide from "../../components/slide/Slide.jsx";
import {cards} from "../../Data.js";
import CatCard from "../../components/catCard/CatCard.jsx";
const Home = () => {
    return (
        <div className="Home">
            <Featured/>
            <TrustedBy/>
            <Slide slidesToShow={5} arrowsScroll={5}>
                {cards.map((card) => (
                    <CatCard key={card.id} card={card} />
                ))}
            </Slide>
        </div>
    );
};

export default Home;