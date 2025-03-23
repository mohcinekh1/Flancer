import React, {useEffect, useState} from 'react';
import "./Navbar.scss"
// import {Link} from "react-router-dom";
const Navbar = () => {

    const [active, setActive] = useState(false);

    const isactive=()=>{
        window.scrollY>0 ? setActive(true):setActive(false);
    }

    useEffect(() => {
        window.addEventListener('scroll',isactive);

        return () => {
            window.removeEventListener('scroll',isactive);
        }
    },[])





    return (
        <div className={active ? "Navbar active" : "Navbar"}>
            <div className="container">
                <div className="logo">
                    {/*<Link to="/">*/}
                        <div className="text">FLancer</div>
                   {/* </Link>*/}
                    <div className="dot">.</div>
                </div>
                <div className="links">
                    <span>FLancer Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    <span>Sing In</span>
                    <span>Become a lancer</span>
                    <button>Join</button>
                </div>
            </div>
            {active &&
                <>
                    <div>
                        <hr/>
                        <div className="menu">
                            <span>test1</span>
                            <span>test2</span>
                        </div>
                    </div>
                </>
            }


        </div>
    );
};

export default Navbar;