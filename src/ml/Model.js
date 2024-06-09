import * as tf from '@tensorflow/tfjs';
import { dadosRecifes } from '../data/DadosCorais';

// Pré-processamento dos dados
const features = dadosRecifes.map(d => [d.temperatura, d.pH, d.salinidade, d.nitrogenio, d.coberturaCoral]);
const labels = dadosRecifes.map(d => {
    if (d.saudeRecifes === 'Ruim') return 0;
    if (d.saudeRecifes === 'Regular') return 1;
    if (d.saudeRecifes === 'Bom') return 2;
    return -1;
});

// Convertendo para tensores
const xs = tf.tensor2d(features);
const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), 3);

// Definindo o modelo
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [5], units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 10, activation: 'relu' }));
model.add(tf.layers.dense({ units: 3, activation: 'softmax' }));

// Compilando o modelo
model.compile({
    optimizer: tf.train.adam(),
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
});

// Treinando o modelo
async function trainModel() {
    await model.fit(xs, ys, {
        epochs: 50,
        validationSplit: 0.2,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoch ${epoch}: loss = ${logs.loss}, accuracy = ${logs.acc}`);
            }
        }
    });
    console.log('Model training complete');
}

// Função para prever a saúde dos recifes
export async function predictSaude(inputData) {
    const inputTensor = tf.tensor2d([inputData]);
    const prediction = model.predict(inputTensor);
    const predictedIndex = prediction.argMax(1).dataSync()[0];
    const saudeRecifes = ['Ruim', 'Regular', 'Bom'];
    return saudeRecifes[predictedIndex];
}

// Treinando o modelo
trainModel();

