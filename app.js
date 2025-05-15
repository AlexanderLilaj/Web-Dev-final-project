// Firebase config (corrected)
const firebaseConfig = {
  apiKey: "AIzaSyDX4TT0Dw0Amv9JRaeY8H-JrVGwlIBLEYw",
  authDomain: "alexlilaj.firebaseapp.com",
  projectId: "alexlilaj",
  storageBucket: "alexlilaj.appspot.com",
  messagingSenderId: "401323660389",
  appId: "1:401323660389:web:5fa4cf4c09e75c1b1a628c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Reference to counter document
const counterRef = db.collection("counters").doc("mainCounter");
const counterValueEl = document.getElementById("counterValue");

// Initialize counter if not exists
counterRef.get().then(doc => {
  if (!doc.exists) {
    counterRef.set({ value: 0 })
      .then(() => console.log("Counter initialized to 0"))
      .catch(err => console.error("Init error:", err));
  }
}).catch(err => console.error("Fetch error:", err));

// Live updates
counterRef.onSnapshot(doc => {
  if (doc.exists) {
    const data = doc.data();
    counterValueEl.textContent = data.value;
  } else {
    console.warn("Document does not exist");
  }
}, error => {
  console.error("Snapshot error:", error);
});

// Button event listeners
document.getElementById("incrementBtn").addEventListener("click", () => {
  counterRef.update({
    value: firebase.firestore.FieldValue.increment(1)
  }).catch(err => console.error("Increment error:", err));
});

document.getElementById("decrementBtn").addEventListener("click", () => {
  counterRef.update({
    value: firebase.firestore.FieldValue.increment(-1)
  }).catch(err => console.error("Decrement error:", err));
});

document.getElementById("resetBtn").addEventListener("click", () => {
  counterRef.set({ value: 0 })
    .catch(err => console.error("Reset error:", err));
});
