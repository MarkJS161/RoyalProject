/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { StackNavigator } from 'react-navigation';
import FirebaseConfig from './src/components/FirebaseConfig';
import HomeScreen from './src/components/Home/HomeScreen';
import LoginScreen from './src/components/Login/LoginScreen';
import MapScreen from './src/components/MapTrack/MapScreen';

export default class App extends Component<{}> {
  state = {
    loggedIn: null,
  }
  
  componentDidMount(){
    console.disableYellowBox = true;
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  renderContent(){
    switch(this.state.loggedIn){
      case true:
        return(
          //<HomeScreen />
          <AppNavigator />
        );
      case false:
        return <LoginScreen />;
      default:
      return ;
    }
}

  render() {
    return (
        <View style={styles.container}>
          {this.renderContent()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },  
});

const AppNavigator = StackNavigator(
  {
    HomeScreen: { screen : HomeScreen },
    MapScreen: { screen : MapScreen }
  },
  {
    headerMode: 'none',
  }
);