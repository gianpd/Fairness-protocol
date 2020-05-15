"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const argparse = require('argparse');
const data = require('./data');
const model = require('./model');
function run(epochs, batchSize, modelSavePath) {
    return __awaiter(this, void 0, void 0, function* () {
        yield data.loadData();
        const { images: trainImages, labels: trainLabels } = data.getTrainData();
        model.summary();
        let epochBeginTime;
        let millisPerStep;
        const validationSplit = 0.15;
        const numTrainExamplesPerEpoch = trainImages.shape[0] * (1 - validationSplit);
        const numTrainBatchesPerEpoch = Math.ceil(numTrainExamplesPerEpoch / batchSize);
        yield model.fit(trainImages, trainLabels, {
            epochs,
            batchSize,
            validationSplit
        });
        const { images: testImages, labels: testLabels } = data.getTestData();
        const evalOutput = model.evaluate(testImages, testLabels);
        console.log(`\nEvaluation result:\n` +
            `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; ` +
            `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);
        if (modelSavePath != null) {
            yield model.save(`file://${modelSavePath}`);
            console.log(`Saved model to path: ${modelSavePath}`);
        }
    });
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
});
parser.addArgument('--model_save_path', {
    type: 'string',
    help: 'Path to which the model will be saved after training.'
});
const args = parser.parseArgs();
run(args.epochs, args.batch_size, args.model_save_path);
