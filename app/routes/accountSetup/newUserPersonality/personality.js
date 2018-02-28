import React, { Component } from 'react'; 
import { 
  Image,
  Slider,
  StyleSheet, 
  Text, 
  TouchableHighlight, 
  View 
} from 'react-native';

import images from '../../../config/images.js';
import styles from './styles.js';

// Components
import Button from '../../../components/Button/';
import StatusBar from '../../../components/StatusBar/';
import UserHeader from '../../../components/User/UserHeader';



export default class newPersonality extends Component {
  constructor(props) {
    super(props);
    this.state = {
      introExtro: 5,
      dayNight: 5,
      coffeeDrinks: 5,
      indoorOutdoor: 5,
      planSpontaneous: 5
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <StatusBar />
        <UserHeader onPress={() => this._photoPicker} profilePic={params.user.profilePhoto}/>
        <View>
          <View style={styles.description}>
            <Text>Time to figure out your personality</Text>
          </View>
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
        <View style={styles.button}>
          <Button text={'Next'} onPress={() => navigate('NewUserBio', {personality: this.state, user: params.user, id: params.id})}/>
        </View>
        <View style={styles.paginationDots}>
          <Image
            style={styles.pagination}
            source={images.accountSetup.paginationDots.twoDot} />
        </View>
      </View>
    )
  }
}