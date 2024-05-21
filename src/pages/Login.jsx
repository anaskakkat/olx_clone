import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../store/FirebaseContext";
import { Link, useNavigate } from "react-router-dom";
import logoImg from '../assets/OLX-Symbol logo.png'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      navigate("/");
      // <Navigate to={'/'}/>
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
   
      <div className="form bg-white w-96 h-auto border-2 rounded-lg p-8">
      <img className="m-10 w-54 h-32 mb-6 " src={logoImg} alt="" />
        <h1 className="text-center font-semibold text-green-950 text-2xl mb-6">Log In</h1>
        <form className="" onSubmit={handleLogin}>
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
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-950 hover:bg-green-800 text-white font-bold py-2 rounded-md"
          >
            Log In
          </button>
          <p className="mt-2 text-center">
            Not registered yet?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
