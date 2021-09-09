import React from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { TextInput, IconButton, Button } from 'react-native-paper';
import { styles } from '../css/styles';
import {auth} from '../components/Firebase/firebase'



export default function EditProfile(props){

    return(
        <SafeAreaView style={styles.container1}>  
                
                <View style={{alignItems:'center', flexDirection:'row', justifyContent:'space-between'}}>
                    <IconButton icon="chevron-left" color="black"
                        onPress={() => props.navigation.goBack()}
                    />
                    <Button color="black">Save</Button>
                </View>
                <ScrollView style={{marginBottom:50}}>
                <View style={{marginTop:50}}>  
                    <IconButton icon="camera" size={40} style={{width:"100%", height:"30%", backgroundColor:"whitesmoke", borderRadius:0, margin:0, marginBottom:30}} />
                    <TextInput 
                        label="Creation Date"
                        mode="flat"
                        value={auth.currentUser ? auth.currentUser.metadata.creationTime : "unknown user"}
                        editable="false"
                        />  
                    <TextInput 
                        label="Last Sign In"
                        mode="flat"
                        value={auth.currentUser ? auth.currentUser.metadata.lastSignInTime : "unknown user"}
                        editable="false"
                        />
                    <TextInput 
                        label="Email Verified"
                        mode="flat"
                        value={auth.currentUser ? auth.currentUser.emailVerified.toString() : "unknown user"}
                        editable="false"
                        />
                    <TextInput 
                        label="email"
                        mode="flat"
                        value={auth.currentUser ? auth.currentUser.email : "unknown user"}
                        editable="false"
                        />   

                    <TextInput 
                        label="phone"
                        mode="flat"
                        placeholder="+44"
                        value={auth.currentUser ? auth.currentUser.phoneNumber : "+44"}
                        />  
                    <Text style={{color:'black', textAlign:'justify', margin:5,}}>Adding a phone number allows us to send you text notifications. 
                          Your number is not displayed publicly.</Text>

               </View>    
               </ScrollView> 
        </SafeAreaView>
    )
}