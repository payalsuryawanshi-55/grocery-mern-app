import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const Auth = () => {
  const [state, setState] = useState("login"); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { type: state, name, email, password });

  
    try {
      const { data } = await axios.post(`/user/${state}`, { name, email, password });
      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        setShowUserLogin(false); // close modal
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    // Optional: clear fields after submit
    setName("");
    setEmail("");
    setPassword("");
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowUserLogin(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleOverlayClick}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside form
        className="relative flex flex-col gap-4 items-start p-8 py-12 w-80 sm:w-[360px] rounded-lg shadow-xl bg-white"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={() => setShowUserLogin(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-lg font-bold"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold m-auto">
          {state === "login" ? "Login" : "Register"}
        </h2>

        {/* Name field only for Register */}
        {state === "register" && (
          <div className="w-full">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 w-full border p-2 rounded outline-indigo-500"
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="w-full">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mt-1 w-full border p-2 rounded outline-indigo-500"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="mt-1 w-full border p-2 rounded outline-indigo-500"
            required
          />
        </div>

        {/* Toggle login/register */}
        <p className="text-sm w-full text-center">
          {state === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-indigo-500 cursor-pointer"
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-indigo-500 cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>

        {/* Submit button */}
        <button
          onClick={() =>{
            setUser(true);
            setShowUserLogin(false);
          }}  
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md mt-2"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
