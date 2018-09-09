/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import store from './store/';

import BookTable from './components/BookTable';
import Book from './components/Book';
import BookForm from "./components/BookForm";
import BookRemove from "./components/BookRemove";

const RootStack = createStackNavigator(
    {
        Table: BookTable,
        Book: Book,
        Form: BookForm,
        Remove: BookRemove
    },
    {
        initialRouteName: 'Table',
    }
);

export default class App extends Component {
    render() {
        console.disableYellowBox = true;
        return (
            <Provider store={store}>
                <RootStack/>
            </Provider>
        );
    }
}

    /*
    export default class App extends Component {

        constructor() {
            super();

            this.state = {
                page: 'list',
                header: 'Book list',
                bookId: null
            }
        }

        onBookPress = (bookId) => {

            this.setState({
                page: 'book',
                bookId: bookId,
                header: 'Book page'
            });


        };

        onBackToList = () => {

            console.log('on back press');

            this.setState({
                page: 'list',
                header: 'Book list',
                bookId: null
            });

        };

        onAddForm = () => {

            console.log('on add form');

            this.setState({
                page: 'form',
                header: 'Add a book',
                bookId: null
            });

        };

        onEditForm = (bookId) => {

            console.log('on edit form', bookId);

            this.setState({
                page: 'form',
                header: 'Edit book',
                bookId: bookId
            });

        };

        onRemove = (bookId) => {

            console.log('on remove', bookId);

            this.setState({
                page: 'remove',
                header: 'Remove book',
                bookId: bookId
            });

        };

        handleBackPress = () => {

            this.setState({
                page: 'list',
                header: 'Book list',
                bookId: null
            });
            return true;
        };

        render() {
            console.disableYellowBox = true;

            let page = null;

            if(this.state.page === 'book'){

                page = <Book
                    bookId={this.state.bookId}
                    onEditForm={this.onEditForm}
                    onRemove={this.onRemove}
                    onBackToList={this.onBackToList}
                    handleBackPress={this.handleBackPress}
                />

            }else if(this.state.page === 'form'){

                page = <BookForm
                    bookId={this.state.bookId}
                    onBackToList={this.onBackToList}
                    handleBackPress={this.handleBackPress}
                />

            }else if(this.state.page === 'remove'){

                page = <BookRemove
                    bookId={this.state.bookId}
                    onBackToList={this.onBackToList}
                    handleBackPress={this.handleBackPress}
                />

            }else{

                page = <BookTable
                    onAddForm={this.onAddForm}
                    onBookPress={this.onBookPress}
                />

            }

            return (
                <Provider store={store}>
                    <View style={styles.container}>
                        <StatusBar
                            backgroundColor="#66b9ff"
                            barStyle="light-content"
                        />
                        <Header text={this.state.header} />
                        {page}
                    </View>
                </Provider>
            );
        }
    }
    */