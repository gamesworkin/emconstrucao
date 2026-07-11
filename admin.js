const btn = document.getElementById('login-btn');
const email = document.getElementById('email');
const pass = document.getElementById('pass');

async function handleLogin() {
    if(email.value !== "admin@admin.com") return alert("Acesso negado");
    
    btn.innerText = "Autenticando...";
    btn.classList.add('btn-loading');
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email.value, pass.value);
        window.location.href = "/painel-admin.html";
    } catch(e) {
        btn.innerText = "Autenticar";
        btn.classList.remove('btn-loading');
        alert("Erro na autenticação");
    }
}

// Ouvinte para Enter
document.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleLogin(); });
