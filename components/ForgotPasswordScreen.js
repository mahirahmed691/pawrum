import React, {useState} from 'react';
import { SafeAreaView, TextInput, Text } from 'react-native';
import {  Title, Button } from 'react-native-paper';
import { styles } from '../css/styles';
import { passwordReset} from "../components/Firebase/firebase";

export default function ForgotPasswordScreen(){
    const [email, setEmail] = useState("");
    return(
        <SafeAreaView style={styles.container}>
            <Title style={styles.title}>Forgot your password?</Title>
            <TextInput
            style={styles.input}
            placeholder="Enter registered email"
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
          ></TextInput>
          <Button
              title="Login"
              style={{
                width: "80%",
                height: 42,
                backgroundColor: "black",
                alignSelf: "center",
                borderRadius: 10,
                justifyContent: "center",
                marginBottom: 10,
                marginTop:30,
              }}
              onPress={() => passwordReset(email) }
            ><Text
            style={{
              color: "white",
              textTransform: "none",
            }}
          >
            Reset
          </Text></Button>
        </SafeAreaView>
    )
}