import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import styles from './styles.js';
import images from '../../config/images.js';
import { GOOGLE_MATRIX } from '../../config/settings.js';

export default class eventIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: 'NA'
    }
  }
  componentWillMount() {
    switch(this.props.eventType) {
      case 'Drinks':
        this.setState({
          eventIcon: images.createEvent.icons.black.drinks
        })
        break;
      case 'Girls Night':
        this.setState({
          eventIcon: images.createEvent.icons.black.girls
        })
        break;
      case 'Guys Night':
        this.setState({
          eventIcon: images.createEvent.icons.black.guys
        })
        break;
      case 'Game Time':
        this.setState({
          eventIcon: images.createEvent.icons.black.games
        })
        break;
      case 'Outside':
        this.setState({
          eventIcon: images.createEvent.icons.black.outdoors
        })
        break;
      case 'Live Music':
        this.setState({
          eventIcon: images.createEvent.icons.black.music
        })
        break;
      case 'Coffee':
        this.setState({
          eventIcon: images.createEvent.icons.black.coffee
        })
        break;
      case 'Other':
        this.setState({
          eventIcon: images.createEvent.icons.black.other
        })
        break;
      default:
        this.setState({
          eventIcon: images.createEvent.icons.black.other
        })
    }
  }
  distanceFinder(origin, destination) {
    return fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ origin +'&destinations='+ destination +'&key=' + GOOGLE_MATRIX)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.rows[0].elements[0] && responseJson.rows[0].elements[0].distance && responseJson.rows[0].elements[0].distance.text) {
          this.setState({
            distance: responseJson.rows[0].elements[0].distance.text
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidMount() {
    let origin = this.props.currentLat + ',' + this.props.currentLong;
    let destination = this.props.destinationLat + ',' + this.props.destinationLong;
    this.distanceFinder(origin, destination);
  }

  render() {
    return(
      <View style={styles.icons}>
        <View>
          <Image
            style={styles.icon}
            source={images.events.icons.profile}
          />
          <Text style={styles.Text}>{this.props.people} Guest</Text>
        </View>
        <View>
          <Image
            style={styles.icon}
            source={this.state.eventIcon}
          />
          <Text style={styles.Text}>{this.props.eventType}</Text>
        </View>
        <View>
          <Image
            style={styles.icon}
            source={images.events.icons.time}
          />
          <Text style={styles.Text}>{this.props.time}</Text>
        </View>
        <View>
          <Image
            style={styles.location}
            source={images.events.icons.checkIn}
          />
          <Text style={styles.Text}>{this.state.distance}</Text>
        </View>
      </View>
    )
  }
}