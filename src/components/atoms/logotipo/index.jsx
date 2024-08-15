import React, { useState } from 'react';
import '../../../styles/Logotipo.css'; // Importando o CSS específico para o logotipo

export function Logotipo() {
  const [shake, setShake] = useState(false);

  const handleClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div
      className={`logotipo ${shake ? 'shake' : ''}`}
      onClick={handleClick}
    />
  );
}
