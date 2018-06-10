'strict';
// NPM files
import React, { Component } from 'react';
import { AsyncStorage, Image, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';

// Local files
import images from '../../config/images.js';
// import { stackReset } from '../../config/globalFunctions.js';
import styles from './styles.js';

export default class SplashScreen extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        let db = firebase.firestore();
        let userRef = db.collection('users').doc(user.uid);

        userRef.get()
          .then(doc => {
            if (!doc.exists) {
              this.props.navigation.navigate('LoginScreen');
            } else {
              let data = doc.data();
              console.log(data);
              // Setting up data for AsyncStorage
              let userData = {
                userDetails: data,
                userId: user.uid
              }
              AsyncStorage.multiSet([['userId', user.uid]]);

              // Directing to correct page
              if (data && data.description && data.description !== '') {
                const resetAction = this.props.navigation.dispatch(NavigationActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
                  key: null,
                  otherParam: {user: userData}
                }));
                this.props.navigation.dispatch(resetAction);
              } else {
                this.props.navigation.navigate('AccountSetup', {user: userData});
              }
              return doc.data();
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          })
      } else {
        this.props.navigation.navigate('LoginScreen');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={images.splash}
        />
      </View>
    )
  }
}