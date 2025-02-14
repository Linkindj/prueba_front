  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAbZKnxZkNdy-boPOR1e81ipE_eZkIShzg",
    authDomain: "prueba-front-f426a.firebaseapp.com",
    projectId: "prueba-front-f426a",
    storageBucket: "prueba-front-f426a.firebasestorage.app",
    messagingSenderId: "300627071844",
    appId: "1:300627071844:web:6512a2bcfcb1f68f82a071",
    measurementId: "G-6JQ0QQ8E9X"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore()

  export const saveprograma = (curso, codigo, docente, descripcion, fecha, duracion, precio)=>
    addDoc(collection(db, 'programa'), {curso, codigo, docente, descripcion, fecha, duracion,precio});

  export const obtenerprogramas = () => getDocs(collection(db, 'programa'))

  export const onObtenerprogramas=(callback) => onSnapshot(collection(db, 'programa'), callback)

  export const eliminarprograma=(id)=> deleteDoc(doc(db, 'programa', id))

  export const obtenerprograma=(id) => getDoc(doc(db, 'programa', id))

  export const editarprograma=(id, nuevoscampos) => updateDoc(doc(db, 'programa', id), nuevoscampos)

  export const cargarDocentes=(callback) => onSnapshot(collection(db, 'docente'), callback)

  export const savedocente = (nombre, documento, correo)=>
    addDoc(collection(db, 'docente'), {nombre, documento, correo});
  