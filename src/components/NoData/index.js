import React, { useContext } from 'react';
import { JetsContext } from '../../common';
import './index.css';

export const JetsNoData = () => {
  const { params } = useContext(JetsContext);

  const styles = {
    transform: `scale(${params?.antiScale})`,
  };

  return (
    <div style={styles} className="jets-no-data">
      Seat map is not found for the flight
    </div>
  );
};
