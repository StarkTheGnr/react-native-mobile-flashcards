import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import DeckCard from "./DeckCard"
import { formatDeck, createDeck, deleteDeck } from "../utils/api"
import { addDeckAction, deleteDeckAction } from "../actions/decks"

class DeckInfo extends Component
{
	addCard = (e) => {
		this.props.navigation.navigate("AddCard", {
			deckKey: this.props.route.params.deckKey
		})
	}

	openQuiz = (e) => {
		this.props.navigation.navigate("Quiz", {
			deck: this.props.deck
		})
	}

	deleteDeck = (e) => {
		deleteDeck(this.props.route.params.deckKey).then(() => {
			this.props.dispatch(deleteDeckAction(this.props.route.params.deckKey))
			this.props.navigation.pop(10)
		})	
	}

	render()
	{
		const { deck } = this.props

		if(!deck)
			return <Text>No Deck</Text>

		return (
			<View style={styles.center}>
				<Text style={{fontSize: 36, textAlign: "center", marginTop: 20}}>{deck.title}</Text>
				<Text style={{fontSize: 18, textAlign: "center"}}>{deck.questions.length} cards</Text>
				 <TouchableOpacity onPress={this.addCard} style={[styles.createbtn, {marginTop: 80}]}>
				 	<Text style={{color: "white"}}>Add Card</Text>
				 </TouchableOpacity>
				 <TouchableOpacity onPress={this.openQuiz} style={styles.createbtn}>
				 	<Text style={{color: "white"}}>Start Quiz</Text>
				 </TouchableOpacity>
				 <TouchableOpacity onPress={this.deleteDeck} style={styles.createbtn}>
				 	<Text style={{color: "white"}}>Delete Deck</Text>
				 </TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	center: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		padding: 5
	},
	input: {
		backgroundColor: "white",
		alignSelf: "stretch",
		margin: 20,
		borderRadius: 5,
		elevation: 5,
		padding: 5,
		marginTop: 40
	},
	createbtn: {
		backgroundColor: "#261d66",
		padding: 20,
		marginTop: 20
	}
})

function mapStateToProps({ decks }, props)
{
	const deckKey = props.route.params.deckKey

	return {
		deck: decks[deckKey]
	}
}

export default connect(mapStateToProps)(DeckInfo)