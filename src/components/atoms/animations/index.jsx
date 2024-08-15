import React from 'react';
import '../../../styles/AnimatedSpan.css';

/**
 * Componente AnimatedSpan
 * @param {string} text - O texto que será animado letra por letra.
 * @returns {JSX.Element} O componente que renderiza o texto com animação.
 */
const textAnimated = 'ROTAVERDE'

export default function AnimatedSpan({ text = textAnimated }) { // Valor padrão para evitar problemas
  if (typeof text !== 'string') {
    return null; // ou uma mensagem de erro se preferir
  }

  return (  
    <h1 className="animated-span">
      {text.split('').map((char, index) => (
        <span className='span-name' key={index} style={{ animationDelay: `${index * 0.1}s` }}>
          {char}
        </span>
      ))}
    </h1>
  );
}
