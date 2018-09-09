import React, { Component } from 'react';
import {StyleSheet, View, TextInput, Button, Text, DatePickerAndroid, ScrollView} from 'react-native';
import moment from 'moment';
import axios from 'axios';

export default class BookForm extends Component {

    static navigationOptions = {
        title: 'Book Form',
        headerStyle: { backgroundColor: '#66b9ff' },
        headerTitleStyle: { color: '#FFFFFF', fontSize: 16 },
        headerTintColor: '#FFFFFF'
    };

    constructor(props) {
        super(props);

        this.state = {
            book: {
                released: new Date(),
                image: 'http://www.publio.pl/files/product/card/5f/b4/b3/110475-zarzadzanie-i-informatyka-jerzy-kisielnicki-1.jpg'
            },

        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){

        if(this.props.navigation.getParam('id')) {

            return fetch('http://mobile.krawczykiewicz.pl:1337/api/books/' + this.props.navigation.getParam('id'))
                .then((response) => response.json())
                .then((responseJson) => {

                    let book = responseJson.data;
                    book.released = new Date(book.released);

                    this.setState({
                        isLoading: false,
                        book: book
                    });

                })
                .catch((error) => {
                    console.error(error);
                });

        }
    }

    showAndroidDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.book.released
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                var date = new Date(year, month, day);
                let book = this.state.book;
                book.released = date;
                this.setState({book});
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    };

    handleTitleChange(event) {

        let book = Object.assign({}, this.state.book);
        book.title = event.text;
        this.setState({book});

    };

    handleAuthorChange(event) {
        let book = Object.assign({}, this.state.book);
        book.author = event.text;
        this.setState({book});
    };

    handleDescriptionChange(event) {
        let book = Object.assign({}, this.state.book);
        book.description = event.text;
        this.setState({book});
    };

    handleSubmit() {

        if(this.state.book.id){

            console.log('update', this.state.book.id, this.state.book);

            axios.put('http://mobile.krawczykiewicz.pl:1337/api/books/'+this.state.book.id, this.state.book)
                .then((result) => {
                    return this.props.navigation.navigate('Table', { reload : true });
                })
                .catch(err => console.log(err));

        }else{

            console.log('create', this.state.book);

            axios.post('http://mobile.krawczykiewicz.pl:1337/api/books', this.state.book)
                .then((result) => {
                    return this.props.navigation.navigate('Table', { reload : true });
                })
                .catch(err => console.log(err));

        }

    };

    render() {

        return (

            <View style={styles.container}>
                <ScrollView>
                    <Text>Title</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.handleTitleChange({text})}
                        value={ this.state.book.title }
                    />

                    <Text>Description</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.handleDescriptionChange({text})}
                        value={this.state.book.description}
                        multiline = {true}
                        numberOfLines = {4}
                    />

                    <Text>Author</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => this.handleAuthorChange({text})}
                        value={this.state.book.author}
                    />

                    <Text>Release date</Text>
                    <TextInput
                        style={styles.input}
                        onFocus={this.showAndroidDatePicker}
                        value={moment(this.state.book.released).format('YYYY-MM-DD')}
                    />


                    <View style={{marginBottom: 20}}>
                        <Button title="Save" color="#63B5EE" onPress={() => this.handleSubmit()}/>
                    </View>

                </ScrollView>

                <Button title="Back to list" color="#30b36d" onPress={() => this.props.navigation.navigate('Table')}/>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    input: {marginBottom: 20}

});