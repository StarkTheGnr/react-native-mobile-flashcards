import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import DeckCard from "./DeckCard"
import { formatDeck, createDeck, getDecks } from "../utils/api"
import { addDeckAction } from "../actions/decks"

class AddDeck extends Component
{
	state = {
		decktitle: ""
	}

	handlePress = (e) => {
		if(this.state)
		{
			const deck = formatDeck(this.state.decktitle)

			createDeck(deck).then(() => {
				this.props.dispatch(addDeckAction(deck))
				this.setState({decktitle: ""})
				this.props.navigation.navigate("Decks")
				this.props.navigation.navigate("DeckInfo", {
					deckKey: Object.keys(deck)[0]
				})
			})
		}
	}

	handleChange = (input) => {
		this.setState({decktitle: input})
	}

	render()
	{
		const { decktitle } = this.state

		return (
			<View style={styles.center}>
				<Text style={{fontSize: 36, textAlign: "center", marginTop: 20}}>What is the title of your new deck?</Text>
				<TextInput
				 style={styles.input}
				 value={decktitle}
				 onChangeText={this.handleChange}></TextInput>
				 <TouchableOpacity onPress={this.handlePress} style={styles.createbtn}>
				 	<Text style={{color: "white"}}>Create Deck</Text>
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

export default connect()(AddDeck)