import { useContext } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";
import { db } from "../config/firebase-config";
import { addDoc, collection } from "firebase/firestore";
import UserContext, { useUserContext } from "../UserContext";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setUid } = useUserContext();

  //   const [logged, setLogged] = useState(false);
  const signInWithGoogle = async () => {
    // console.log(auth.currentUser.displayName);
    // try {
    //   await signInWithPopup(auth, googleProvider);
    //   navigate("/home");
    // } catch (err) {
    //   console.log(err);
    // }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);

      dispatch(
        setUser({
          ...user,
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL,
          enrolledCourses: [],
        })
      );

      const userCollectionRef = collection(db, "users");

      await addDoc(userCollectionRef, {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photo: user.photoURL,
        enrolledCourses: [],
      });

      setUid(user.uid);
      navigate("/home/" + user.uid);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container--sign center">
      <div className="signin--box center">
        <button className="sign-in center" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

// function SignOut() {
//   return (
//     auth.currentUser && (
//       <button className="sign-out" onClick={() => auth.signOut()}>
//         Sign Out
//       </button>
//     )
//   );
// }

export default SignIn;
