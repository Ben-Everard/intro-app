import React, { Component } from 'react'; 
import { AsyncStorage, Image, ImagePickerIOS, Text, TouchableHighlight, View } from 'react-native';

import images from '../../../config/images.js';
import styles from './styles.js';

// Components
import StatusBar from '../../../components/StatusBar';
import UserHeader from '../../../components/User/UserHeader/';
import Button from '../../../components/Button/';

export default class newUser extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      user: params.user.userDetails,
      id: params.user.userId
    };

  }
  _photoPicker() {
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ image: imageUri });
    }, error => console.error(error));
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state)
    return (
      <View style={styles.container}>
        <StatusBar />
        <UserHeader onPress={() => this._photoPicker} profilePic={this.state.user.profilePhoto}/>
        <View style={styles.background}>
          <Text style={styles.welcomeName}>Hi {this.state.user.name}!</Text>
          <Text style={styles.text}>
            Are you into coffee dates or karaoke? Group hangouts or one-on-one chats? Movie marathons or … actual marathons? 
          </Text>
          <Text style={styles.text}> 
            We want to help you meet people who like the same things you do. Problem is, we don’t know what you like. Help us out by answering a few simple questions. 
          </Text>
        </View>
        <View style={styles.button}>
          <Button onPress={() => navigate('NewUserPersonality', {user: this.state.user, id: this.state.id})} text={'Lets do this'}/>
        </View>
        <View style={styles.paginationDots}>
          <Image
            style={styles.pagination}
            source={images.accountSetup.paginationDots.oneDot} />
        </View>
      </View>
    )
  }
}