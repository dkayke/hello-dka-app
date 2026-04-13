const express = require('express');
const app = express();
const PORT = 3000;

// Função para calcular fatorial com BigInt
function calcularFatorial(n) {
    let resultado = BigInt(1);
    for (let i = BigInt(2); i <= BigInt(n); i++) {
        resultado *= i;
    }
    return resultado.toString();
}

app.get('/', (_, res) => {
    res.send('Aplicação rodando no Kubernetes! Tente o endpoint /stress');
});

// Endpoint para gerar carga (Stress)
app.get('/stress', (req, res) => {
    const numAleatorio = Math.floor(Math.random() * (50 - 2 + 1)) + 2;
    const inicio = Date.now();
    const resultado = calcularFatorial(numAleatorio);
    const fim = Date.now();

    console.log(`Calculado fatorial de ${numAleatorio} em ${fim - inicio}ms`);
    
    res.json({
        numero: numAleatorio,
        tempo_processamento: `${fim - inicio}ms`,
        resultado_parcial: resultado.substring(0, 10) + "..."
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});