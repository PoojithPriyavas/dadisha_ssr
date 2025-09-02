import React, { useEffect, useState } from 'react';
import './DemoCard.css';
import { useContext } from 'react';
import { Context } from "../../context/context";
import { isTokenValid } from "../../utilities";

const products = [
    {
        id: 1,
        title: 'Product 1',
        price: '$20',
        images: [
            'https://via.placeholder.com/150/FF0000',
            'https://via.placeholder.com/150/00FF00',
            'https://via.placeholder.com/150/0000FF',
        ],
    },
    {
        id: 2,
        title: 'Product 2',
        price: '$25',
        images: [
            'https://via.placeholder.com/150/FFFF00',
            'https://via.placeholder.com/150/FF00FF',
        ],
    },
    // Add more products as needed
];

const ProductCard = ({ product }) => {
    console.log(product, "prd")
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = product.thumbnail_images || [];
    const totalImages = images.length;
    console.log(images, "mages")
    useEffect(() => {
        if (totalImages > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % totalImages);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [totalImages]);

    return (
        <div className="product-card">
            <div className="image-slider">
                {product?.thumbanil_images.map((img) => (
                    <img
                        src={img}
                        alt={product.name}
                        className="slider-image"
                    />

                ))}
            </div>
            <div>
                <h3>{product?.name}</h3>
                <div className='price-row'> <span>{product?.sale_price}</span>
                    {isTokenValid() ? (
                        <button
                            className="wishlist-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                addToWishlist(product?.id);
                            }}
                        >
                            <img
                                src={
                                    product?.wishlist
                                        ? "/icons/wishlist-yellow.png"
                                        : "/icons/wishlist.svg"
                                }
                                alt="wishlist"
                                className="wishlist-icon"
                            />
                        </button>
                    ) : (
                        <button className="wishlist-btn" onClick={() => navigate("/signin")}>
                            <img
                                src="/icons/wishlist.svg"
                                alt="wishlist"
                                className="wishlist-icon"
                            />
                        </button>
                    )}
                </div>
            </div>


        </div>
    );
};

const DemoCard = () => {
    const { getWeaklyPrdData, weaklyPrdData, getQhseTagPrdData, qhseTagPrdData } = useContext(Context);
    useEffect(() => {
        getWeaklyPrdData();
        getQhseTagPrdData()
    }, [])

    console.log(weaklyPrdData, "wewe")
    return (
        <div className="">
            <div className="product-section">
                {qhseTagPrdData.map((item) => (
                    // console.log(item,"item")
                    <ProductCard product={item} key={item?.id} />
                ))}
            </div>
        </div>
    );
};

export default DemoCard;
