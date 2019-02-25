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

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.avatarUpdate();
    }
  }

  componentDidMount() {
    this.avatarUpdate();
  }

  avatarUpdate() {
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
        let imageURL = image;
        let styleUpdate = {width: 45, height: 45, borderRadius: 22,borderWidth: 2, borderColor: '#F99266', left: -35, zIndex: 100,}

        if (i === 0) {
          styleUpdate = {width: 45, height: 45, borderRadius: 22,borderWidth: 2, borderColor: '#F99266', left: -15, zIndex: 100,}
        }
        if (image.image) {
          imageURL = image.image;
        }
        avatar.push(
          <Image
            key={i}
            style={image.active === true ? styleUpdate : styles[i]}
            source={{url: imageURL}}
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