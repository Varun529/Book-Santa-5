import React,{Component} from 'react';
import {View,Text,TouchableOpacity,TextInput,KeyboardAvoidingView,StyleSheet} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/Myheader.js';

export default class BookRequestScreen extends Component{
constructor(){
    super();
    this.state={
        userId:firebase.auth().currentUser.email,
        bookName:"",
        authorName:"",
        reasonToRequest:""
    }
}


//helps to create new requests in database against the current user
addRequest=(bookName,reasonToRequest)=>{
    var userId=this.state.userId
    var requestId= Math.random().toString(36).substring(7);
    db.collection("requestedBooks").add({
        'user_id':this.state.userId,
        'book_name':this.state.bookName,
        'reason_to_request':this.state.reasonToRequest,
        'author_name':this.state.authorName,
        "request_id":requestId
    })
    this.setState({
        bookName:"",
        authorName:"",
        reasonToRequest:""
    })
    return Alert.alert("Successfully requested")
}



    render(){
        return(
            <View style={{flex:1}}>
                <MyHeader title="Request your Book"/>
                <KeyboardAvoidingView style={StyleSheet.keyboardstyle}>
                    <TextInput
                    style={styles.form}
                    placeholder="enter the book name"
                    onChangeText={(text)=>{
                        this.setState({
                            bookName:text
                        })
                    }}
                    value={this.state.bookName}
                    />
                    <TextInput
                    style={styles.form}
                    placeholder="enter the author's name"
                    onChangeText={(text)=>{
                        this.setState({
                            authorName:text
                        })
                    }}
                    value={this.state.authorName}
                    />
                    <TextInput
                    style={styles.form}
                    multiline
                    numberOfLines={10}
                    placeholder="please add the reason for your request"
                    onChangeText={(text)=>{
                        this.setState({
                            reasonToRequest:text
                        })
                    }}
                    value={this.state.reasonToRequest}
                    />
                    <TouchableOpacity style={styles.button} onPress={()=>{
                        this.addRequest(this.state.bookName, this.state.reasonToRequest)
                    }}>
                    <Text>Submit</Text>


                    </TouchableOpacity>

                </KeyboardAvoidingView>

            </View>

        )
    }
}

const  styles=StyleSheet.create({
    keyboardstyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    form:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        
    },

})