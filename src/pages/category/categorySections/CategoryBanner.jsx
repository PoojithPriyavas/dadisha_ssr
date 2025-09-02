import React, { useContext, useEffect } from 'react';
import { Context } from '../../../context/context';
import { useParams, useLocation } from "react-router-dom";

export default function CategoryBanner() {

  const { homeData, gethomeData } = useContext(Context);
  useEffect(() => {
    gethomeData();
  }, []);

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const categoryId = parseInt(searchParams.get('maincategoryid'), 10);

  const categoryImage = homeData?.main_categories?.find((cat) => cat.id === parseInt(categoryId));

  return (
    <div>
      {categoryImage?.cover_image && (


        <div className="w-100 overflow-hidden rounded-xl" style={{ aspectRatio: '5 / 1', width: '100%', marginTop: '50px' }}>
          <img
            // src="/tempimg/categoryimg.jpg"
            src={categoryImage?.cover_image}
            alt="p1"
            // className="w-100 h-100 object-cover"
            style={{
              aspectRatio: '5 / 1',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          // className="w-100 h-100 object-cover"
          />
        </div>
      )}

    </div>
  );
}
