// js/main.js
import { auth } from "./firebase.js";

auth.onAuthStateChanged(user => {
  if (!user && window.location.pathname !== "/index.html") {
    window.location.href = "index.html";
  }
});
