// js/wallet.js
import { db, auth } from "./firebase.js";
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function addEarnings(amount) {
  const user = auth.currentUser;
  const walletRef = doc(db, "wallets", user.uid);
  const walletSnap = await getDoc(walletRef);

  if (!walletSnap.exists()) {
    await setDoc(walletRef, { balance: amount });
  } else {
    const current = walletSnap.data().balance || 0;
    await updateDoc(walletRef, { balance: current + amount });
  }
}

export async function getBalance() {
  const user = auth.currentUser;
  const walletRef = doc(db, "wallets", user.uid);
  const walletSnap = await getDoc(walletRef);
  return walletSnap.exists() ? walletSnap.data().balance : 0;
}
