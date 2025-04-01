import Navbar from "./components/navbar/Navbar.jsx";
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import Gigs from "./pages/gigs/Gigs.jsx";
import MyGigs from "./pages/myGigs/MyGigs.jsx";
import Home from "./pages/home/Home.jsx";
import Messages from "./pages/messages/Messages.jsx";
import Orders from "./pages/orders/Orders.jsx";
import Add from "./pages/add/Add.jsx";
import Gig from "./pages/gig/Gig.jsx";
import Register from "./pages/register/Register.jsx";
import Message from "./pages/message/Message.jsx";
import Login from "./pages/login/Login.jsx";
import "./app.scss"
const Layout = () => {
    return (
        <div className="app">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {path: "/", element: <Home />,},
                {path: "/gigs", element: <Gigs />,},
                {path: "/myGigs", element: <MyGigs />,},
                {path: "/orders", element: <Orders />,},
                {path: "/messages", element: <Messages />,},
                {path: "/message/:id", element: <Message />,},
                {path: "/add", element: <Add />,},
                {path: "/gig/:id", element: <Gig />,},
                {path: "/register", element: <Register />,},
                {path: "/login", element: <Login />,}
            ],
        },
    ]);
return (

        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>


)
}

export default App
