import { AsyncStorage } from "react-native"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"

const DECK_STORAGE_KEY = "MobileFlashcard:decks"
const NOTIFICATION_KEY = "MobileFlashcards:notifications"

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function createDeck(deck)
{
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ ...deck }))
}

export function deleteDeck(deckKey)
{
	return getDecks().then((results) => {
		delete results[deckKey]
		AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({ ...results }))
	})
}

export function deleteAll()
{
	AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify({ }))
}

export function getDecks()
{
	return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
		if(!results)
			return {}

		return JSON.parse(results)
	})
}

export function addCard(question, answer, key)
{
	return getDecks().then((results) => {
		console.log("RESULTS", results, key)
		AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
			[key]: {
				...results[key],
				questions: results[key].questions.concat({
					question: question,
					answer: answer
				})
			}
		}))
	})
}

export function formatDeck(title)
{
	const key = generateUID()

	return {
		[key]: {
			key,
			title,
			questions: []
		}
	}
}

export function clearLocalNotification()
{
	return AsyncStorage.removeItem(NOTIFICATION_KEY)
	.then(Notifications.cancelAllScheduledNotificationsAsync)
}


export function setLocalNotification()
{
	AsyncStorage.getItem(NOTIFICATION_KEY)
	.then(JSON.parse)
	.then((data) => {
		if (data === null)
		{
			Notifications.requestPermissionsAsync(null)
			.then(({ status }) => {
				if (status === "granted")
					Notifications.cancelAllScheduledNotificationsAsync()

				let tomorrow = new Date()
				tomorrow.setDate(tomorrow.getDate() + 1)
				tomorrow.setHours(20)
				tomorrow.setMinutes(0)

				Notifications.setNotificationHandler({
				  handleNotification: async () => ({
				    shouldShowAlert: true,
				    shouldPlaySound: true,
				    shouldSetBadge: false,
				  }),
				});

				Notifications.scheduleNotificationAsync(
					{
					content: {
						title: "You haven't studied today",
						body: "Knowledge is power! So, come power up by taking a quiz!"
					}, 
					trigger: {
						hour: 20,
						minute: 0,
						repeats: true
					}
				})

				AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
			})
		}
	})
}