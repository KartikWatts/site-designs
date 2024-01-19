import { ButtonVariant } from "../../../types/enums";
import styles from "./styles.module.css";

const Button = ({
  label,
  onClick,
  variant = ButtonVariant.Primary,
}: {
  label: String;
  onClick: () => void;
  variant?: ButtonVariant;
}) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
