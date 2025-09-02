import { Link } from "react-router-dom";
import styles from "./Faqs.module.css";
import { useState, useEffect } from "react";
import { style } from "framer-motion/client";
import axios from '../../../utilities/customAxios.js';
import Header from "../../../components/Header.jsx";
import ProductFooter from "../../products/ProductFooter.jsx";

const Faqs = () => {
  const [faqData, setFaqData] = useState([]);

  const Faq = async () => {
    const response = await axios.get('/disha/faq');
    setFaqData(response.data)

  }
  useEffect(() => {
    Faq();
  }, [])
  console.log(faqData, "faq")
  return (
    <>
      <Header />
      <div className="container pb-10" style={{marginTop:'55px'}}>
        <div className="d-flex gap-4  align-items-center justify-content-between ">
          <h2 className="fw-700 ">Frequently Asked Questions : </h2>
          {/* <div className="d-flex justify-content-between">
          <button className={`${styles.btn}`}>General</button>
          <button className={`${styles.btn} ${styles.btnactive}`}>
            Payments
          </button>
          <button className={`${styles.btn}`}>Refund</button>
          <button className={`${styles.btn}`}>Contact</button>
          <button className={`${styles.btn}`}>Services</button>
        </div> */}
        </div>
        <div className={styles.accordianwrap}>
          {faqData.map((item) => (
            <Accordian
              key={item.id}
              header={item.question}
              desc={item.answer}
            />
          ))}
        </div>
      </div>
      <ProductFooter />
    </>

  );
};

export default Faqs;

const Accordian = ({ header, desc }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.accordianmain}`}>
      <div
        className={`${styles.accordianinner}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className={`${styles.headericonwrap}`}>
          <h3 className={`${styles.header}`}>{header}</h3>
          <i
            className={`${styles.primary} ${open && styles.active} pi pi-plus`}
          ></i>
        </div>

        {open && <p className="">{desc}</p>}
      </div>
    </div>
  );
};
