//NPM Files
import React, { Component } from "react";
import {
  AsyncStorage,
  Button,
  Image,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import FBSDK, {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from "react-native-fbsdk";
import firebase from "react-native-firebase";
import { NavigationActions } from "react-navigation";

//Local Files
import images from "../../config/images.js";
import styles from "./styles.js";

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      uid: null,
      latitude: null,
      longitude: null,
      error: null,
      disabled: true
    };
  }

  _fbAuth() {
    LoginManager.logInWithReadPermissions([
      "email",
      "user_friends",
      "public_profile",
      "user_photos",
      "user_birthday"
    ]).then(
      result => {
        if (result.isCancelled) {
          alert("Login was cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            accessTokenData => {
              const token = accessTokenData.accessToken;
              const credential = firebase.auth.FacebookAuthProvider.credential(
                accessTokenData.accessToken
              );
              firebase
                .auth()
                .signInAndRetrieveDataWithCredential(credential)
                .then(
                  result => {
                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        alert("Error fetching data: " + error.toString());
                      } else {
                        if (result.birthday) {
                          let birthday = Date.parse(result.birthday);
                          let today = Date.now(0);
                          let ageDate = today - birthday; // miliseconds from epoch
                          let newDate = new Date(ageDate);
                          let age = Math.abs(newDate.getUTCFullYear() - 1970);
                          this.setState({
                            age: age,
                            profilePhoto:
                              "https://graph.facebook.com/" +
                              result.id +
                              "/picture?type=large"
                          });
                        }

                        firebase.auth().onAuthStateChanged(
                          user => {
                            if (user) {
                              this.setState = {
                                uid: user._user.uid
                              };

                              let db = firebase.firestore();
                              let docRef = db
                                .collection("users")
                                .doc(user._user.uid);
                              docRef
                                .get()
                                .then(doc => {
                                  if (!doc.exists) {
                                    let data = {
                                      name: result.first_name,
                                      email: result.email,
                                      fullName: result.name,
                                      description: "",
                                      age: this.state.age,
                                      ageRange: result.age_range.min,
                                      profilePhoto:
                                        "https://graph.facebook.com/" +
                                        result.id +
                                        "/picture?type=large",
                                      gender: result.gender
                                    };
                                    let userData = {
                                      userDetails: data,
                                      userId: user.uid
                                    };
                                    AsyncStorage.multiSet([
                                      [
                                        "userDetails",
                                        JSON.stringify(userData.userDetails)
                                      ],
                                      ["userId", user.uid]
                                    ]);
                                    docRef.set(data);
                                    this.props.navigation.navigate(
                                      "AccountSetup",
                                      { user: userData }
                                    );
                                  } else {
                                    let data = doc.data();
                                    let minData = {
                                      age: data.age,
                                      description: data.description,
                                      email: data.email,
                                      name: data.name,
                                      preferences: data.preferences,
                                      profilePhoto: data.profilePhoto
                                    };
                                    // Setting up data for AsyncStorage
                                    let userData = {
                                      userDetails: minData,
                                      userId: user.uid
                                    };
                                    AsyncStorage.multiSet([
                                      [
                                        "userDetails",
                                        JSON.stringify(userData.userDetails)
                                      ],
                                      ["userId", user.uid]
                                    ]);

                                    // Directing to correct page
                                    if (data && data.profileSet) {
                                      this.props.navigation.navigate(
                                        "HomeScreen",
                                        { user: userData }
                                      );
                                    } else {
                                      this.props.navigation.navigate(
                                        "AccountSetup",
                                        { user: userData }
                                      );
                                    }
                                    return doc.data();
                                  }
                                })
                                .catch(err => {
                                  console.log("Error getting document", err);
                                });
                            }
                          },
                          error => {
                            console.log(error);
                          }
                        );
                      }
                    };
                    const infoRequest = new GraphRequest(
                      "/me",
                      {
                        parameters: {
                          fields: {
                            string:
                              "email, name, first_name, middle_name, last_name, picture.type(large), albums{name, photos{name, picture}}, gender, birthday, age_range"
                          },
                          access_token: {
                            string: token.toString()
                          }
                        }
                      },
                      responseInfoCallback
                    );
                    new GraphRequestManager().addRequest(infoRequest).start();
                  },
                  error => {
                    console.log(error);
                  }
                );
            },
            error => {
              console.log("Something went wrong " + error);
            }
          );
        }
      },
      error => {
        alert("Login failed with error: " + error);
      }
    );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={images.login.splashLogin}
        />
        <View style={styles.loginSection}>
          <Image style={styles.splashLogo} source={images.login.logo} />
          <TouchableHighlight
            onPress={this._fbAuth.bind(this)}
            disabled={this.state.dsiabled}
          >
            <Image
              style={styles.signinButton}
              source={images.login.facebookSignIn}
            />
          </TouchableHighlight>
          <Text style={styles.text}>
            Don't worry we will never post to Facebook
          </Text>
        </View>
      </View>
    );
  }
}
