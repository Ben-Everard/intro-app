import React, { Component } from "react";
import {
  AsyncStorage,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
// import firebase from 'firebase';

import styles from "./styles.js";
import images from "../../../config/images.js";

import StatusBar from "../../../components/StatusBar/statusBar.js";
import UserHeader from "../../../components/User/UserHeader/";

import { NewProfile } from "../../../config/routes.js";

export default class accountHome extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const value = AsyncStorage.getItem("userDetails")
      .then(value => {
        value = JSON.parse(value);
        this.setState({
          name: value.name,
          age: value.age,
          profilePic: value.profilePhoto,
          user: value
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar />
        <UserHeader profilePic={this.state.profilePic} />
        <View style={styles.container}>
          <View style={styles.profileSections}>
            <TouchableOpacity
              onPress={() =>
                navigate("UpdateProfile", { user: this.state.user })
              }
            >
              <View style={styles.nameAgeEditRow}>
                <Text style={styles.textSectionName}>
                  {this.state.name}, {this.state.age}
                </Text>
                <Image source={images.edit} />
              </View>
              <Text style={styles.viewEdit}>View and edit profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileSections}>
            <TouchableOpacity onPress={() => navigate("AccountHistory")}>
              <Text style={styles.textSection}>My Events </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileSections}>
            <TouchableOpacity onPress={() => navigate("AccountSettings")}>
              <Text style={styles.textSection}>Settings </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.profileSections}>
            <TouchableOpacity>
              <Text style={styles.textSection}>Invite Firends </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
