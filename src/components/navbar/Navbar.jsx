import React, {useEffect, useState} from 'react';
import "./Navbar.scss"
import {Link, useLocation} from "react-router-dom";
// import {Link} from "react-router-dom";
const Navbar = () => {

    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);
    const {pathname}=useLocation()

    const isactive=()=>{
        window.scrollY>0 ? setActive(true):setActive(false);
    }

    useEffect(() => {
        window.addEventListener('scroll',isactive);

        return () => {
            window.removeEventListener('scroll',isactive);
        }
    },[]);

    const currentUser={
        id:1, username:"badr", isSeller:true
    }


    return (
        <div className={active || pathname !=="/" ? "Navbar active" : "Navbar"}>
            <div className="container">
                <div className="logo">
                    <Link className="link" to="/">
                        <div className="text">FLancer</div>
                   </Link>
                    <div className="dot">.</div>
                </div>
                <div className="links">
                    <span>FLancer Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    {!currentUser?.isSeller && <span>Become a lancer</span>}
                    {!currentUser && <button>Join</button>}
                    {currentUser ? (
                        <div className="user" onClick={() => setOpen(!open)}>
                            <span>{currentUser?.username}</span>
                            {/*<img src={currentUser.img || "/img/noavatar.jpg"} alt="" />*/}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-inbox-fill" viewBox="0 0 16 16">
                                <path
                                    d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625a.5.5 0 0 1 .106.374l-.39 3.124A1.5 1.5 0 0 1 14.117 13H1.883a1.5 1.5 0 0 1-1.489-1.314l-.39-3.124a.5.5 0 0 1 .106-.374z"/>
                            </svg>
                            {open && (
                                <div className="options">
                                    {currentUser.isSeller && (
                                        <>
                                            <Link className="link" to="/mygigs">Gigs</Link>
                                            <Link className="link" to="/add">Add New Gig</Link>
                                        </>
                                    )}
                                    <Link className="link" to="/orders">Orders</Link>
                                    <Link className="link" to="/messages">Messages</Link>
                                    <Link className="link" to={"/"}>Logout</Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="link">Sign in</Link>
                            <Link className="link" to="/register">
                                <button>Join</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {(active || pathname !=="/") &&
                <>
                    <div>
                        <hr/>
                        <div className="menu">
                            <Link className="link menuLink" to="/">Graphics & Design</Link>
                            <Link className="link menuLink" to="/">Video & Animation</Link>
                            <Link className="link menuLink" to="/">Writing & Translation</Link>
                            <Link className="link menuLink" to="/">AI Services</Link>
                            <Link className="link menuLink" to="/">Digital Marketing</Link>
                            <Link className="link menuLink" to="/">Music & Audio</Link>
                            <Link className="link menuLink" to="/">Programming & Tech</Link>
                            <Link className="link menuLink" to="/">Business
                            </Link>
                            <Link className="link menuLink" to="/">
                                Lifestyle
                            </Link>
                        </div>
                    </div>
                </>
            }


        </div>
    );
};

export default Navbar;