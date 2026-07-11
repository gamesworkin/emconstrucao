const firebaseConfig = {
    apiKey: "AIzaSyDiAP2IvsfPac29qzFA71sbLYuizVxZ9HQ",
    authDomain: "portal-workin-store.firebaseapp.com",
    projectId: "portal-workin-store",
    storageBucket: "portal-workin-store.firebasestorage.app",
    messagingSenderId: "803334158041",
    appId: "1:803334158041:web:5ef4069e7ec3a5973970c8"
  };
firebase.initializeApp(firebaseConfig);

// Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('login-btn');
    btn.innerText = "Autenticando...";
    btn.disabled = true;
    try {
        await firebase.auth().signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('pass').value);
        window.location.href = "painel.html";
    } catch(err) { alert(err.message); btn.innerText = "Autenticar"; btn.disabled = false; }
});

// Salvar no Banco
document.getElementById('save-btn')?.addEventListener('click', () => {
    const data = {
        title: document.getElementById('title').value,
        desc: document.getElementById('desc').value,
        url: document.getElementById('url').value
    };
    firebase.database().ref('servicos/').push(data).then(() => alert("Salvo!"));
});

document.getElementById('logout-btn')?.addEventListener('click', () => {
    firebase.auth().signOut().then(() => window.location.href = "index.html");
});
