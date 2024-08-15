import '../../../styles/button.css'; // Importa o CSS do botão

export default function Button({ variant = "primary", ...rest }) {
  // Define a classe do botão com base na variante
  const className =
    variant === "secondary"
      ? 'button secondary'
      : 'button';

  return <button className={className} {...rest} />;
}
