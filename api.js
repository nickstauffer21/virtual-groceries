import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBE-QBCnyUJ1r2oqrMewvXpmCuVlz4-Q1M",
  authDomain: "virtual-groceries.firebaseapp.com",
  projectId: "virtual-groceries",
  storageBucket: "virtual-groceries.appspot.com",
  messagingSenderId: "247487627807",
  appId: "1:247487627807:web:8a4958ac7336f866ca4b2a",
  measurementId: "G-8X2TDC950N",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);

const groceriesRef = collection(db, "groceries");

export async function getGroceries() {
  const snapshot = await getDocs(groceriesRef);
  const groceries = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(groceries);
  return groceries;
}

export async function getGrocery(id) {
  const docRef = doc(db, "groceries", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
  return snapshot;
}

export async function getRelatedGroceries(type) {
  const q = query(groceriesRef, where("type", "==", type));
  const snapshot = await getDocs(q);
  const relatedGroceries = [];
  snapshot.forEach((doc) => {
    relatedGroceries.push({ id: doc.id, ...doc.data() });
  });
  return relatedGroceries;
}

export async function loginUser(creds) {
  const res = await fetch("/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
