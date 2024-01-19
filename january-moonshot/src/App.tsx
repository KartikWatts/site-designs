import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import db, { auth } from "./firebase";
import { child, get, ref, set } from "firebase/database";
import {
  GoogleAuthProvider,
  User,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const provider = new GoogleAuthProvider();

  function writeUserData(name, email, imageUrl) {
    set(ref(db, `users/${user?.uid}`), {
      username: name,
      email: email,
      profile_picture: imageUrl,
    }).catch((err) => {
      console.error(err);
    });

    console.log(user?.uid, auth);

    get(child(ref(db), `users/${user?.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log(auth.currentUser);

    auth
      .authStateReady()
      .then(() => {
        console.log(auth.currentUser);
        if (auth.currentUser) {
          setUser(auth.currentUser);
          writeUserData("new", "shree", "ram");
        }
      })
      .finally(() => setLoading(false));
  }, [auth]);

  const firebaseSignIn = (auth, provider) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const firebaseSignOut = (auth) => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      {loading && "loading"}
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more hello world
      </p>
      {user ? (
        user.displayName
      ) : (
        <button onClick={() => firebaseSignIn(auth, provider)}>Sign In</button>
      )}
      {user && <button onClick={() => firebaseSignOut(auth)}>Sign Out</button>}
    </>
  );
}

export default App;
