// Node Files
import React, { Component } from 'react';
import { AppRegistry, YellowBox } from 'react-native';

// Local Files
import {RootStack } from './config/routes.js';
import images from './config/images.js';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class intro extends Component {
  render() {
    return <RootStack />
  }
}

AppRegistry.registerComponent('intro', () => intro);
