import { forwardRef } from "react";
import '../../../styles/input.css';

const Input = forwardRef((props, ref) => {
  // Desestruturando as propriedades para facilitar o acesso
  const { label, id, ...rest } = props;

  return (
    <div className="content-input">
      {label && (
        <label className="label-input" htmlFor={id}>
          {label}
        </label>
      )}
      <input ref={ref} id={id} className="input-container" {...rest} />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
