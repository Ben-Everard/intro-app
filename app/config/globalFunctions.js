import { GOOGLE_MATRIX } from './settings.js';
import { NavigationActions } from 'react-navigation';

export function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString ().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice (1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join (''); // return adjusted time or original string
}

// export function distanceFinder(origin, destination) {
//   return fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+ origin +'&destinations='+ destination +'&key=' + GOOGLE_MATRIX)
//     .then((response) => response.json())
//     .then((responseJson) => {
//       return responseJson.rows[0].elements[0].distance.text;
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }


export function stackReset(routePath) {
  return this.props.navigation.dispatch(NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: routePath })],
    key: null
  }));
}
