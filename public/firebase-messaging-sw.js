// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/10.12.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDaHjxS-dyxW3jtPfDnVLyCusWBRcph-YQ",
  authDomain: "login-b417d.firebaseapp.com",
  projectId: "login-b417d",
  storageBucket: "login-b417d.firebasestorage.app",
  messagingSenderId: "1051872889222",
  appId: "1:1051872889222:web:d040471c13cf91d5c64407",
  measurementId: "G-28FLPQB7RQ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/logo192.png",
  });
});
