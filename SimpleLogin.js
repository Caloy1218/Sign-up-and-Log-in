import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNgoIhXtL1N7d0atlttbLKac4QojbpMbo",
  authDomain: "simplelogin-cc821.firebaseapp.com",
  projectId: "simplelogin-cc821",
  storageBucket: "simplelogin-cc821.appspot.com",
  messagingSenderId: "978366904120",
  appId: "1:978366904120:web:905f696b4b1209a780b3cd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let createAcc = document.querySelector("#createAcc");
let loginAcc = document.querySelector("#loginAcc");
let contBtn = document.querySelector(".contBtn");

createAcc.addEventListener("click", () => {
  $(".login-container").css("display", "none");
  $(".register-container").css("display", "block");
});

loginAcc.addEventListener("click", () => {
  $(".login-container").css("display", "block");
  $(".register-container").css("display", "none");
});

let emailLoginError = document.querySelector("#emailLogin");
contBtn.addEventListener("click", () => {
  if (emailLoginError.value === "") {
    let errorMsg = (document.querySelector(
      "#error1"
    ).innerHTML = `Please complete the details!`);
    setTimeout(() => (errorMsg.textContent = " "), 3000);
  } else {
    const emailLogin = document.querySelector("#emailLogin").value;
    const passLogin = document.querySelector("#passLogin").value;

    signInWithEmailAndPassword(auth, emailLogin, passLogin)
      .then((userCredential) => {
        const user = userCredential.user;
        $(".login-container").css("display", "none ");
        $(".result-container").css("display", "block");
        document.querySelector(
          "#result"
        ).innerHTML = `Welcome Back<br>${emailLogin} was Login Succesfully!`;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        $(".login-container").css("display", "none ");
        $(".result-container").css("display", "block");
        document.querySelector(
          "#result"
        ).innerHTML = `Sorry! <br> ${errorMessage} `;
      });
  }
});

let registerBtn = document.querySelector("#registerBtn");

registerBtn.addEventListener("click", () => {
  const emailRegister = document.querySelector("#email-register").value;
  const passwordRegister = document.querySelector("#password-register").value;

  createUserWithEmailAndPassword(auth, emailRegister, passwordRegister)
    .then((userCredential) => {
      const user = userCredential.user;
      $(".register-container").css("display", "none ");
      $(".result-container").css("display", "block");
      document.querySelector(
        "#result"
      ).innerHTML = `Welcome<br>${emailRegister} was Registered Succesfully!`;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      $(".login-container").css("display", "none ");
      $(".result-container").css("display", "block");
      document.querySelector(
        "#result"
      ).innerHTML = `Sorry! <br> ${errorMessage}`;
    });
});

document.querySelector("#backBtn").addEventListener("click", () => {
  $(".result-container").css("display", "none ");
  $(".register-container").css("display", "block");
});
