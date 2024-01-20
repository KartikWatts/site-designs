import styles from "./styles.module.css";

const Checkbox = ({
  id,
  isChecked,
  onChange,
}: {
  id: string;
  isChecked: boolean;
  onChange: () => void;
}) => {
  return (
    <div className={styles.round}>
      <input id={id} type='checkbox' checked={isChecked} onChange={onChange} />
      <label htmlFor={id}></label>
    </div>
  );
};

export default Checkbox;
