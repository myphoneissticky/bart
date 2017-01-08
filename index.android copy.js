/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { DOMParser } from 'react-native-html-parser';


function fetchEtd() {
  return Promise.resolve().then(() => {
    return fetch(
      'https://api.bart.gov/api/etd.aspx?cmd=etd&orig=DBRK&key=MW9S-E7SL-26DU-VV8V',
        {
          method: 'GET',
          headers: {
            'Accept': 'text/xml',
          }
      }
    );
  }).then((response) => {
    console.info(`api.bart.gov response status: ${response.status}`);
    return response.text();
  }).then((text) => {
    var parser = new DOMParser();
    return parser.parseFromString(text, "application/xml");
  }).then((result) => {
    return result.querySelect(":root > station > etd > estimate")
  }).then((estimates) => {
    for (estimate of estimates) {
      // fskjdfhsjdk;
      if (estimate.querySelect("direction")[0].textContent === "South") {
        return estimate.querySelect("minutes")[0].textContent;
      }
    }
  }).then((etd) => {
    console.info(`etd: ${etd}`);
    return etd;
  });
}


// class MyButton extends Component {
//   _onPressButton() {
//     console.log("You tapped the button!");
//   }

//   render() {
//     return (
//       <Text name="cat" onPress={this._onPressButton}>
//         {this.props.children}
//       </Text>
//     );
//   }
// }

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      etd: "uh I'm fetching them hang on"
    };
  }

  fetchEtd() {
    fetchEtd().then((etd) => {
      this.setState({
        etd: etd,
        lastUpdate: (new Date).toString(),
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Text style={styles.instructions} onPress={this.fetchEtd.bind(this)}>
          Bart ETD: {this.state.etd}{'\n'}
          As of: {this.state.lastUpdate}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
