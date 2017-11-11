import React, { Component } from "react";
import { View, 
        Container, 
        Content, 
        Header, 
        Title,
        Card,
        CardItem, 
        Right, 
        Body, 
        Left, 
        Button,
        Text, 
        Icon,
        Thumbnail } from "native-base";
import MapView from 'react-native-maps';
import firebase from 'firebase';
import FirebaseConfig from '../FirebaseConfig';
import styles from './MapTrackStyles';

export default class MapScreen extends Component {

    
    constructor(props){
        super(props);
        this.rootRef = firebase.database().ref('License-Plate').child(this.props.navigation.state.params.license);
        this.state ={
            Temperature_L: 0,
            Humidity_L: 0,
            Temperature_R: 0,
            Humidity_R: 0,
            NowDate: '',
            currentPosition:{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            markerPosition:{
                latitude: 37.78825,
                longitude: -122.4324,
            },
            licensePlate: this.props.navigation.state.params.license
            
        }
    }

    componentDidMount(){
        this.rootRef.on('value', snapshot =>{
            this.setState({NowDate: snapshot.val().date})
            var region = {
                latitude: parseFloat(snapshot.val().latitude),
                longitude: parseFloat(snapshot.val().longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
            var positionNow ={
                latitude: parseFloat(snapshot.val().latitude),
                longitude: parseFloat(snapshot.val().longitude)
            }
            this.setState({currentPosition: region})
            this.setState({markerPosition: positionNow})
            this.setState({Temperature_L: snapshot.val().temperatureL, Humidity_L: snapshot.val().humidityL})
            this.setState({Temperature_R: snapshot.val().temperatureR, Humidity_R: snapshot.val().humidityR})
        });
    }

    render(){
        const {goBack} = this.props.navigation;
        return (
            <Container>
                <Header style={{backgroundColor: 'rgba(44, 62, 80, 1.0)'}}>
                <Left>
                    <Button transparent onPress={() => goBack()}>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body style = {{alignItems: "center" }}>
                    <Text style={{fontSize: 18, color: 'white', fontWeight: 'bold'}}>Truck's Details</Text>
                </Body>
                <Right/>
                </Header>
                <View style={{flex: 4}}>
                    <MapView.Animated style = {styles.map} 
                        region={
                            this.state.currentPosition
                        }
                        minZoomLevel = {17}
                        maxZoomLevel = {18}
                    >
                        <MapView.Marker
                            coordinate={this.state.markerPosition}
                        />
                    </MapView.Animated>
                </View>
                    <Card style={{flex: 2, overlayColor: 'black'}}>
                        <CardItem header style={{backgroundColor: 'rgba(155, 89, 182, 0.8)'}}>
                            <Thumbnail square small style={{tintColor: 'white'}} source={require('../../img/truck-icon.png')}/>
                            <Body>
                                <Text style={{fontWeight: 'bold', color: 'white'}}>   License-Plate : {this.state.licensePlate}</Text>
                                <Text note style={{fontWeight: 'bold', color: 'white'}}>   ข้อมูลจาก ฝั่งซ้าย,ขวา วันที่ : {this.state.NowDate}</Text>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={{fontWeight: 'bold', fontSize: 18}}>Left side</Text>
                                <Text style={{fontSize: 14}}>Temperature : {this.state.Temperature_L}</Text>
                                <Text style={{fontSize: 14}}>Humidity : {this.state.Humidity_L}</Text>
                            </Body>
                            <Body>
                                <Text style={{fontWeight: 'bold', fontSize: 18}}>Right side</Text>
                                <Text style={{fontSize: 14}}>Temperature : {this.state.Temperature_R}</Text>
                                <Text style={{fontSize: 14}}>Humidity : {this.state.Humidity_R}</Text>
                            </Body>    
                        </CardItem>
                    </Card>
            </Container>
        );
    }
}