// Certifique-se de preencher abaixo com seu config real
const firebaseConfig = {
    apiKey: "AIzaSyDiAP2IvsfPac29qzFA71sbLYuizVxZ9HQ",
    authDomain: "portal-workin-store.firebaseapp.com",
    projectId: "portal-workin-store",
    storageBucket: "portal-workin-store.firebasestorage.app",
    messagingSenderId: "803334158041",
    appId: "1:803334158041:web:5ef4069e7ec3a5973970c8"
  };

firebase.initializeApp(firebaseConfig);

function showTab(type) {
    const area = document.getElementById('content-area');
    if(type === 'header') {
        area.innerHTML = `<h3>Header</h3><input id="t" placeholder="Título"><input id="u" placeholder="URL"><button onclick="add('header')">Adicionar</button><div id="list"></div>`;
    } else {
        area.innerHTML = `<h3>Serviços</h3><input id="t" placeholder="Título"><input id="d" placeholder="Desc"><input id="u" placeholder="URL"><input id="l" placeholder="Logo"><button onclick="add('servicos')">Salvar</button><div id="list"></div>`;
    }
    renderList(type === 'header' ? 'header' : 'servicos');
}

function add(path) {
    const data = { title: document.getElementById('t').value, url: document.getElementById('u').value };
    if(path === 'servicos') { data.desc = document.getElementById('d').value; data.logo = document.getElementById('l').value; }
    firebase.database().ref(path).push(data);
}

function renderList(path) {
    firebase.database().ref(path).on('value', snap => {
        const list = document.getElementById('list'); list.innerHTML = '';
        snap.forEach(c => {
            list.innerHTML += `<div class="item-row">${c.val().title} <button style="width:auto;background:red" onclick="firebase.database().ref('${path}/${c.key}').remove()">X</button></div>`;
        });
    });
}

function exportData() { firebase.database().ref().once('value', s => { const a = document.createElement('a'); a.href = 'data:text/json,'+encodeURIComponent(JSON.stringify(s.val())); a.download='backup.json'; a.click(); }); }
function importData(e) { const r = new FileReader(); r.onload = (ev) => firebase.database().ref().set(JSON.parse(ev.target.result)); r.readAsText(e.target.files[0]); }
