import React, { Component } from 'react';
import {connect} from "react-redux";
import {StyleSheet, View, Image, ScrollView, Button, Text, ActivityIndicator} from 'react-native';
import {loadBook} from "../actions/index";
import store from '../store/index';

class Book extends Component {

    static navigationOptions = {
        title: 'Book',
        headerStyle: { backgroundColor: '#66b9ff' },
        headerTitleStyle: { color: '#FFFFFF', fontSize: 16 },
        headerTintColor: '#FFFFFF'
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };
    }

    componentDidMount() {

        return fetch('http://mobile.krawczykiewicz.pl:1337/api/books/'+this.props.navigation.getParam('id'))
            .then((response) => response.json())
            .then((responseJson) => {
                store.dispatch( loadBook(responseJson.data));
                this.setState({isLoading: false});
            })
            .catch((error) =>{
                console.error(error);
            });

    }

    render() {

        const image = () => {
            return <Image source={{uri: this.props.book.image}}  style={{width: '100%', height: 300}} />
        };

        let loading = null;
        if(this.state.isLoading){
            loading = <ActivityIndicator size="large" color="#0000ff" />
        }

        return (
            <View style={styles.container}>

                {loading}

                <ScrollView style={loading ? {display: 'none'} : null}>
                    <View style={{flexDirection: 'row', marginBottom: 20}}>
                        <View style={{width: '50%', height:'100%'}}>
                            {image()}
                        </View>
                        <View style={{width: '50%', height:'100%', paddingLeft:20}}>

                            <Text style={styles.detailName}>Title</Text>
                            <Text style={styles.detailValue}>{this.props.book.title}</Text>

                            <Text style={styles.detailName}>Description</Text>
                            <Text style={styles.detailValue}>{this.props.book.description}</Text>

                            <Text style={styles.detailName}>Author</Text>
                            <Text style={styles.detailValue}>{this.props.book.author}</Text>

                            <Text style={styles.detailName}>Release date</Text>
                            <Text style={styles.detailValue}>{this.props.book.released}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={loading ? {display: 'none'} : null}>
                    <View style={{flexDirection: 'row', marginBottom:20}}>

                        <View style={{width: '50%', paddingRight: 5}}>
                            <Button title="Edit" color="#63B5EE" onPress={() => this.props.navigation.navigate('Form', {id : this.props.book.id })}/>
                        </View>

                        <View style={{width: '50%', paddingLeft: 5}}>
                            <Button title="Remove" color="#EE575A" onPress={() => this.props.navigation.navigate('Remove', {id : this.props.book.id })}/>
                        </View>

                    </View>
                </View>


                <Button title="Back to list" color="#30b36d"
                        onPress={() =>
                            this.props.navigation.navigate('Table', { reload : true })
                        }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#537791' },
    detailName: { fontWeight: '500', fontSize: 16 },
    detailValue: { fontWeight: '500', color:'#000', marginBottom: 20}
});

const mapStateToProps = (state) => {
    return {
        book: state.book
    };
};

export default connect(mapStateToProps)(Book);