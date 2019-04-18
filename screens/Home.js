/* global fetch, console */
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Searchbar, BottomNavigation } from "react-native-paper";
import { View } from "native-base";
import Book from "../components/Book";
import { ScrollView } from "react-native-gesture-handler";

class BooksRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstQuery: "",
			booksData: []
		};
	}

	fetchBooks = function () {
		var queryURL = "https://www.googleapis.com/books/v1/volumes?";
		var query = 'q="' + this.state.firstQuery + '"';
		var type = "&printType=books";
		var lang = '&langRestrict="en"';
		//var filter = '&filter=full';

		queryURL += query + type + lang;

		fetch(queryURL)
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					booksData: responseJson.items
				});
				console.log(responseJson);
			})
			.catch(error => {
				console.error(error);
			});
		console.log(queryURL);
		//this.setState({ fetch() });
	};

	componentDidMount() {
		this.fetchBooks();
	}

	handleSearch = () => {
		this.fetchBooks();
		//console.log(this.state.booksData);
	}

	render() {
		const { firstQuery } = this.state;
		return (
			<View>
				<View style={styles.searchBar}>
					<Searchbar
						placeholder="Search books"
						onChangeText={query => {
							this.setState({ firstQuery: query });
						}}
						value={firstQuery}
						onSubmitEditing={this.handleSearch}
					/>
				</View>
				<ScrollView style={{ marginBottom: 90 }}>
					{this.state.booksData.map(book => {
						return <Book book={book} />;
					})}
				</ScrollView>
			</View>
		);
	}
}
class ClubsRoute extends Component {
	state = {
		firstQuery: ""
	};
	render() {
		const { firstQuery } = this.state;
		return (
			<View style={styles.searchBar}>
				<Searchbar
					placeholder="Search clubs"
					onChangeText={query => {
						this.setState({ firstQuery: query });
					}}
					value={firstQuery}
				/>
			</View>
		);
	}
}

class HomeScreen extends Component {
	state = {
		index: 0,
		routes: [
			{ key: "books", title: "Books", icon: "book" },
			{ key: "clubs", title: "Clubs", icon: "people" }
		]
	};

	_handleIndexChange = index => this.setState({ index });

	_renderScene = BottomNavigation.SceneMap({
		books: BooksRoute,
		clubs: ClubsRoute
	});

	render() {
		return (
			<BottomNavigation
				theme={{
					colors: {
						primary: "#FFFFFF"
					}
				}}
				navigationState={this.state}
				onIndexChange={this._handleIndexChange}
				renderScene={this._renderScene}
			/>
		);
	}
}

const styles = StyleSheet.create({
	searchBar: {
		padding: 20
	}
});

export default HomeScreen;
