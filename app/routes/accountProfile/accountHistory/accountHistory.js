import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { NavigationActions } from "react-navigation";
import firebase from "react-native-firebase";

import styles from "./styles.js";
import StatusBar from "../../../components/StatusBar/";
import CustomNav from "../../../components/CustomNav/";
import EventImage from "../../../components/EventImage/";
import Title from "../../../components/EventTitle/";
import Description from "../../../components/EventDescription/";
import HomeDetails from "../../../components/HomeDetail/";

export default class AccountHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming: null,
      loading: true,
      dataSet: false
    };
  }

  componentDidMount() {
    let db = firebase.firestore();
    let ref = db.collection("users");
    let currentId = firebase.auth().currentUser.uid;
    let memberLength = 0;
    let mem = 0;

    ref
      .doc(currentId)
      .get()
      .then(docs => {
        let items = [];
        let dataEvent = docs.data();
        let joinedArray = Object.values(dataEvent.joined);
        let eachEvent = null;
        let self = this;
        joinedArray.map(function(data, index) {
          let imageArray = [];
          db.doc(data._documentPath.relativeName)
            .get()
            .then(events => {
              let event = events.data();
              eachEvent = event;
              let membersArray = Object.values(event.members);
              memberLength += Object.size(event.members);
              membersArray.forEach((data, index) => {
                db.doc(data._documentPath.relativeName)
                  .get()
                  .then(user => {
                    mem++;
                    imageArray.push(user.data().profilePhoto);
                    if (mem === memberLength) {
                      self.setState({
                        loading: false,
                        upcoming: items,
                        dataSet: true
                      });
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              });
              if (eachEvent) {
                items.push({
                  events: {
                    event: eachEvent,
                    eventId: eachEvent.id,
                    imageArray
                  }
                });
              }
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const backAction = NavigationActions.back({
      key: null
    });
    if (this.state.loading) {
      return (
        <View>
          <StatusBar />
          <CustomNav
            onPress={() => this.props.navigation.dispatch(backAction)}
            text={"BACK TO ACCOUNT SETTINGS"}
            left={true}
          />
        </View>
      );
    } else if (
      !this.state.loading &&
      (this.state.upcoming.length === 0 || this.state.upcoming === undefined)
    ) {
      return (
        <View>
          <StatusBar />
          <CustomNav
            onPress={() => this.props.navigation.dispatch(backAction)}
            text={"BACK TO ACCOUNT SETTINGS"}
            left={true}
          />
          <Text>You have no event history</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar />
          <CustomNav
            onPress={() => this.props.navigation.dispatch(backAction)}
            text={"BACK TO ACCOUNT SETTINGS"}
            left={true}
          />
          <FlatList
            keyExtractor={(item, index) => item.events.eventId}
            data={this.state.upcoming}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <View style={styles.eventImage}>
                  <EventImage
                    image={item.events.event.image}
                    avatar={item.events.imageArray}
                    clickable={false}
                  />
                  <HomeDetails
                    people={item.events.event.openSpots}
                    location={item.events.event.place.name}
                  />
                </View>
                <View style={styles.event}>
                  <View style={styles.titleMargin}>
                    <Title
                      title={item.events.event.event}
                      style={styles.eventTitle}
                    />
                  </View>
                  <Description description={item.events.event.description} />
                </View>
              </View>
            )}
          />
        </View>
      );
    }
  }
}
