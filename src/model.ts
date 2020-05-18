//const tf_ = require('@tensorflow/tfjs')
import * as tf from '@tensorflow/tfjs'



const model_ = tf.sequential()
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
model_.add(tf.layers.maxPooling2d({poolSize: [2,2]}));
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
  model_.add(tf.layers.maxPooling2d({poolSize: [2, 2]}));
  model_.add(tf.layers.flatten());
  model_.add(tf.layers.dropout({rate: 0.25}));
  model_.add(tf.layers.dense({units: 512, activation: 'relu'}));
  model_.add(tf.layers.dropout({rate: 0.5}));
  model_.add(tf.layers.dense({units: 10, activation: 'softmax'}));
  
  const optimizer = 'rmsprop';
  model_.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  
  module.exports = model_;
