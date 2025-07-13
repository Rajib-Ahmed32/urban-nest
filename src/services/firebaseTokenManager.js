import app from "../firebase/firebase.config";
import { getAuth, onIdTokenChanged } from "firebase/auth";

const auth = getAuth(app);
let currentIdToken = null;

onIdTokenChanged(auth, async (user) => {
  if (user) {
    currentIdToken = await user.getIdToken();
    console.log("Token updated via onIdTokenChanged");
  } else {
    currentIdToken = null;
    console.log("User signed out, token cleared");
  }
});

export const getCurrentToken = () => currentIdToken;
