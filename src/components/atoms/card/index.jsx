import PropTypes from "prop-types";
import '../../../styles/card.css'; // Ajuste o caminho conforme necessário

export default function Card({ title, total = 0, iconElement: Icon }) {
  return (
    <div className="card-container">
      <span className="card-title">{title}</span>
      <div className="card-content">
        <strong className="card-total">{total}</strong>
        {Icon && <Icon size={40} className="card-icon" />}
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  total: PropTypes.number,
  iconElement: PropTypes.elementType,
};
