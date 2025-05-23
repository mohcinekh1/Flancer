import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { isLoading, error, data } = useQuery({
        queryKey: ["gig"],
        queryFn: () =>
            newRequest.get(`/gigs/single/${id}`).then((res) => {
                return res.data;
            }),
    });

    const userId = data?.userId;

    const {
        isLoading: isLoadingUser,
        error: errorUser,
        data: dataUser,
    } = useQuery({
        queryKey: ["user"],
        queryFn: () =>
            newRequest.get(`/users/${userId}`).then((res) => {
                return res.data;
            }),
        enabled: !!userId,
    });

    // Function to handle direct order creation
    const handleDirectOrder = async () => {
        try {
            await newRequest.post(`/orders/direct/${id}`);
            // Navigate directly to orders page after successful order creation
            navigate("/orders");
        } catch (err) {
            console.error("Error creating order:", err);
            // You might want to show an error message to the user here
        }
    };

    // Only try to access data properties when data is available
    const images = isLoading || error || !data
        ? []
        : (Array.isArray(data.images) && data.images.length > 0)
            ? data.images
            : data.cover ? [data.cover] : [];

    return (
        <div className="gig">
            {isLoading ? (
                "loading"
            ) : error ? (
                "Something went wrong!"
            ) : (
                <div className="container">
                    <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
                        <h1>{data.title}</h1>
                        {isLoadingUser ? (
                            "loading"
                        ) : errorUser ? (
                            "Something went wrong!"
                        ) : (
                            <div className="user">
                                <img
                                    className="pp"
                                    src={dataUser.img || "/img/noavatar.jpg"}
                                    alt=""
                                />
                                <span>{dataUser.username}</span>
                                {!isNaN(data.totalStars / data.starNumber) && (
                                    <div className="stars">
                                        {Array(Math.round(data.totalStars / data.starNumber))
                                            .fill()
                                            .map((item, i) => (
                                                <img src="/img/star.png" alt="" key={i} />
                                            ))}
                                        <span>{Math.round(data.totalStars / data.starNumber)}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {images.length > 0 && (
                            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
                                {images.map((img, i) => (
                                    <img key={i} src={img} alt="" />
                                ))}
                            </Slider>
                        )}
                        <h2>About This Gig</h2>
                        <p>{data.desc}</p>
                        {isLoadingUser ? (
                            "loading"
                        ) : errorUser ? (
                            "Something went wrong!"
                        ) : (
                            <div className="seller">
                                <h2>About The Seller</h2>
                                <div className="user">
                                    <img src={dataUser.img || "/img/noavatar.jpg"} alt="" />
                                    <div className="info">
                                        <span>{dataUser.username}</span>
                                        {!isNaN(data.totalStars / data.starNumber) && (
                                            <div className="stars">
                                                {Array(Math.round(data.totalStars / data.starNumber))
                                                    .fill()
                                                    .map((item, i) => (
                                                        <img src="/img/star.png" alt="" key={i} />
                                                    ))}
                                                <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                                            </div>
                                        )}
                                        <button>Contact Me</button>
                                    </div>
                                </div>
                                <div className="box">
                                    <div className="items">
                                        <div className="item">
                                            <span className="title">From</span>
                                            <span className="desc">{dataUser.country}</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Member since</span>
                                            <span className="desc">Aug 2022</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Avg. response time</span>
                                            <span className="desc">4 hours</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Last delivery</span>
                                            <span className="desc">1 day</span>
                                        </div>
                                        <div className="item">
                                            <span className="title">Languages</span>
                                            <span className="desc">English</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <p>{dataUser.desc}</p>
                                </div>
                            </div>
                        )}
                        <Reviews gigId={id} />
                    </div>
                    <div className="right">
                        <div className="price">
                            <h3>{data.shortTitle}</h3>
                            <h2>$ {data.price}</h2>
                        </div>
                        <p>{data.shortDesc}</p>
                        <div className="details">
                            <div className="item">
                                <img src="/img/clock.png" alt="" />
                                <span>{data.deliveryDate} Days Delivery</span>
                            </div>
                            <div className="item">
                                <img src="/img/recycle.png" alt="" />
                                <span>{data.revisionNumber} Revisions</span>
                            </div>
                        </div>
                        <div className="features">
                            {data.features && data.features.map((feature) => (
                                <div className="item" key={feature}>
                                    <img src="/img/greencheck.png" alt="" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        {/* Replace Link with a button that calls handleDirectOrder */}
                        <button onClick={handleDirectOrder} className="continue-button">Continue</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gig;