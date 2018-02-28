import React, { Component } from 'react'; 
import { Image, TouchableHighlight, View } from 'react-native';

import images from '../../config/images.js';
import styles from './styles.js';

export default class avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatars: []
    }
  }

  componentDidMount() {
    let avatar = [];
    avatar.push(
      <Image
        key={'defaultDetails'}
        style={styles.defaultDetails}
        source={images.events.profileDetials}
      />
    );

    this.setState({
      avatars: avatar
    });

    if ( this.props.images && (this.props.images).length > 0) {
      (this.props.images).forEach((image, i) => {
        avatar.push(
          <Image
            key={i}
            style={styles[i]}
            source={{url: image}}
          />
        );
      });
    }
  }

  render() {
    return (
      <View style={styles.profiles}>
        { this.state.avatars }
      </View> 
    )
  }
}