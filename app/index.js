// Node Files
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

// Local Files
import {RootStack } from './config/routes.js';
import images from './config/images.js';

export default class intro extends Component {
  render() {
    return <RootStack />
  }
}

AppRegistry.registerComponent('intro', () => intro);
