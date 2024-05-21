
import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../store/FirebaseContext";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/OLX-Symbol logo.png";

const SignUp = () => {
  const [state, setState] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const { auth, db } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's profile
      await updateProfile(user, {
        displayName: userName,
      });

      // Add user details to Firestore
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        userName,
        email,
        mobile,
        createdAt: new Date(),
      }).then(() => {
        setState(true);
      });

      // Navigate to home page

      // window.location.reload();
    } catch (error) {
      console.error("Error during sign up:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    if (state) {
      navigate("/");
    }
  }, [state]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="form bg-white w-96 h-auto border-2 rounded-lg p-8">
        <img className="m-6 w-54 h-32 mb-6" src={logoImg} alt="Logo" />

        <h1 className="text-center text-2xl mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-4 px-3 py-2 border rounded-md"
            type="text"
            name="username"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="w-full mb-4 px-3 py-2 border rounded-md"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full mb-4 px-3 py-2 border rounded-md"
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            className="w-full mb-4 px-3 py-2 border rounded-md"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-green-900 hover:bg-green-800 text-white font-bold py-2 rounded-md"
          >
            Sign Up
          </button>
          <p className="mt-2 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
