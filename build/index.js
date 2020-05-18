"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conflictGraph_1 = require("./conflictGraph");
let board1 = Date.now();
let board2 = board1 + Date.now() + Math.random();
let borard3 = board2 + Date.now() + Math.random();
let nodes = [
    {
        id: '0',
        start: new Date('2020-01-01'),
        utility: Math.random() * 10,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board1, ['1']]
        ])
    },
    {
        id: '1',
        start: new Date('2020-01-02'),
        utility: Math.random() * 10,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board1, ['0']]
        ])
    },
    {
        id: '2',
        start: new Date('2020-01-02'),
        utility: Math.random() * 10,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board2, ['3', '4']]
        ])
    },
    {
        id: '3',
        start: new Date('2020-01-02'),
        utility: Math.random() * 10,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board2, ['2', '4']]
        ])
    },
    {
        id: '4',
        start: new Date('2020-01-02'),
        utility: Math.random() * 10,
        balance: Math.random() * 1000,
        dependencies: new Map([
            [board2, ['2', '3']],
            [borard3, ['0', '1']]
        ])
    }
];
const graph = conflictGraph_1.makeCGfromNodes(nodes);
graph.forEach(edge => console.log(edge));
/**
 * //const tf = require('@tensorflow/tfjs')
//require('@tensorflow/tfjs-node')
import * as tf from '@tensorflow/tfjs'

const argparse = require('argparse')

const data = require('./data');
const model = require('./model');




async function run(epochs: any, batchSize: any, modelSavePath: any) {
    await data.loadData();
  
    const {images: trainImages, labels: trainLabels} = data.getTrainData();
    model.summary();
  
    let epochBeginTime;
    let millisPerStep;
    const validationSplit = 0.15;
    const numTrainExamplesPerEpoch =
        trainImages.shape[0] * (1 - validationSplit);
    const numTrainBatchesPerEpoch =
        Math.ceil(numTrainExamplesPerEpoch / batchSize);
    await model.fit(trainImages, trainLabels, {
      epochs,
      batchSize,
      validationSplit
    });

    const {images: testImages, labels: testLabels} = data.getTestData();
    const evalOutput = model.evaluate(testImages, testLabels);
  
    console.log(
        `\nEvaluation result:\n` +
        `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; `+
        `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);
  
    if (modelSavePath != null) {
      await model.save(`file://${modelSavePath}`);
      console.log(`Saved model to path: ${modelSavePath}`);
    }
  }

  const parser = new argparse.ArgumentParser({
    description: 'TensorFlow.js-Node MNIST Example.',
    addHelp: true
  });
  parser.addArgument('--epochs', {
    type: 'int',
    defaultValue: 20,
    help: 'Number of epochs to train the model for.'
  });
  parser.addArgument('--batch_size', {
    type: 'int',
    defaultValue: 128,
    help: 'Batch size to be used during model training.'
  })
  parser.addArgument('--model_save_path', {
    type: 'string',
    help: 'Path to which the model will be saved after training.'
  });
  const args = parser.parseArgs();
  
  run(args.epochs, args.batch_size, args.model_save_path);
 */
