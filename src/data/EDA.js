import { dadosRecifes } from './DadosCorais';

// Função para realizar a Análise Exploratória de Dados
export function performEDA() {
    const data = dadosRecifes;
    
    // Estatísticas descritivas
    const meanTemp = data.reduce((acc, d) => acc + d.temperatura, 0) / data.length;
    const meanPH = data.reduce((acc, d) => acc + d.pH, 0) / data.length;
    const meanSalinity = data.reduce((acc, d) => acc + d.salinidade, 0) / data.length;
    const meanNitrogen = data.reduce((acc, d) => acc + d.nitrogenio, 0) / data.length;
    const meanCoverage = data.reduce((acc, d) => acc + d.coberturaCoral, 0) / data.length;

    return {
        meanTemp,
        meanPH,
        meanSalinity,
        meanNitrogen,
        meanCoverage,
    };
}


