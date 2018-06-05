import React, { Component } from 'react';
import { AsyncStorage, Keyboard, KeyboardAvoidingView, ScrollView, Slider, Text, TextInput, TouchableWithoutFeedback, View
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import firebase from 'react-native-firebase';

import styles from './styles.js';
import images from '../../../config/images.js';

import StatusBar from '../../../components/StatusBar/';
import UserHeader from '../../../components/User/UserHeader/';
import Button from '../../../components/Button/'

export default class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.state = {
      placeHolder: 'If you are reading this then something went wrong',
      introExtro: params.user.preferences.introExtro,
      dayNight: params.user.preferences.dayNight,
      coffeeDrinks: params.user.preferences.coffeeDrinks,
      indoorOutdoor: params.user.preferences.indoorOutdoor,
      planSpontaneous: params.user.preferences.planSpontaneous,
      value: params.user.description
    }
  }
  _updateInfo(backAction) {
    const self = this;
    const { navigate } = this.props.navigation;
    let db = firebase.firestore();
    db.collection('users').doc(this.state.uid).set({
      description: this.state.value,
      preferences: {
        coffeeDrinks: this.state.coffeeDrinks,
        dayNight: this.state.dayNight,
        introExtro: this.state.introExtro,
        planSpontaneous: this.state.planSpontaneous,
        indoorOutdoor: this.state.indoorOutdoor
      }
    }, {merge:true});
    this.props.navigation.dispatch(backAction);
  }

  componentDidMount() {
    const value = AsyncStorage.getItem('userId')
      .then((value) => {
        this.setState({
          uid: value
        })
      }) 
      .catch((error)=> {
        console.log(error)
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    const backAction = NavigationActions.back({
      key: null
    })
    return (
        <View style={styles.container}>
          <StatusBar />
          <KeyboardAvoidingView behavior="position">
            <UserHeader profilePic={params.user.profilePhoto}/>
            <ScrollView style={styles.editArea} keyboardDismissMode="on-drag">
              
              <Text style={styles.bioEdit}>Edit Bio Below</Text>
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
              <View style={styles.instagram}>
                <Text style={styles.instaText}>Link your crap</Text>
                <Text style={styles.instaLink}>Instagram</Text>
              </View>
              <View>
                <Text style={styles.description}>Slide Slide Slide, categorize your personality</Text>
                <View style={styles.categories} >
                  <View style={styles.labels}>
                    <Text>Introvert</Text>
                    <Text>Extrovert</Text>
                  </View>
                  <View stlye={styles.slider}>
                    <Slider 
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.introExtro}
                      onSlidingComplete={ (value) => this.setState({ introExtro: parseFloat( value.toFixed(2) ) })}
                      thumbImage={images.slider.handle}
                      trackImage={images.slider.progress}
                    />
                  </View>
                </View>
                <View style={styles.categories}>
                  <View style={styles.labels}>
                    <Text>Day</Text>
                    <Text>Night</Text>
                  </View>
                  <View stlye={styles.slider}>
                    <Slider 
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.dayNight}
                      onSlidingComplete={ (value) => this.setState({ dayNight: parseFloat( value.toFixed(2) ) })}
                      thumbImage={images.slider.handle}
                      trackImage={images.slider.progress}
                    />
                  </View>
                </View>
                <View style={styles.categories}>
                  <View style={styles.labels}>
                    <Text>Coffee</Text>
                    <Text>Drinks</Text>
                  </View>
                  <View stlye={styles.slider}>
                    <Slider 
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.coffeeDrinks}
                      onSlidingComplete={ (value) => this.setState({ coffeeDrinks: parseFloat( value.toFixed(2) ) })}
                      thumbImage={images.slider.handle}
                      trackImage={images.slider.progress}
                    />
                  </View>
                </View>
                <View style={styles.categories}>
                  <View style={styles.labels}>
                    <Text>Indoors</Text>
                    <Text>Outdoors</Text>
                  </View>
                  <View stlye={styles.slider}>
                    <Slider 
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.indoorOutdoor}
                      onSlidingComplete={ (value) => this.setState({ indoorOutdoor: parseFloat( value.toFixed(2) ) })}
                      thumbImage={images.slider.handle}
                      trackImage={images.slider.progress}
                    />
                  </View>
                </View>
                <View style={styles.categories}>
                  <View style={styles.labels}>
                    <Text>Have a Plan</Text>
                    <Text>Be Spontaneous</Text>
                  </View>
                  <View stlye={styles.slider}>
                    <Slider 
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={10}
                      value={this.state.planSpontaneous}
                      onSlidingComplete={ (value) => this.setState({ planSpontaneous: parseFloat( value.toFixed(2) ) })}
                      thumbImage={images.slider.handle}
                      trackImage={images.slider.progress}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.buttons}>
                <View style={styles.buttonCancel}>
                  <Button text={'Cancel'} onPress={()=>this.props.navigation.dispatch(backAction)} />
                </View>
                <View style={styles.button}>
                  <Button text={'Update'} onPress={()=>this._updateInfo(backAction)}/>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
    )
  }
}