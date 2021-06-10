import React,{Component} from 'react';
import {View, TextInupt, Image, Alert,TouchableOpacity, Text, StyleSheet, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from "../config.js";

export default class LoginScreen extends Component{
    constructor(){
        super()
        this.state={
            emailId:"",
            password:"",
            firstname:"",
            lastname:"",
            address:"",
            confirmpassword:"",
            phonenumber:"",
            isModalVisible:false
        }
    }
//creating the sign up function
signup=(emailId,password,confirmpassword)=>{
    if(password !== confirmpassword){
        return Alert.alert("Password doesn't match, re-enter it again")
    }
    //if both the password same we need to update the database with current user details
    else{
 //add new user email and password in authentication       
firebase.auth().createUserWithEmailAndPassword(emailId,password)
//add all information of current user in 'users' collection 
.then(()=>{
    db.collection("users").add({
        "first_name":this.state.firstname,
        "last_name":this.state.lastname,
        "address":this.state.address,
        "email":this.state.emailId,
        "password":this.state.password,
        "confirm_password":this.state.confirmpassword,
        "phone_number":this.state.phonenumber
      
    })
    return Alert.alert("successfully signed up"," ",[{text:'ok',onPress:()=>this.setState({isModalVisible:false})}])
})
//handle errors
.catch((error)=>{
var errorcode=error.code;
var errormsg=error.message;
return Alert.alert(errormsg)
})
    }
}


login=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password)
    .then(()=>{
        this.props.navigation.navigate("DonateBooks")
    })
    .catch((error)=>{
        var errorcode=error.code;
        var errormsg=error.message;
        return Alert.alert(errormsg)

    })

}
//display the Modal form
showModal=()=>{
    return(
<Modal animationType="fade" transparent={true} visible={this.state.isModalVisible}>
<View style={styles.modalContainer}>
<ScrollView style={{width:'100%'}}>
<KeyboardAvoidingView style={styles.keyboardAviodingView}>
<Text style={styles.modalTitle}> Sign Up Form</Text>
<TextInput style={styles.formTextInput}
placeholder="First Name"
maxLength={12}
onChangeText={(text)=>{
    this.setState({firstname:text})
}}
></TextInput>
<TextInput style={styles.formTextInput}
placeholder="Last Name"
maxLength={15}
onChangeText={(text)=>{
    this.setState({lastname:text})
}}
></TextInput>
<TextInput style={styles.formTextInput}
placeholder="Contact Number"
maxLength={12}
keyboardType={'numeric'}
onChangeText={(text)=>{
    this.setState({phonenumber:text})
}}
></TextInput>
<TextInput
          style={styles.formTextInput}
          placeholder ={"Address"}
          multiline = {true}
          onChangeText={(text)=>{
            this.setState({
              address: text
            })
          }}
        />
        <TextInput
          style={styles.formTextInput}
          placeholder ={"Email"}
          keyboardType ={'email-address'}
          onChangeText={(text)=>{
            this.setState({
              emailId: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              password: text
            })
          }}
        /><TextInput
          style={styles.formTextInput}
          placeholder ={"Confrim Password"}
          secureTextEntry = {true}
          onChangeText={(text)=>{
            this.setState({
              confirmPassword: text
            })
          }}
        />
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.signup(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
        </View>


</KeyboardAvoidingView>
</ScrollView>
</View>
</Modal>
    )

}


    render(){
        return(
            <View>
                <View style={{justifyContent: 'center',alignItems: 'center'}}>

</View>
  {
    this.showModal()
  }
                
            <Text style={style.title}>Book Santa</Text>
            <TextInput
            style={styles.loginbox}
            placeholder="abc@email.com"
            keyboardType="email-address"
            onChangeText={(text)=>{
                this.setState({
                    emailId:text
                }

                )
            }}
            />
            <TextInput
            style={styles.loginbox}
            placeholder='password'
            secureTextEntry={true}
            onChangeText={(text)=>{
                this.setState({
                    password:text
                })
            }}
            />
            <TouchableOpacity style={styles.button} onPress={this.login(this.state.emailId,this.state.password)}>
            <Text>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={this.signup({isModalVisible: true})}>

            </TouchableOpacity>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })