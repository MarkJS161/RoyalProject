import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { Header, 
        Container, 
        Content, 
        Card, 
        CardItem, 
        Button, 
        Left, 
        Body, 
        Right, 
        Title,
        Text,
        Icon,
        Thumbnail } from 'native-base';
import firebase from 'firebase';
import FirebaseConfig from '../FirebaseConfig';
import MapScreen from '../MapTrack/MapScreen';
import background from '../../img/poly-background.jpg';

const itemsRef = firebase.database().ref('Realtime');
const { width, height } = Dimensions.get("window");

export default class HomeScreen extends Component {

    state = {
        licenseData: []
    }

    componentDidMount(){
        itemsRef.on('value', snapshot => {
            var finished = [];            
            snapshot.forEach(function(data){
                finished.push({
                    licensePlate: data.key,
                    temperature: data.val().temperature,
                    humidity: data.val().humidity
                });
            })
            this.setState({licenseData: finished})
        })
    }

    render(){
        return (
            <Container>
                <Header style={{backgroundColor: 'rgba(44, 62, 80, 1.0)'}}>
                    <Body style = {{justifyContent: 'center'}}>
                        <Title style={{fontSize: 20}}> Overview </Title>
                    </Body>
                    <Right>
                    <Button transparent onPress ={() => firebase.auth().signOut()}>
                            <Icon name='md-log-out' />
                        </Button>
                    </Right>
                </Header>
                    <Content>
                        {
                            this.state.licenseData.map((item, index) =>{
                                return (
                                    <Card key= {index}>
                                        <CardItem header style={{backgroundColor: '#97CE68', height: 70}} >
                                            <Thumbnail square small source={require('../../img/truck-delivery-icon.png')}
                                            style ={{alignSelf: 'center'}}/>
                                            <Body>
                                                <Text style={{justifyContent: 'center', fontSize: 16}}>    หมายเลขทะเบียนรถ :</Text>
                                                <Text note style={{color: 'black'}}>    {item.licensePlate} </Text>
                                            </Body>
                                        </CardItem>
                                        <CardItem>
                                            <Body>
                                                <CardItem>
                                                    <Icon name = 'ios-water' style={{color: 'blue', justifyContent: 'center'}} />
                                                    <Text style = {{fontSize: 15}}> Temperature : {item.temperature} </Text>
                                                </CardItem>
                                            </Body>
                                            <Body>
                                                <CardItem>
                                                    <Icon name = 'ios-snow' style={{color: 'gray', justifyContent: 'center' }} />
                                                    <Text style = {{fontSize: 15}}> Humidity : {item.humidity} </Text>
                                                </CardItem>
                                            </Body>
                                        </CardItem>
                                        <CardItem button 
                                        style={{backgroundColor: '#F6CD61', justifyContent: 'center', height: 40}} 
                                        onPress={() => this.props.navigation.navigate('MapScreen', {license: item.licensePlate})}>
                                            <Icon name = 'ios-pin'/>
                                            <Text style={{fontSize: 15}}>View more</Text>
                                        </CardItem>
                                    </Card>
                                )
                            })
                        }
                    </Content>        
            </Container>
        );
    }
}
