import React, { Component } from 'react';
import { 
  Image, 
  ImageBackground,
  Dimensions,
  View 
} from 'react-native';

import styles from './styles.js';
import images from '../../config/images.js';
import Avatar from '../Avatar/';

export default class eventImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: props.avatar
    }
  }

  componentDidUpdate(nextProps) {
    if (this.props.avatar !== nextProps.avatar) {
      this.setState({
        avatar: nextProps.avatar
      })
    }
  }

  render() {
    let {height, width} = Dimensions.get('window');
    if ( this.props.avatar && this.props.image) {
      return(
        <View>
          <ImageBackground style={{ width: width - 11, height: 96 }} source={{ uri: this.props.image }}>
            <Avatar images={ this.state.avatar } />
          </ImageBackground>
        </View>
      )
    } else {
      return (
        <View>
          <ImageBackground style={{ width: width - 11, height: 96 }} source={{ uri: this.props.image }}>
            
          </ImageBackground>
        </View>
      );
    }
  }
}