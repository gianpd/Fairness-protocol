"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
//const tf_ = require('@tensorflow/tfjs')
const tf = __importStar(require("@tensorflow/tfjs"));
const model_ = tf.sequential();
model_.add(tf.layers.conv2d({
    inputShape: [28, 28, 1],
    filters: 32,
    kernelSize: 3,
    activation: 'relu',
}));
model_.add(tf.layers.conv2d({
    filters: 32,
    kernelSize: 3,
    activation: 'relu',
}));
model_.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
model_.add(tf.layers.conv2d({
    filters: 64,
    kernelSize: 3,
    activation: 'relu',
}));
model_.add(tf.layers.conv2d({
    filters: 64,
    kernelSize: 3,
    activation: 'relu',
}));
model_.add(tf.layers.maxPooling2d({ poolSize: [2, 2] }));
model_.add(tf.layers.flatten());
model_.add(tf.layers.dropout({ rate: 0.25 }));
model_.add(tf.layers.dense({ units: 512, activation: 'relu' }));
model_.add(tf.layers.dropout({ rate: 0.5 }));
model_.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
const optimizer = 'rmsprop';
model_.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
});
module.exports = model_;
