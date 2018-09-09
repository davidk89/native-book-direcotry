import {Component} from "react";
import React from "react";
import axios from "axios";
import {loadBook} from "../actions/index";
import store from '../store/index';
import connect from "react-redux/es/connect/connect";
import {Button, ScrollView, StyleSheet, Text, View} from "react-native";

class BookRemove extends Component {

    static navigationOptions = {
        title: 'Remove the book',
        headerStyle: { backgroundColor: '#66b9ff' },
        headerTitleStyle: { color: '#FFFFFF', fontSize: 16 },
        headerTintColor: '#FFFFFF'
    };

    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        };

        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.callApi()
            .then(res => store.dispatch(loadBook(res.data)))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        return fetch('http://mobile.krawczykiewicz.pl:1337/api/books/' + this.props.navigation.getParam('id'))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.props.navigation.navigate('Table', { reload : true });
                }
            })
            .catch(err => console.log(err));
    };

    handleRemove() {

        axios.delete('http://mobile.krawczykiewicz.pl:1337/api/books/' + this.props.book.id)
            .then((result) => {
                this.props.navigation.navigate('Table', { reload : true });
            })
            .catch(err => console.log(err));

    }

    render() {

        return (

            <View style={styles.container}>
                <ScrollView style={styles.dataWrapper}>

                    <Text style={styles.text}>Are you sure that you want to remove {this.props.book.title}?</Text>

                    <Button title="Yes, remove" color="#EE575A" onPress={() => this.handleRemove()}/>

                </ScrollView>

                <Button title="Back to list" color="#30b36d" onPress={() => this.props.navigation.navigate('Table')}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    content: {flex: 1, padding: 16},
    text: {marginBottom: 20},
    bottomView: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },

});

const mapStateToProps = (state) => {
    return {
        book: state.book
    };
};

export default connect(mapStateToProps)(BookRemove);