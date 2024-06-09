import React, { useState, useEffect } from 'react';
import { predictSaude } from '../ml/Model';
import { performEDA } from '../data/EDA';

function Dashboard() {
    const [predictedSaude, setPredictedSaude] = useState(null);
    const [inputData, setInputData] = useState({
        temperatura: '',
        pH: '',
        salinidade: '',
        nitrogenio: '',
        coberturaCoral: ''
    });
    const [edaData, setEdaData] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handlePrediction = async () => {
        const data = [
            parseFloat(inputData.temperatura),
            parseFloat(inputData.pH),
            parseFloat(inputData.salinidade),
            parseFloat(inputData.nitrogenio),
            parseFloat(inputData.coberturaCoral)
        ];
        const prediction = await predictSaude(data);
        setPredictedSaude(prediction);
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await performEDA();
            setEdaData(data);
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Dashboard de Saúde dos Recifes</h1>
            <div>
                <label>Temperatura:</label>
                <input type="number" name="temperatura" value={inputData.temperatura} onChange={handleInputChange} />
                <br />
                <label>pH:</label>
                <input type="number" name="pH" value={inputData.pH} onChange={handleInputChange} />
                <br />
                <label>Salinidade:</label>
                <input type="number" name="salinidade" value={inputData.salinidade} onChange={handleInputChange} />
                <br />
                <label>Nitrogênio:</label>
                <input type="number" name="nitrogenio" value={inputData.nitrogenio} onChange={handleInputChange} />
                <br />
                <label>Cobertura de Coral:</label>
                <input type="number" name="coberturaCoral" value={inputData.coberturaCoral} onChange={handleInputChange} />
                <br />
                <button onClick={handlePrediction}>Prever Saúde do Recife</button>
            </div>
            {predictedSaude && (
                <div>
                    <h2>Resultado da Previsão:</h2>
                    <p>A saúde do recife é: {predictedSaude}</p>
                </div>
            )}
            {edaData && (
                <div>
                    <h2>Dados da Análise Exploratória de Dados (EDA)</h2>
                    <p>Média da Temperatura: {edaData.meanTemp}</p>
                    <p>Média do pH: {edaData.meanPH}</p>
                    <p>Média da Salinidade: {edaData.meanSalinity}</p>
                    <p>Média do Nitrogênio: {edaData.meanNitrogen}</p>
                    <p>Média da Cobertura de Coral: {edaData.meanCoverage}</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;








