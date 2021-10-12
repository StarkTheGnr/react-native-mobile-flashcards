import React, { Component } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect } from 'react-redux'
import DeckCard from "./DeckCard"
import Decks from "./Decks"
import AddDeck from "./AddDeck"
import DeckInfo from "./DeckInfo"
import AddCard from "./AddCard"
import Quiz from "./Quiz"
import ScoreScreen from "./ScoreScreen"

const Stack = createNativeStackNavigator()

class Home extends Component
{
	render()
	{
		return (
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Deck"  component={Decks} />
				<Stack.Screen name="DeckInfo"  component={DeckInfo} />
				<Stack.Screen name="AddCard"  component={AddCard} />
				<Stack.Screen name="Quiz"  component={Quiz} />
				<Stack.Screen name="ScoreScreen"  component={ScoreScreen} />
			</Stack.Navigator>
		)
	}
}

export default connect()(Home)