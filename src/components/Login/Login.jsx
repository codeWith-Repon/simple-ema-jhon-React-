import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useContext, useState } from "react";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";

const initialState = {
  isSignedIn: false,
  name: "",
  email: "",
  password: "",
  photoURL: "",
};

const app = initializeApp(firebaseConfig);

function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext  )
  const [user, setUser] = useState(initialState);
  const [newUser, setNewUser] = useState(false)
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const { displayName, photoURL, email } = result.user;
        console.log(displayName, photoURL, email);

        const signedUser = {
          isSignedIn: true,
          name: displayName,
          email,
          photoURL,
        };
        setUser(signedUser);
        setLoggedInUser(signedUser)  
        console.log("photourl", signedUser.photoURL)
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(initialState);
      })
      .catch((error) => {
        console.error("Sign out error:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e) => { 
    const { name, value } = e.target;
    let isFormValid;

    switch (name) {
      case "email":
        isFormValid = /\S+@\S+\.\S+/.test(value);
        break;
      case "password":
        isFormValid = value.length > 3;
        break;
      case "name":
        isFormValid = value.trim() !== "";
        break;
      default:
        isFormValid = false;
    }

    if (isFormValid) {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  return (
    <div style={{textAlign: "center"}}>
      {!user.isSignedIn ? (
        <button onClick={handleSignIn}>Sign In</button>
      ) : (
        <button onClick={handleSignOut}>Sign Out</button>
      )}

      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="User profile" />
        </div>
      )}

      <h1>Our Own Authentication System</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          onBlur={handleChange}
        />
        <br />
        <input
          type="text"
          name="email"
          placeholder="Email"
          onBlur={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onBlur={handleChange}
          required
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Login;
