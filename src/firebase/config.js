import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSevnTugMfxkXZz6fOcEQ9y_p-BNdzpx8",
  authDomain: "olx-clone-8b61c.firebaseapp.com",
  projectId: "olx-clone-8b61c",
  storageBucket: "olx-clone-8b61c.appspot.com",
  messagingSenderId: "1052866337424",
  appId: "1:1052866337424:web:030495be88d0a38783d615",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)
export const storageRef = ref(storage,'images');
export { app, auth, db };//storage
