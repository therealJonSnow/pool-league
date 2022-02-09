// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, query, orderBy, getFirestore, collection, getDocs, runTransaction } from 'firebase/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Add a new user in collection "users"
// export async function make(db) {
//   await setDoc(doc(db, "users", "Javier"), {
//     win: 0,
//     loss: 0,
//     played: 0,
//     points: 0
//   });
// }
// make(db)

export async function getUsers(db) {
  const q = query(collection(db, "users"), orderBy("points", "desc"));
  const querySnapshot = await getDocs(q);
  const users = []
  querySnapshot.forEach((doc) => {
    users.push({
      name: doc.id,
      record: doc.data()
    })
  });
  return users
}

export async function updateBasicStats(db, player, winner) {
  const playerRef = doc(db, "users", player);
  try {
    await runTransaction(db, async (transaction) => {
      const playerDoc = await transaction.get(playerRef);
      if (!playerDoc.exists()) {
        throw "Document does not exist!";
      }

      transaction.update(playerRef, { played: playerDoc.data().played + 1 });
      if (winner) transaction.update(playerRef, { win: playerDoc.data().win + 1 });
      if (!winner) transaction.update(playerRef, { loss: playerDoc.data().loss + 1 });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
}

export async function updatePoints(db, player, points) {
  console.log('update', player)
  const playerRef = doc(db, "users", player);
  try {
    await runTransaction(db, async (transaction) => {
      const playerDoc = await transaction.get(playerRef);
      if (!playerDoc.exists()) {
        throw "Document does not exist!";
      }

      console.log(playerRef)

      transaction.update(playerRef, { points: playerDoc.data().points + points });
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }
}

