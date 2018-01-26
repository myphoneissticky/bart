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
import { 
  styles,
  AwesomeProject,
} from './awesomeProject'
import { 
  fetchEtd
} from './index.shared'

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
