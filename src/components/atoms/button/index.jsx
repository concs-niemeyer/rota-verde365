import '../../../styles/button.css'; // Importa o CSS do botão

export default function Button({ variant = "primary", className = "", ...rest }) {
  // Define a classe do botão com base na variante e adiciona classes adicionais
  const buttonClass = `button ${variant} ${className}`;

  return <button className={buttonClass} {...rest} />;
}
