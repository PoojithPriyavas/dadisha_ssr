// import React from 'react';
// import { FaTruckFast } from 'react-icons/fa6';
// import { IoReload } from 'react-icons/io5';
// import { FaShield } from 'react-icons/fa6';
// import { GiRabbit } from 'react-icons/gi';
// import { IoMdHeadset } from 'react-icons/io';

// export default function InfoCard() {
//   return (
//     <div
//       className="px-4 py-3 text-white mb-1 mt-0"
//       style={{
//         //  backgroundColor: 'rgb(255, 165, 0)',
//           fontSize: '16px' }}
//     >
//       <div className="d-flex flex-wrap justify-content-between">
//         <div className="d-flex justify-content-between align-items-center gap-2">
//           <FaTruckFast  style={{ color: '#000' }} />
//           <p className="text-uppercase mb-0  font-noto" style={{ color: '#000' }}> free shipping</p>
//         </div>
//         <div className="d-flex justify-content-between align-items-center gap-2">
//           <IoReload  style={{ color: '#000' }} />
//           <p className="text-uppercase mb-0  font-noto" style={{ color: '#000' }} > Bulk Order request</p>
//         </div>
//         <div className="d-flex justify-content-between align-items-center gap-2">
//           <FaShield  style={{ color: '#000' }} />
//           <p className="text-uppercase mb-0  font-noto" style={{ color: '#000' }}> 100% secure payment</p>
//         </div>

//         <div className="d-flex justify-content-between align-items-center gap-2">
//           <IoMdHeadset  style={{ color: '#000' }} />
//           <p className="text-uppercase mb-0  font-noto" style={{ color: '#000' }}>  online support</p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React from 'react';
import { FaTruckFast, FaShield } from 'react-icons/fa6';
import { IoReload } from 'react-icons/io5';
import { GiRabbit } from 'react-icons/gi';
import { IoMdHeadset } from 'react-icons/io';
import './header.css';

export default function InfoCard() {
  const items = [
    { icon: <FaTruckFast />, text: 'Free Shipping' },
    { icon: <IoReload />, text: 'Bulk Order Request' },
    { icon: <FaShield />, text: '100% Secure Payment' },
    { icon: <IoMdHeadset />, text: 'Online Support' },
  ];

  return (
    <div
      className="px-4 py-3 text-white mb-1 mt-0"
      style={{
        fontSize: '16px',
      }}
    >
      <div className="row info-card-main" >
        {items.map((item, index) => (
          <div className="col-6 col-sm-6 col-md-3 mb-2" key={index}>
            <div className="d-flex align-items-center  gap-2 info-card-row" >
              <span className='info-text' style={{ color: '#000' }}>{item.icon}</span>
              <p className="text-uppercase mb-0 font-noto info-text" style={{ color: '#000' }}>
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
