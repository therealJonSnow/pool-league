// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, query, getFirestore, collection, getDocs, setDoc, runTransaction } from 'firebase/firestore';
import { looseIndexOf } from '@vue/shared';

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
export const auth = getAuth();
export const db = getFirestore(app);

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

// Add a new user in collection "users"
export async function make(database, name) {
  getUsers(database).then((value) => {
    if (!value.find(o => o.name === name)) {
      let record = []
      value.forEach(el => {
        record.push({
          player: el.name,
          score: 0
        })
      });
      record.push({
        player: name,
        score: 0
      })
      setDoc(doc(database, "players", name), {record: record});
      addNewUserToAll (database, name)
    }
  })
}
// make(db, 'Jonny')

// Add record of new player to all existing
export async function addNewUserToAll (database, name) {
  await getDocs(collection(database, "players")).then(value => {
    value.forEach((player) => {
      // player.data() is never undefined for query player snapshots
      console.log(player.id, " => ", player.data());
      const playerRef = doc(database, "players", player.id);
      runTransaction(database, async (transaction) => {
        const playerDoc = await transaction.get(playerRef);
  
        if (!playerDoc.exists()) {
          throw "Document does not exist!";
        }
  
        const copyRecords = player.data()
        console.log(copyRecords)
        if (!copyRecords.record.find(o => o.name === name)) {
          copyRecords.record.push({
            player: name,
            score: 0
          })
        }
        console.log(copyRecords)
        transaction.update(playerRef, copyRecords);
      })
    })
  });
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

