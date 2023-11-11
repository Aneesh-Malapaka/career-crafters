import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";

function Navbar() {
  const navigate = useNavigate();
  const { uid } = useUserContext();
  const SignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(uid);
  return (
    <nav>
      <div className="logo--div">
        <img src="#" alt="logo" />
      </div>
      <ul className="options--list">
        <li>
          <Link className="LinkTag" to={`/home/${uid}`}>
            Home
          </Link>
        </li>
        <li>
          <Link className="LinkTag" to={`/dashboard/${uid}`}>
            Dashboard
          </Link>
        </li>
        <li onClick={SignOut}>Logout</li>
      </ul>
    </nav>
  );
}

export default Navbar;
