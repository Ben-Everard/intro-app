import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './styles.js';
import images from '../../../config/images.js';

export default class eventCategories extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View>
        <View style={styles.container}>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => this.props.eventType('Game Time', 'Play Some Games', images.createEvent.icons.white.games)}>
              <View style={styles.imageText}>
                <Image
                  style={styles.icon}
                  source={this.props.gradient === 'Game Time' ? images.createEvent.icons.gradient.games : images.createEvent.icons.black.games}
                />
                <Text style={styles.text}>Play Some Games</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.eventType('Outside', 'Let\'s Play Outside', images.createEvent.icons.white.outdoors)}>
              <View style={styles.imageText}>
                <Image
                  style={styles.icon}
                  source={this.props.gradient === 'Outside' ? images.createEvent.icons.gradient.outdoors : images.createEvent.icons.black.outdoors}
                />
                <Text style={styles.text}>Let's Play Outside</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.eventType('Drinks', 'Get Some Drinks', images.createEvent.icons.white.drinks)}>
              <View style={styles.imageText}>
                <Image
                  style={styles.icon}
                  source={this.props.gradient === 'Drinks' ? images.createEvent.icons.gradient.drinks : images.createEvent.icons.black.drinks}
                />
                <Text style={styles.text}>Get Some Drinks</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.eventType('Live Music', 'Let\'s See A Show', images.createEvent.icons.white.music)}>
              <View style={styles.imageText}>
                <Image
                  style={styles.icon}
                  source={this.props.gradient === 'Live Music' ? images.createEvent.icons.gradient.music : images.createEvent.icons.black.music}
                />
                <Text style={styles.text}>Let's See A Show</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => this.props.eventType('Girls Night', 'Girls Day / Evening', images.createEvent.icons.white.girls)}>
              <View style={styles.imageText}>
                <Image
                  style={styles.icon}
                  source={this.props.gradient === 'Girls Night' ? images.createEvent.icons.gradient.girls : images.createEvent.icons.black.girls}
                />
                <Text style={styles.text}>Girls Day / Evening</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.eventType('Coffee', 'Grab Some Coffee', images.createEvent.icons.white.coffee)}>
              <View style={styles.imageText}>
                <Image
                  style={styles.icon}
                  source={this.props.gradient === 'Coffee' ? images.createEvent.icons.gradient.coffee : images.createEvent.icons.black.coffee}
                />
                <Text style={styles.text}>Grab Some Coffee</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.eventType('Guys Night', 'Guys Day / Night', images.createEvent.icons.white.guys)}>
              <View style={styles.imageText}>
                <Image
                  style={styles.icon}
                  source={this.props.gradient === 'Guys Night' ? images.createEvent.icons.gradient.guys : images.createEvent.icons.black.guys}
                />
                <Text style={styles.text}>Guys Day / Night</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.eventType('Other', 'Something Better', images.createEvent.icons.white.other)}>
              <View style={styles.imageText}>
                <Image
                  style={styles.icon}
                  source={this.props.gradient === 'Other' ? images.createEvent.icons.gradient.other : images.createEvent.icons.black.other}
                />
                <Text style={styles.text}>Something Better</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}