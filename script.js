const bar = document.getElementById('pb');
const txt = document.getElementById('percent');
let progress = 0;

const interval = setInterval(() => {
    progress += Math.random() * 2; // Simula velocidade variável de processamento
    if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
    }
    bar.style.width = progress + '%';
    txt.innerText = Math.floor(progress) + '%';
}, 100);
