import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import DeckCard from "./DeckCard"
import { formatDeck, createDeck, deleteDeck, clearLocalNotification, setLocalNotification } from "../utils/api"
import { addDeckAction, deleteDeckAction } from "../actions/decks"

class Quiz extends Component
{
	state = {
		questions: null,
		correct: 0,
		incorrect: 0,
		showAnswer: false
	}

	componentDidMount()
	{
		const questions = this.props.route.params.deck.questions
		this.setState({
			questions: questions
		})

		clearLocalNotification().then(setLocalNotification())
	}
	
	showAnswer = (e) => {
		this.setState({
			showAnswer: !this.state.showAnswer
		})
	}

	removeQuestion = (inc1, inc2) => {
		let questions = this.state.questions
		questions = questions.slice(1)

		this.setState({
			questions: questions
		})

		if(questions.length <= 0)
		{
			this.props.navigation.navigate("ScoreScreen", {
				deck: this.props.route.params.deck,
				correct: this.state.correct + inc1,
				incorrect: this.state.incorrect + inc2
			})
		}
	}

	correct = (e) => {
		this.setState({
			correct: this.state.correct + 1
		})

		this.removeQuestion(1, 0)
	}

	incorrect = (e) => {
		this.setState({
			incorrect: this.state.incorrect + 1
		})

		this.removeQuestion(0, 1)
	}

	render()
	{
		const { deck } = this.props.route.params

		if(!this.state.questions)
			return (<Text>There are no questions in this deck. Please add a question and try again!</Text>)
		else if (this.state.questions.length <= 0)
		{
			return (<Text>There are no questions in this deck. Please add a question and try again!</Text>)
		}

		const { question, answer } = this.state.questions[0]
		const { showAnswer } = this.state

		return (
			<View style={styles.center}>
				<Text style={{fontSize: 36, textAlign: "center", marginTop: 20}}>{deck.title}</Text>
				<Text style={{fontSize: 18, textAlign: "center"}}>{this.state.questions.length} cards remaining</Text>
				<View style={styles.box}>
					<Text style={{fontSize: 24, textAlign: "center", marginTop: 0}}>{!showAnswer ? question : answer}</Text>
				</View>
				 <TouchableOpacity onPress={this.showAnswer} style={[styles.createbtn, {marginTop: 80}]}>
				 	<Text style={{color: "white"}}>{!showAnswer ? "Show Answer" : "Show Question"}</Text>
				 </TouchableOpacity>
				 <TouchableOpacity onPress={this.correct} style={[styles.createbtn, {backgroundColor: "green"}]}>
				 	<Text style={{color: "white"}}>Correct</Text>
				 </TouchableOpacity>
				 <TouchableOpacity onPress={this.incorrect} style={[styles.createbtn, {backgroundColor: "darkred"}]}>
				 	<Text style={{color: "white"}}>Incorrect</Text>
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
	box: {
		backgroundColor: "lightgrey",
		justifyContent: "center",
		flex: 0.5,
		alignSelf: "stretch",
		margin: 10

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
		marginTop: 20,
		width: 150,
		alignItems: "center"
	}
})

export default connect()(Quiz)