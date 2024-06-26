const firebaseConfig = {
  apiKey: "AIzaSyAw3SqpsztEn4Pz_JWlpxlVrV1sItOUfWA",
  authDomain: "datos-formulario-339dd.firebaseapp.com",
  projectId: "datos-formulario-339dd",
  storageBucket: "datos-formulario-339dd.appspot.com",
  messagingSenderId: "84877310424",
  appId: "1:84877310424:web:c113ac013d94fa03759aad",
  measurementId: "G-Q4SD9K65B1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("formulario").addEventListener("submit", (event) => {
  event.preventDefault();
  //VALIDACION DE NOMBRE
  let entradaNombre = document.getElementById("name");
  let errorNombre = document.getElementById("nameError");
  if (entradaNombre.value.trim() === "") {
    errorNombre.textContent = "por favor,introducir nombre";
    errorNombre.classList.add("error-message");
  } else {
    errorNombre.textContent = "";
    errorNombre.classList.remove("error-message");
  }
  //VALIDACION DE MAIL
  let emailEntrada = document.getElementById("email");
  let emailError = document.getElementById("emailError");
  let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(emailEntrada.value)) {
    emailError.textContent = "por favor, introducir un mail válido";
    emailError.classList.add("error-message");
  } else {
    emailError.textContent = "";
    emailError.classList.remove("error-message");
  }
  //VALIDACION DE CONTRASEÑA
  let contrasenaEntrada = document.getElementById("password");
  let contrasenaError = document.getElementById("passwordError");
  let contrasenaPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

  if (!contrasenaPattern.test(contrasenaEntrada.value)) {
    contrasenaError.textContent =
      "la contraseña debe tener al menos 8 caracteres, números, mayúsculas, minúsculas y caracteres especiales";
    contrasenaError.classList.add("error-message");
  } else {
    contrasenaError.textContent = "";
    contrasenaError.classList.remove("error-message");
  }
  //  VALIDANDO TODOS LOS CAMPOS
  if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
    //BACKEND QUE RECIBA LA INFORMACION
    db.collection("users")
      .add({
        nombre: entradaNombre.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value,
      })
      .then((docRef) => {
        alert("El formulario se ha enviado con éxito", docRef.id);
        document.getElementById("formulario").reset();
      })
      .catch((error) => {
        alert(error);
      });
  }
});
