import React, { Component } from 'react';
import {StyleSheet, View, Text, Image, ScrollView, TextInput, Button, TouchableHighlight, ActivityIndicator} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import {connect} from "react-redux";
import { loadBooks, setCurrentList } from "../actions/index";
import store from '../store/index';

class BookTable extends Component {

    static navigationOptions = {
        title: 'Book list',
        headerStyle: { backgroundColor: '#66b9ff' },
        headerTitleStyle: { color: '#FFFFFF', fontSize: 16 },
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            tableHead: ['Cover', 'Title', 'Author'],
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(){

        this.loadList();

    }

    loadList(){

        console.log('load list');

        return fetch('http://mobile.krawczykiewicz.pl:1337/api/books')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({isLoading: false});
                store.dispatch( loadBooks(responseJson.data));
            })
            .catch((error) =>{
                console.error(error);
            });

    }

    handleSearch(query){

        let results = [];

        let re = new RegExp(query.text,"gi");

        this.props.loadedBooks.forEach(function (book) {

            if(book.title.match(re) || book.author.match(re)){

                results.push(book);

            }

        });

        store.dispatch(setCurrentList(results));
    }

    render() {

        let loading = null;

        if(this.state.isLoading){
            loading = <ActivityIndicator size="large" color="#0000ff" />
        }

        if(this.props.navigation.getParam('reload')){
            this.props.navigation.state.params.reload = false;
            this.loadList();
        }

        const makeLinkToBook = (book, obj, isImage) => {

            if(!isImage){
                obj = <Text>{obj}</Text>
            }

            return  <TouchableHighlight onPress={() => this.props.navigation.navigate('Book', {id: book.id})}>{obj}</TouchableHighlight>
        };

        let books = [];

        this.props.currentList.forEach((book) => {

            books.push([
                makeLinkToBook( book, <Image source={{uri: book.image}} style={{width: 50, height:70}}/>, true ),
                makeLinkToBook( book, book.title ),
                makeLinkToBook( book, book.author )
            ]);

        });

        return (
            <View style={styles.container}>
                <TextInput
                    style={{height: 40, paddingLeft:10, marginBottom: 16 }}
                    onChangeText={(text) => this.handleSearch({text})}
                    placeholder="Search by title or author..."
                />

                <Table borderStyle={{borderWidth: 0}} style={{marginBottom: 16}}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.headText} flexArr={[1, 2, 2]}/>
                </Table>

                {loading}

                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{borderWidth: 0, borderColor: '#c8e1ff'}}>
                        {
                            books.map((rowData, index) => (
                                <Row
                                    key={index}
                                    data={rowData}
                                    style={[styles.row, index%2 && {backgroundColor: '#eeeeee'}]}
                                    textStyle={styles.text}
                                    flexArr={[1, 2, 2]}
                                />
                            ))
                        }
                    </Table>
                </ScrollView>

                <Button title="Add a book" color="#30b36d" onPress={() => this.props.navigation.navigate('Form')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    headText:{ fontWeight: "500", textAlign: 'center' },
    text: { textAlign: 'center', fontWeight: '100', fontSize: 10 },
    row: { marginBottom:10, backgroundColor: '#ffffff' }
});

const mapStateToProps = (state) => {
    return {
        loadedBooks: state.loadedBooks,
        currentList: state.currentList
    };
};

export default connect(mapStateToProps)(BookTable);