const fs = require('fs');

function gerarDadosFicticios() {
    const dados = [];

    const healthStatus = ['Ruim', 'Regular', 'Bom'];
    const bleachingIndex = ['Baixo', 'Médio', 'Alto'];

    for (let i = 0; i < 100; i++) {
        const temperatura = (Math.random() * (30 - 25) + 25).toFixed(1);
        const pH = (Math.random() * (8.5 - 7.5) + 7.5).toFixed(1);
        const salinidade = (Math.random() * (37 - 33) + 33).toFixed(1);
        const nitrogenio = (Math.random() * 0.5).toFixed(2);
        const coberturaCoral = Math.floor(Math.random() * 100);

        const indiceBranqueamento = bleachingIndex[Math.floor(Math.random() * bleachingIndex.length)];
        const saudeRecifes = healthStatus[Math.floor(Math.random() * healthStatus.length)];

        dados.push({
            temperatura: parseFloat(temperatura),
            pH: parseFloat(pH),
            salinidade: parseFloat(salinidade),
            nitrogenio: parseFloat(nitrogenio),
            coberturaCoral,
            indiceBranqueamento,
            saudeRecifes
        });
    }

    return dados;
}

const dadosRecifes = gerarDadosFicticios();

const filePath = './src/data/DadosCorais.js';
const fileContent = `export const dadosRecifes = ${JSON.stringify(dadosRecifes, null, 4)};`;

fs.writeFileSync(filePath, fileContent);

console.log('Dados gerados e salvos em src/data/DadosCorais.js');
