
console.log("Portal em modo de construção ativa...");

// Aumenta a velocidade de rotação da animação ao interagir
document.addEventListener('mousemove', (e) => {
    const loader = document.querySelector('.status-loader');
    loader.style.animationDuration = '0.5s';
});
