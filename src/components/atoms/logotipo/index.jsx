import React, { useState } from 'react';
import '../../../styles/Logotipo.css'; // Importando o CSS específico para o logotipo

export function Logotipo() {
  const [hiThere, setHiThere] = useState(false);

  const handleClick = () => {
    setHiThere(true);
    setTimeout(() => setHiThere(false), 1000);
  };

  return (
    <div
      className={`logotipo ${hiThere ? 'hiThere' : ''}`}
      onClick={handleClick}
    />
  );
}
