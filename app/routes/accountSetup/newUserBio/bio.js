// NPM files
import React, { Component } from 'react'; 
import { Image, Text, TextInput, View } from 'react-native';
import firebase from 'react-native-firebase';

// Local files
import styles from './styles.js';
import images from '../../../config/images.js';

// Components
import Button from '../../../components/Button/';
import StatusBar from '../../../components/StatusBar';
import UserHeader from '../../../components/User/UserHeader';

export default class newUser extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = { 
      placeHolder: 'Hi! New to town and don’t know anyone (yet). I like Hawaiian pizza, competitive salsa dancing, and watching Netflix in my snowman boxers.',
      value: '',
      coffeeDrinks: params.personality.coffeeDrinks,
      dayNight: params.personality.dayNight,
      introExtro: params.personality.introExtro,
      indoorOutdoor: params.personality.indoorOutdoor,
      planSpontaneous: params.personality.planSpontaneous,
      uid: params.user.uid,
      age: params.user.age,
    };
  }

  _profileUpdate( params, navigate) {
    let db = firebase.firestore();
    let userRef = db.collection('users').doc(params.id);

    userRef.update({
      description: this.state.value,
      preferences: {
        coffeeDrinks: this.state.coffeeDrinks,
        dayNight: this.state.dayNight,
        introExtro: this.state.introExtro,
        planSpontaneous: this.state.planSpontaneous,
        indoorOutdoor: this.state.indoorOutdoor
      }
    });
    this.props.navigation.navigate('NewUserInsta', {description: this.state.value, user: params.user, id: params.id});
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <UserHeader onPress={() => this._photoPicker} profilePic={ params.user.profilePhoto } />
        <TextInput
          style={styles.inputBox}
          multiline={true}
          editable = {true}
          maxLength = {500}
          onChangeText={(value) => this.setState({value})}
          placeholder={this.state.placeHolder}
          value={this.state.value}
        />
        <View style={styles.textCountBox}>
          <Text style={styles.textCount}>{this.state.value.length}/500</Text>
        </View>
        <View style={styles.button}>
          <Button text={'Almost there'} onPress={()=>this._profileUpdate(params, navigate)}/>
        </View>
        <View style={styles.paginationDots}>
          <Image
            style={styles.pagination}
            source={images.accountSetup.paginationDots.threeDot} />
        </View>
      </View>
    )
  }
}