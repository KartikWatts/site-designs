import { ButtonVariant } from "../../types/enums";
import Button from "../common/Button";
import styles from "./styles.module.css";

const Header = () => {
  const handleLoginClick = () => {
    console.log("shyam");
  };
  const handleCreateAccountClick = () => {
    console.log("ram");
  };

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.bannerContainer}>Homepage</div>
          <div className={styles.actionContainer}>
            <Button
              onClick={handleLoginClick}
              label='Login'
              variant={ButtonVariant.Text}
            />
            <Button onClick={handleCreateAccountClick} label='Create Account' />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
