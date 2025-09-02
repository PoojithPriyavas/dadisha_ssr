import { useContext, useEffect, useState } from 'react';
import styles from './MyWishlist.module.css';
import axios from '../../../utilities/customAxios';
import { Context } from '../../../context/context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BsCartX } from "react-icons/bs";
export default function MyWishList() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getWishlist = async () => {
    setLoading(true);
    try {
      const result = await axios.get('/disha/wishlist-page');
      setWishlist(result.data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="container pb-10">
      <div className={styles.products_wrapper}>
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <div className="spinner"></div>
          </div>
        ) : wishlist.length !== 0 ? (
          wishlist.map(item => (
            <WishlistProductCard
              key={item.id}
              item={item}
              getWishlist={getWishlist}
            />
          ))
        ) : (
          <p className="text-center mt-10">No items in wishlist</p>
        )}
      </div>
    </div>

  );
}

const WishlistProductCard = ({ item, getWishlist }) => {
  const { selectedCurrency } = useContext(Context);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const navigate = useNavigate();

  const removeWishlistFun = async slug => {
    try {
      setLoadingWishlist(true);
      const response = await axios.post('/disha/add-to-wishlist', {
        product_slug: slug,
      });
      toast.success('Product Removed from the wishlist');
      getWishlist();
      setLoadingWishlist(false);
    } catch (error) {
      toast.error('Failed to remove product from wishlist');
      setLoadingWishlist(false);
    }
  };
  const addToCart = async slug => {

    try {
      const response = await axios.post('/disha/add-to-cart', {
        product_slug: slug,
      });
      // console.log('Product added to wishlist:', response.data);
      toast.success('Product added to cart');
    } catch (error) {
      toast.error('Failed to add product to cart');
      console.error('Error adding product to cart:', error);
    }
  };
  return (
    <div className={styles.product_card_wrapper}>
      <div className={styles.product_card_innerleft_wrapper} onClick={() => navigate(`/productdetails/${item.slug}`)} style={{ cursor: 'pointer' }}>
        <div className={styles.imagewrap}>
          <img src={item?.image} className="w-full h-full object-cover" />
        </div>
        <div className={styles.product_leftcontent_wrap}>
          <p className={styles.productname}>{item?.name}</p>
          <div className={styles.product_badge_wrap}>
            {/* <div className={styles.shipping_badge}>
              <p>free shipping</p>
            </div> */}
            {item?.stock > 0 ? (
              <div className={`${styles.stock_badge} ${styles.instock}`}>
                <i className={`pi pi-check-circle ${styles.instock_icon}`}></i>
                <p>In stock</p>
              </div>
            ) : (
              <div className={`${styles.stock_badge} ${styles.outstock}`}>
                <i className={`pi pi-check-circle ${styles.outstock_icon}`}></i>
                <p>Out of stock</p>
              </div>
            )}
          </div>
          <div className={`${styles.product_price_offer_wrap}`}>
            {selectedCurrency === 'INR' ? (
              <p className={styles.price}><span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{item?.sale_price}</p>
            ) : (
              <p className={styles.price}>${item?.sale_price_in_dollar}</p>
            )}
            {selectedCurrency === 'INR' ? (
              <p className={styles.discount_price}><span  style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'normal', color: 'inherit' }}>₹</span>{item?.mrp}</p>
            ) : (
              <p className={styles.discount_price}>${item?.mrp_in_dollar}</p>
            )}
            {item?.discount > 0 && (
              <p className={styles.offer}>{item?.discount}</p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.product_card_innerright_wrapper}>
        <div className={styles.product_options_wrap}>
          <button
            disabled={loadingWishlist}
            className={styles.close_btn}
            onClick={() => {
              removeWishlistFun(item.slug);
            }}
          >
            <i className="pi pi-times-circle"></i>
          </button>
          {/* <div className={styles.custom_checkbox}>
            <input type="checkbox" name="checkbox" />
            <div className={styles.custom_innerbox}>
              <i className="pi pi-check"></i>
            </div>
          </div> */}
        </div>
        {item?.stock > 0 ? (
          <button
            className={styles.product_button}
            onClick={() => {
              addToCart(item?.slug);
            }}
          >
            Add to Cart
            <i className="pi pi-cart-plus"></i>
          </button>
        ) : (
          <button
            className={styles.disabled}
            disabled
          >
            Out Of Stock
            <BsCartX />
          </button>
        )}

      </div>
    </div>
  );
};
