import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import DeckCard from "./DeckCard"
import { addCard, getDecks } from "../utils/api"
import { addCardAction } from "../actions/decks"

class AddCard extends Component
{
	state = {
		question: "",
		answer: ""
	}

	handlePress = (e) => {
		if(this.state)
		{
			addCard(this.state.question, this.state.answer, this.props.route.params.deckKey).then(() => {
				this.props.dispatch(addCardAction(this.state.question, this.state.answer, this.props.route.params.deckKey))
				this.props.navigation.pop(1)
			})
		}
	}

	handleChange = (input) => {
		this.setState({question: input})
	}
	handleChange2 = (input) => {
		this.setState({answer: input})
	}

	render()
	{
		const { question, answer } = this.state

		return (
			<View style={styles.center}>
				<Text style={{fontSize: 36, textAlign: "center", marginTop: 20}}>Enter the question and answer:</Text>
				<TextInput
				 style={styles.input}
				 value={question}
				 onChangeText={this.handleChange}
				 placeholder="Enter the question"></TextInput>
				 <TextInput
				 style={styles.input}
				 value={answer}
				 onChangeText={this.handleChange2}
				 placeholder="Enter the answer"></TextInput>
				 <TouchableOpacity onPress={this.handlePress} style={styles.createbtn}>
				 	<Text style={{color: "white"}}>Create Card</Text>
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

export default connect()(AddCard)