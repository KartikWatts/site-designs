import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { ButtonVariant, DisplayType } from "../../types/enums";
import { HeaderProps } from "../../types/types";
import Button from "../common/Button";
import styles from "./styles.module.css";
import { auth } from "../../firebase";

const Header = ({
  loadingAuth,
  user,
  handleUserSignIn,
  handleDisplayAccount,
  displayType,
}: HeaderProps) => {
  const provider = new GoogleAuthProvider();

  const firebaseSignIn = (auth: Auth, provider: GoogleAuthProvider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        const authUser = result.user;
        console.log(authUser);
        handleUserSignIn(authUser);
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorMessage);
      });
  };

  const handleLoginClick = () => {
    firebaseSignIn(auth, provider);
  };
  const handleCreateAccountClick = () => {
    firebaseSignIn(auth, provider);
  };

  const handleLogoutClick = () => {
    signOut(auth)
      .then(() => {
        handleUserSignIn(null);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  return (
    <header>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.bannerContainer}>
            {displayType === DisplayType.Home ? "Homepage" : "Account"}
          </div>
          {!loadingAuth && (
            <>
              {!user ? (
                <div className={styles.actionContainer}>
                  <Button
                    onClick={handleLoginClick}
                    label='Login'
                    variant={ButtonVariant.Text}
                  />
                  <Button
                    onClick={handleCreateAccountClick}
                    label='Create Account'
                  />
                </div>
              ) : (
                <div className={styles.actionContainer}>
                  <Button
                    onClick={handleLogoutClick}
                    label='Logout'
                    variant={ButtonVariant.Text}
                  />
                  <Button
                    onClick={handleDisplayAccount}
                    label={
                      displayType !== DisplayType.Home
                        ? "Back to Home"
                        : user.displayName || "Account"
                    }
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
