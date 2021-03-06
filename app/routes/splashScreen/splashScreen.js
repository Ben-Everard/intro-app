"strict";
// NPM files
import React, { Component } from "react";
import { AsyncStorage, Image, View } from "react-native";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

// Local files
import images from "../../config/images.js";
// import { stackReset } from '../../config/globalFunctions.js';
import styles from "./styles.js";

export default class SplashScreen extends Component {
  componentDidMount() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "LoginScreen" })],
      key: null
    });
    this.authListener(resetAction);
  }

  authListener = resetAction => {
    this.fireBaseListener = firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        let db = firebase.firestore();
        let userRef = db.collection("users").doc(user._user.uid);
        userRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              return this.props.navigation.navigate("LoginScreen");
            } else {
              let data = doc.data();
              // Setting up data for AsyncStorage
              let minData = {
                age: data.age,
                description: data.description,
                email: data.email,
                name: data.name,
                preferences: data.preferences,
                profilePhoto: data.profilePhoto
              };
              // console.log(data);
              let userData = {
                userDetails: minData,
                userId: user.uid
              };

              AsyncStorage.multiSet([
                ["userDetails", JSON.stringify(userData.userDetails)],
                ["userId", user.uid]
              ]);
              // Directing to correct page
              if (data && data.profileSet) {
                this.props.navigation.navigate("HomeScreen", {
                  user: userData
                });
              } else {
                this.props.navigation.navigate("AccountSetup", {
                  user: userData
                });
              }
            }
          })
          .catch(err => {
            console.log("Error getting document", err);
          });
      } else {
        this.props.navigation.dispatch(resetAction);
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={images.splash} />
      </View>
    );
  }
}
