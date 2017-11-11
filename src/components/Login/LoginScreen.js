import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TextInput,
    Button,
    TouchableOpacity
} from 'react-native';
import firebase from 'firebase';
//import FirebaseConfig from '../FirebaseConfig';
import logo from '../../img/logo.png';
import background from '../../img/Wallpaper.jpg';
import personIcon from '../../img/login1_person.png';
import lockIcon from '../../img/login1_lock.png';

const { width, height } = Dimensions.get("window");

export default class LoginScreen extends Component {
    state ={
        email: '',
        password: '',
        error: '',
        loading: false
    };

    onButtonPress(){
        const{ email, password } = this.state;

        this.setState({ error: '', loading: true });
        
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));
    }

    onLoginFail() {
        this.setState({ 
            error: 'Authentication Failed.', 
            loading: false 
        });
    }
     
    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        });
    }

    render() {
        return (
            <View style={styles.container}>
            <Image source={background} style={styles.Background} resizeMode="cover">
              <View style={styles.markWrap}>
                <Image source={logo} style={styles.mark} resizeMode="contain" />
                <Text style={ styles.titles }> Realtime Temperature and Humidity monitor </Text>
              </View>
              <View style={styles.wrapper}>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={personIcon} style={styles.icon} resizeMode="contain"/>
                  </View>
                  <TextInput 
                    placeholder="Email" 
                    placeholderTextColor="#FFFFFF"
                    style={styles.Input}
                    value = {this.state.email}
                    onChangeText = {email => this.setState({email})}
                    underlineColorAndroid= "#FFFFFF"
                  />
                </View>
                <View style={styles.inputWrap}>
                  <View style={styles.iconWrap}>
                    <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
                  </View>
                  <TextInput 
                    placeholderTextColor="#FFFFFF"
                    placeholder="Password" 
                    style={styles.Input} 
                    secureTextEntry
                    value = {this.state.password}
                    onChangeText = {password => this.setState({password})}
                    underlineColorAndroid= "#FFFFFF"
                  />
                </View>
                <View>
                  <Text style={styles.errorText}>
                      {this.state.error}
                  </Text>
                </View>
                <TouchableOpacity activeOpacity={.5} onPress={() => this.onButtonPress()} >
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Image>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titles:{
    color: '#ecf0f1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 20
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mark: {
    width: 137,
    height: 195,
    flex: 1,
  },
  Background: {
    width,
    height,
    overlayColor: 'rgba(46, 204, 113, 0.6)',
  },
  wrapper: {
    paddingVertical: 30,
    marginBottom: 70,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 5,
    height: 60,
    backgroundColor: 'rgba(236, 240, 241,0.4)',
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  Input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#f1c40f",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    height: 60
  },
  buttonText: {
    color: "#2c3e50",
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  accountText: {
    color: "#D8D8D8"
  },
  errorText: {
    alignSelf: 'center',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 10,
  },
});