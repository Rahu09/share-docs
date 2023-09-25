import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhlFebpnFLPUKIeHEdasHlaZObB4TirwI",
  authDomain: "docs-clone-dc31f.firebaseapp.com",
  projectId: "docs-clone-dc31f",
  storageBucket: "docs-clone-dc31f.appspot.com",
  messagingSenderId: "900557465827",
  appId: "1:900557465827:web:e8a2c41129be2c0aa67dd6",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

// const storage = getStorage(app);

export { app, db };
