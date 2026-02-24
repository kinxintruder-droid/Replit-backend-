// js/boost.js
import { db, auth } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export function initBoost(paypalContainerId, postId, amount = "5.00") {
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{ amount: { value: amount } }]
      });
    },
    onApprove: async function(data, actions) {
      const details = await actions.order.capture();
      const user = auth.currentUser;

      await setDoc(doc(db, "posts", postId), {
        boosted: true,
        boostedBy: user.uid,
        boostAmount: details.purchase_units[0].amount.value,
        boostEnd: new Date(Date.now() + 3*24*60*60*1000)
      }, { merge: true });

      alert("Boost activated!");
    }
  }).render(`#${paypalContainerId}`);
}
