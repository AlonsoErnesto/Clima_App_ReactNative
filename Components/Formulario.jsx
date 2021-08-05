import React,{useState} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback,Animated, Alert } from 'react-native'
import {Picker} from '@react-native-community/picker'


const Formulario = (props) => {

    const { setBusqueda, busqueda,setConsultar} = props;
    const {ciudad,pais} = busqueda;

    const [ animacionBoton] = useState(new Animated.Value(1))

    const AnimacionEntrada = () => {
        Animated.spring(animacionBoton,{
            toValue:.7,
            useNativeDriver: true,
        }).start();
    }

    const AnimacionSalida = () => {
        
        Animated.spring(animacionBoton,{
            toValue:1,
            friction:1,
            tension:100,
            useNativeDriver: true,
            
        }).start();
    }

    const estiloAnimacion = {
        transform:[{scale:animacionBoton}]
       
    }

    const consultarClima = () => {
        if(!pais || !ciudad)
        {
          alerta()  ;
          return ;
        }
        // cb0dc18f03ed306264eb96c608ad5f97
        setConsultar(true);
        


    }
    const alerta = () => {
        Alert.alert(
            'Algo malo sucedio!',
            'Llene todos los campos',
            [
                {
                    text:'Ok',
                    
                },
                
            ]
        )
    }

    return (
        <> 
            <View >
                <View>
                    <TextInput 
                        value={ciudad}
                        onChangeText={ciudad=> setBusqueda({...busqueda,ciudad})}
                        placeholder="Ciudad" 
                        placeholderTextColor="#6494e6"
                        style={styles.input}
                        />
                </View>
                <View>
                    <Picker 
                            itemStyle={{height:120,backgroundColor:'#fff'}} 
                            selectedValue={pais}
                            onValueChange={pais => setBusqueda({...busqueda,pais})}
                            >
                        <Picker.Item label="-- Seleccione un pais --" value=""/>
                        <Picker.Item label="Estados Unidos" value="US"/>
                        <Picker.Item label="México" value="MX"/>
                        <Picker.Item label="Argentina" value="AR"/>
                        <Picker.Item label="Colombia" value="CO"/>
                        <Picker.Item label="Costa Rica" value="CR"/>
                        <Picker.Item label="España" value="ES"/>
                        <Picker.Item label="Perú" value="PE"/>
                    </Picker>
                </View>
                <TouchableWithoutFeedback 
                    onPressIn={() => AnimacionEntrada()} 
                    onPressOut={() => AnimacionSalida()}
                    onPress={()=>consultarClima()}
                    >
                    <Animated.View style={[styles.btnBuscar,estiloAnimacion]}>
                        <Text style={styles.txtBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

export default Formulario

const styles = StyleSheet.create({
    input:{
        padding: 10,
        height: 50,
        backgroundColor:'#fff',
        fontSize:20,
        marginBottom:20,
        textAlign:'center'
    },
    txtBuscar:{
        color:'#fff',
        fontWeight:'bold',
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:18

    },
    btnBuscar:{
        marginTop:50,
        backgroundColor:'#000',
        padding:10,
        justifyContent:'center'
        
    }
    
})
