import styles from "./styles.module.css";

const Checkbox = () => {
  return (
    <div className={styles.round}>
      <input id='checkbox' type='checkbox' />
      <label htmlFor='checkbox'></label>
    </div>
  );
};

export default Checkbox;
