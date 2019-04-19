/* global fetch, console */
import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Searchbar, BottomNavigation } from "react-native-paper";
import { View } from "native-base";
import Book from "../components/Book";

class BooksRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstQuery: "",
			booksData: [],
			scrollIdx: 0
		};
		this.flatListRef = React.createRef();
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
			})
			.catch(error => {
				console.error(error);
			});
	};

	fetchMoreBooks = function () {
		var newIdx = this.state.scrollIdx + 10;
		this.setState({
			scrollIdx: newIdx
		});
		var queryURL = "https://www.googleapis.com/books/v1/volumes?";
		var query = 'q="' + this.state.firstQuery + '"';
		var type = "&printType=books";
		var lang = '&langRestrict="en"';
		var startIdx = '&startIndex=' + newIdx;

		queryURL += query + type + lang + startIdx;

		fetch(queryURL)
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					booksData: this.state.booksData.concat(responseJson.items)
				});
			})
			.catch(error => {
				console.error(error);
			});
	}

	componentDidMount() {
		this.fetchBooks();
	}

	handleSearch = () => {
		this.flatListRef.scrollToOffset({offset: 0});
		this.fetchBooks();
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
				<FlatList
					ref={(ref) => { this.flatListRef = ref }}
					data={this.state.booksData}
					renderItem={({item}) => <Book book={item} />}
					style={{ marginBottom: 90 }}
					onEndReached={this.fetchMoreBooks.bind(this)}
				/>
			</View>
		);
	}
}
class ClubsRoute extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstQuery: ""
		}
	}
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
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			routes: [
				{ key: "books", title: "Books", icon: "book" },
				{ key: "clubs", title: "Clubs", icon: "people" }
			]
		};
	}

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
