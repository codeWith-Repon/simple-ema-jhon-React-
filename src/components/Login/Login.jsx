import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
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
  error: "",
  success: false,
};

const app = initializeApp(firebaseConfig);

function Login() {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(loggedInUser)
  const [user, setUser] = useState(initialState);
  const [newUser, setNewUser] = useState(false);
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        const { displayName, photoURL, email } = result.user;
        console.log(displayName, photoURL, email);

        const signedUser = {
          isSignedIn: true,
          name: displayName,
          email,
          photoURL,
        };
        setUser(signedUser);
        setLoggedInUser(signedUser);
        console.log("photourl", signedUser.photoURL);
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
    if (newUser && user.email && user.password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          // Signed up
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUsaerName(user.name)
          console.log("sign in user info", res.user)
          setLoggedInUser(newUserInfo);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

   else if (user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user, error: "", success: true };
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let isFieldValid;

    switch (name) {
      case "email":
        isFieldValid = /\S+@\S+\.\S+/.test(value);
        break;
      case "password":
        isFieldValid = value.length > 3;
        break;
      case "name":
        isFieldValid = value.trim() !== "";
        break;
      default:
        isFieldValid = false;
    }

    if (isFieldValid) {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const updateUsaerName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("user name updated sussfully ")
      })
      .catch((error) => {
       console.log(error)
      });
  };
  return (
    <div style={{ textAlign: "center" }}>
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
      <input  onChange={()=>setNewUser(!newUser)} type="checkbox" name="newUser" id=""/>
      <label htmlFor="newUser">New user Sign up </label>
      <form onSubmit={handleSubmit}>
      {newUser &&  <input
          type="text"
          name="name"
          placeholder="Your name"
          onBlur={handleChange}
        />} 
       
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
        <input type="submit" value={newUser ? "Sign up": "Sign in"} />
      </form>{" "}
      {user.success ? (
                <p style={{color: "green"}}>User {newUser?"Created" : "Login"} successfully</p>
      ) : (
        
        <p style={{ color: "red" }}>{user.error}</p>
      )}
    </div>
  );
}

export default Login;
