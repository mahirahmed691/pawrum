import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text} from 'react-native';
import header from "./header.js";
import navBar from "./navBar.js";
import { styles } from "../css/styles.js";
import productJSON from '../utils/products'
import { Button, Title } from 'react-native-paper';
import { Icon } from 'react-native-elements';

export default function Store(props){
    return(
        <SafeAreaView style={styles.container}>  
            <Title style={{marginTop:40, paddingBottom:0, marginLeft:10, fontWeight:'bold', fontFamily:'Avenir-Book'}}> <Icon name="store"/> Marketplace</Title>
            <ScrollView style={{marginTop:0, marginBottom:30}}> 
            
             {    
               Object.entries(productJSON).map(([key, value]) =>{
                       return(     
                            <View style={{backgroundColor:"#33cc99", margin:8, borderRadius:10, flexDirection:"row"}}  key={key}>
                              <Image 
                              style={{ resizeMode:"cover", width:"45%", height:120, borderTopLeftRadius:10, borderBottomLeftRadius:10, alignSelf:'flex-start', marginTop:0}} 
                              source={require('../assets/dog.jpg')}/>
                              <View style={{justifyContent:'space-around', alignContent:'center'}}>
                                    <Text style={{marginLeft:20, color:'whitesmoke', fontWeight:"bold"}}>{value.title}</Text>
                                    <Text style={{marginLeft:20, color:'whitesmoke', fontWeight:"bold"}}>{value.category}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:"pink", marginRight:30, marginLeft:20, fontWeight:"bold"}}>£{value.price}</Text>
                                    <Button labelStyle={{ fontSize: 10, color:'black' }} style={{width:100, backgroundColor:'whitesmoke'}} mode="flat">Buy Now</Button>
                                </View>
                             </View>
                            </View>                          
                       )
                   }) 
              }
            </ScrollView>
            {header(props)}
            {navBar(props)}

        </SafeAreaView>
    );
}