// Exportar Backup
function exportJSON() {
    firebase.database().ref('/').once('value').then(snap => {
        const data = JSON.stringify(snap.val());
        const blob = new Blob([data], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'backup.json'; a.click();
    });
}

function importJSON(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        firebase.database().ref('/').set(data).then(() => alert("Backup importado com sucesso!"));
    };
    reader.readAsText(file);
}


function addHeader() {
    const title = document.getElementById('h-title').value;
    const url = document.getElementById('h-url').value;
    firebase.database().ref('header/').push({title, url});
}

function addService() {
    const title = document.getElementById('s-title').value;
    const desc = document.getElementById('s-desc').value;
    const url = document.getElementById('s-url').value;
    firebase.database().ref('servicos/').push({title, desc, url});
}
