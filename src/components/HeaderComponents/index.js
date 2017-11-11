import React from 'react';
import { Text, Image } from "react-native";
import { Header, Left, Right, Body, Button } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './HeaderComponentStyles';

export const HeaderComponent =  ({logo})=>{
	return (
		<Header style={{backgroundColor:"#FF5E3A"}} iosBarStyle="light-content">
			<Left>
				<Button transparent>
					<Icon name="arrow-left" style={styles.icon} />
				</Button>
			</Left>
			<Body>
				{	logo &&
					<Image resizeMode="contain" style={styles.logo} source={logo}/>
					||
					<Text style={styles.headerText}>Driver on the way</Text>
				}
			</Body>
			<Right>
				<Button transparent>
					<Icon name="Bar" style={styles.icon} />
				</Button>
			</Right>
		</Header>
	);
}

export default HeaderComponent;