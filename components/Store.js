import * as React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text} from 'react-native';
import { styles } from "../css/styles.js";
import productJSON from '../utils/products'
import { ApplePayButton, useApplePay } from '@stripe/stripe-react-native';
import { Button, Title, IconButton, DataTable } from 'react-native-paper';

import { Icon } from 'react-native-elements';

import { ScreenWidth } from 'react-native-elements/dist/helpers';
const optionsPerPage = [2, 3, 4];


export default function Store(props){


    const [count, setCount] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);


    // Payment
    const { presentApplePay, isApplePaySupported } = useApplePay();

    React.useEffect(() => {
        setPage(0);
      }, [itemsPerPage]);

    const pay = async () => {
          if (!isApplePaySupported) return;
          // ...
          const { error } = await presentApplePay({
            cartItems: [{ label: 'Example item name', amount: '14.00' }],
            country: 'US',
            currency: 'GBP',
            shippingMethods: [
              {
                amount: '20.00',
                identifier: 'DPS',
                label: 'Courier',
                detail: 'Delivery',
                type: 'final',
              },
            ],
            requiredShippingAddressFields: ['emailAddress', 'phoneNumber'],
            requiredBillingContactFields: ['phoneNumber', 'name'],
          });
          if (error) {
            // handle error
          }
    };
       

    
    return(
        <SafeAreaView>  
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', margin:10}}>
                <IconButton icon="chevron-left" onPress={() => props.navigation.goBack()}/>
                <Icon color="black" name="more-horizontal" type='feather'/>
            </View>
            <Title style={{ paddingBottom:0, marginBottom:20, marginLeft:10, fontWeight:'bold', fontFamily:'Avenir'}}> <Icon name="store"/> Marketplace</Title>
            <ScrollView horizontal backgroundColor="#dde2e3">
                <IconButton icon="fire" color="orangered"/>
                <IconButton icon="arrow-up"/>
            </ScrollView>
            <ScrollView style={{height:"70%"}}> 
            
             {    
               Object.entries(productJSON).map(([key, value]) =>{
                       return(     
                            <View style={{margin:8, borderRadius:10, flexDirection:"row"}}  key={key}>
                              <Image 
                              style={{ resizeMode:"cover", width:"45%", height:120, borderTopLeftRadius:10, borderBottomLeftRadius:10, alignSelf:'flex-start', marginTop:0}} 
                              source={require('../assets/food.jpeg')}/>
                              <View style={{justifyContent:'space-around', alignSelf:'center'}}>
                                    <Text style={{marginLeft:20, color:'#111', marginVertical:10, fontWeight:"bold", fontFamily:'Avenir'}}>{value.title}</Text>
                                    <Text style={{marginLeft:20, color:'#999', marginVertical:5, fontWeight:"bold"}}>{value.category}</Text>
                                <View style={{flexDirection:'row', alignSelf:'flex-start'}}>
                                    <Text style={{color:"#9595ff", marginRight:30, marginLeft:20, fontWeight:"bold"}}>£{value.price}</Text>
                                    <View style={{alignItems:'center', flexDirection:'row'}}>
                                        <IconButton size={15} style={{backgroundColor:"black"}} color="white" onPress={() => setCount(count - 1)} icon="minus"/>
                                            <Text style={{padding:3}}>{count}</Text>
                                        <IconButton size={15} style={{backgroundColor:"black"}} color="white" onPress={() => setCount(count + 1)} icon="plus"/>
                                    </View>
                                   
                                </View>

                             </View>
                             
                            </View>                          
                       )
                   }) 
              }
            </ScrollView>
            <DataTable label="Basket"  scrollEnabled={true} editable={false}>
                <DataTable.Header>
                    <DataTable.Title>Item</DataTable.Title>
                    <DataTable.Title numeric>Quantity</DataTable.Title>
                    <DataTable.Title numeric>Price</DataTable.Title>
                </DataTable.Header>
            </DataTable>
            <IconButton 
            style={{ position:'relative', bottom:0, left:ScreenWidth * 0.8, backgroundColor:'#111'}} color="white" size={25}
            onPress={pay}
            icon="basket"/>


        </SafeAreaView>
    );
}