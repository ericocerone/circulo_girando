/**@type {HTMLCanvasElement} */
const c = document.getElementById("myCanvas")
const ctx = c.getContext("2d")

const width = 500;
const height = 500;
c.width = width;
c.height = height;
const step = 100; // 1 unidade matemática = 100 pixels
const cx = width / 2;
const cy = height / 2;

// Variável que vai alimentar o giro do quadrado
let anguloGlobal = 30;

function converterCoordenadas(x, y, anguloGraus) {
    // 1. Converte o ângulo de graus para radianos
    const rad = anguloGraus * Math.PI / 180;

    // 2. Rotaciona as coordenadas originais XY 
    const xRot = (x * Math.cos(rad)) - (y * Math.sin(rad));
    const yRot = (x * Math.sin(rad)) + (y * Math.cos(rad));

    // 3. Aplica o "step" para dar tamanho na tela e centraliza.
    // Lembre-se: subtraímos o Y porque no Canvas ele cresce para baixo! 
    return {
        x: cx + (xRot * step),
        y: cy - (yRot * step)
    };
}

function desenharCirculoRotacionando() {
    const startX = 2
    const startY = 0
    let linha = converterCoordenadas(startX, startY, anguloGlobal)
    let circulo = converterCoordenadas(startX, startY, anguloGlobal)
    
    ctx.beginPath()
    ctx.moveTo(linha.x, linha.y)
    ctx.lineTo(width/2, height/2)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.arc(circulo.x, circulo.y, 10, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
}

function desenharCirculoReferencia() {
    const raio = 200
    ctx.beginPath()
    for (let angle = 0; angle <= 360; angle=angle+30) {
        const x = width/2 + raio * Math.cos(angle * Math.PI/180)
        const y = height/2 + raio * Math.sin(angle * Math.PI/180)
        ctx.lineTo(x, y)
    }
    ctx.stroke()
}

/**
 * O LOOP DE RENDERIZAÇÃO
 */

function animar() {
    ctx.clearRect(0, 0, width, height); 
	desenharEixos();
    desenharCirculoRotacionando();
    desenharCirculoReferencia()
    anguloGlobal += 1;
    requestAnimationFrame(animar); 
}

// Dá a partida no motor!
animar();

function desenharEixos() {
    ctx.beginPath()
    ctx.moveTo(width/2, 0)
    ctx.lineTo(width/2, height)
    ctx.lineWidth = 2
    ctx.strokeStyle="red"
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(0, height/2)
    ctx.lineTo(width, height/2)
    ctx.lineWidth = 2
    ctx.strokeStyle="red"
    ctx.stroke()
    ctx.closePath()
}
