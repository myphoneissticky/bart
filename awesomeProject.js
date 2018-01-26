import {
  StyleSheet,
  AppRegistry,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import React, { Component } from 'react';
import { fetchEtd } from './index.shared'

export const styles = StyleSheet.create({
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
    margin: 5,
  },
});

export class AwesomeProject extends Component {
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
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <Text style={styles.instructions} onPress={this.fetchEtd.bind(this)}>
          Bart ETD: {this.state.etd}{'\n'}
          As of: {this.state.lastUpdate}
        </Text>
      </View>
    );
  }
}
