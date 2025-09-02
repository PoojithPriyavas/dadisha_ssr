
// import React, { useState } from 'react';
// import { FiMenu } from 'react-icons/fi'; // You can use any icon library

// const SubCategoryHeader = () => {
//   const [isActive, setIsActive] = useState(false);

//   const toggleMenu = () => {
//     setIsActive(!isActive);
//   };
//   const subCategories = ['Sub 1', 'Sub 2', 'Sub 3', 'Sub 4'];

//   return (
//     <div style={styles.container}>
//     <div style={styles.menuBar}>
//       <div style={styles.buttonContainer}>
//         <button 
//           style={styles.iconButton} 
//           onClick={() => setIsActive(!isActive)}
//         >
//           <FiMenu size={24} />
//         </button>
//         <div 
//           style={{
//             ...styles.border,
//             width: isActive ? 'calc(100% + 90vw)' : '40px',
//             transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
//           }}
//         />
//       </div>
      
//       <div style={styles.categoryContainer}>
//         <span style={styles.categoryText}>Category</span>
        
//         <div 
//           style={{
//             ...styles.subcategoriesWrapper,
//             maxHeight: isActive ? '200px' : '0',
//             opacity: isActive ? 1 : 0,
//           }}
//         >
//           <ul style={styles.subcategoriesList}>
//             {subCategories.map((sub, index) => (
//               <li key={index} style={styles.subcategoryItem}>
//                 {sub}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// const styles = {
//   container: {
//     padding: '20px',
//   },
//   menuBar: {
//     display: 'flex',
//     alignItems: 'flex-start',
//     gap: '20px',
//     position: 'relative',
//   },
//   buttonContainer: {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   iconButton: {
//     background: 'none',
//     border: 'none',
//     cursor: 'pointer',
//     padding: '8px',
//     zIndex: 1,
//     position: 'relative',
//   },
//   categoryContainer: {
//     position: 'relative',
//     marginTop: '8px',
//   },
//   categoryText: {
//     position: 'relative',
//     zIndex: 1,
//     display: 'block',
//     minWidth: '100px',
//   },
//   border: {
//     position: 'absolute',
//     height: '40px',
//     width: '40px',
//     border: '2px solid #000',
//     borderRadius: '8px',
//     transition: 'all 0.3s ease',
//     left: '0',
//     // top: '50%',
//     transform: 'translateY(-50%)',
//   },
//   subcategoriesWrapper: {
//     position: 'absolute',
//     top: '100%',
//     left: 0,
//     overflow: 'hidden',
//     transition: 'all 0.3s ease',
//     backgroundColor: '#fff',
//     boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
//     borderRadius: '4px',
//     width: '150px',
//   },
//   subcategoriesList: {
//     listStyle: 'none',
//     padding: '8px 0',
//     margin: 0,
//   },
//   subcategoryItem: {
//     padding: '8px 16px',
//     transition: 'background-color 0.2s',
//     cursor: 'pointer',
//     ':hover': {
//       backgroundColor: '#f5f5f5',
//     },
//   },
// };

// export default SubCategoryHeader;






import { useContext, useEffect, useState, useRef } from 'react';
import { Fade } from 'react-awesome-reveal';
import { Context } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import './subCategoryheader.css';

export default function SubCategoryHeader() {
  const { homeData, gethomeData, setZindexIncrease } = useContext(Context);
  console.log(homeData, "home data");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  // const [childCategoryList, setChildCategoryList] = useState([]);
  const [hoveredSubCategory, setHoveredSubCategory] = useState(null);
  useEffect(() => {
    gethomeData();
  }, []);
  const navigate = useNavigate();


  const handleSubCategoryClick = (mainCategoryId, subCategoryId) => {
    navigate(
      `/categoryfilter?maincategoryid=${mainCategoryId}&subcategoryids=${subCategoryId}`
    );
  };

  const handleChildCategoryClick = (
    mainCategoryId,
    subCategoryId,
    childCategoryId
  ) => {
    // console.log(mainCategoryId,
    //   subCategoryId,
    //   childCategoryId,
    //   "id2")
    navigate(
      `/categoryfilter?maincategoryid=${mainCategoryId}&subcategoryids=${subCategoryId}&childcategoryids=${childCategoryId}`
    );
  };

  return (

    <div className="category-menu">
      <div className="category-container">
        {homeData?.main_categories?.map((category) => (
          <div
            key={category.id}
            className="category-item"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <h1 className="category-name">{category.name}</h1>

            {hoveredCategory === category.id && (
              <div
                className="sub-category-wrapper"
                onMouseEnter={() => setHoveredSubCategory(hoveredSubCategory)}
                onMouseLeave={() => setHoveredSubCategory(null)}
              >
                <div className="sub-category-dropdown">
                  {category.sub_categories.map((subCategory) => (
                    <div
                      key={subCategory.id}
                      className="sub-category-item"
                      onMouseEnter={() => setHoveredSubCategory(subCategory.id)}
                    >
                      <p className="sub-category-name font-noto"  onClick={() => handleSubCategoryClick(category.id, subCategory.id)}>{subCategory.name}</p>
                    </div>
                  ))}
                </div>

                {hoveredSubCategory && (
                  <div className="child-category-dropdown">
                    {category.sub_categories
                      .find((sub) => sub.id === hoveredSubCategory)
                      ?.child_categories.map((childCategory) => (
                        <p key={childCategory.id}  className="child-category-item font-noto" onClick={() => handleChildCategoryClick(category.id, hoveredSubCategory, childCategory.id)}>
                          {childCategory.name}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
