import React from 'react';
import styles from './loadingIndicator.module.css'; 

type CircleLoadingIndecatorProps = {
  size?: number;       
  color?: string;      
  message?: string;  
};

const CircleLoadingIndecator: React.FC<CircleLoadingIndecatorProps> = ({
  size = 40,
  color = '#3498db', 
  message,
}) => {
  return (
    <div className={styles.loaderContainer}>
      <div
        className={styles.loader}
        style={{ 
          width: size, 
          height: size, 
          borderColor: `${color} transparent transparent transparent` 
        }}
      ></div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default CircleLoadingIndecator;
