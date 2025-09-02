import React from 'react';
import styles from './HomeEleven.module.css';

const clients = [
  { name: 'Muast', logo: '/logos/muast.png' },
  { name: 'chatbot', logo: '/logos/chatbot.png' },
  { name: 'Soluck', logo: '/logos/soluck.png' },
  { name: 'wattse', logo: '/logos/wattse.png' },
  { name: 'Nextech', logo: '/logos/nextech.png' },
];

export default function HomeEleven() {
  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>
        We’ve worked on over 200 projects with 150+ clients
      </h3>
      <div className={styles.logos}>
        {clients.map((client, index) => (
          <div key={index} className={styles.card}>
            <img src={client.logo} alt={client.name} />
            <span>{client.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
