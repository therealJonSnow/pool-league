// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, query, orderBy, getFirestore, collection, getDocs, setDoc, runTransaction } from 'firebase/firestore';

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
export async function make(db) {
  await setDoc(doc(db, "players", "Jonny"), {
    record: [
      {
        player: 'Ben',
        score: 0
      },
      {
        player: 'Finley',
        score: 0
      },
      {
        player: 'Jonny',
        score: 0
      },
    ]
  });
  console.log('make')
}
// make(db)

// , orderBy("points", "desc")
export async function getUsers(db) {
  const q = query(collection(db, "players"));
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

export async function updateBasicStats(db, winner, loser) {
  const winnerRef = doc(db, "players", winner.name);
  const loserRef = doc(db, "players", loser.name);

  const copyWinner = JSON.parse(JSON.stringify(winner))
  copyWinner.record.record = copyWinner.record.record.map((x) => {
    if (x.player === loser.name) x.score += 1
    return x
  })

  const copyLoser = JSON.parse(JSON.stringify(loser))
  copyLoser.record.record = copyLoser.record.record.map((x) => {
    if (x.player === winner.name) x.score -= 1
    return x
  })

  try {
    await runTransaction(db, async (transaction) => {
      const playerDoc = await transaction.get(winnerRef);
      if (!playerDoc.exists()) {
        throw "Document does not exist!";
      }
      transaction.update(winnerRef, copyWinner.record);
    });
    console.log("Transaction successfully committed!");
  } catch (e) {
    console.log("Transaction failed: ", e);
  }

  try {
    await runTransaction(db, async (transaction) => {
      const playerDoc = await transaction.get(loserRef);
      if (!playerDoc.exists()) {
        throw "Document does not exist!";
      }
      transaction.update(loserRef, copyLoser.record);
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

