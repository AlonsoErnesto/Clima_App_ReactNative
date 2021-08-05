import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const Respuesta = ({resultado,pais}) => {

    const { name, main} = resultado;

    if(!name) return null;
    console.log(main)
    const kelvin = 273.15

    return (
        <View style={styles.clima}>
            <Text style={{textAlign:'center',color:'#fff',fontSize:30,textTransform:'uppercase'}}>{name}</Text>
            <Text style={[styles.texto, styles.actual]}>{parseInt(main.temp - kelvin)}
                <Text style={styles.temperatura}>
                    &#x2103;
                </Text>
                <Image
                    style={{width:66,height:58}}
                    source={{uri:`http://openweathermap.org/img/w/${resultado.weather[0].icon}.png`}}
                />
            </Text>
            <View style={styles.temperaturas}>
                <Text style={styles.texto}>Min {' '}
                    <Text style={styles.temperatura}>
                        {parseInt(main.temp_min - kelvin)}  &#x2103;
                    </Text>
                </Text>
                <Text style={styles.texto}>Max {' '}
                    <Text style={styles.temperatura}>
                        {parseInt(main.temp_max - kelvin)}  &#x2103;
                    </Text>
                </Text>
            </View>

        </View>
    )
}

export default Respuesta

const styles = StyleSheet.create({
    clima:{
        marginBottom:20
    },
    texto:{
        color:'#fff',
        fontSize:20,
        textAlign:'center',
        marginRight:20
    },
    actual:{
        fontSize:80,
        marginRight:0,
        fontWeight:'bold',

    },
    temperatura:{
        fontSize:24,
        fontWeight:'bold',
        color:'#fff'
    },
    temperaturas:{
        flexDirection:'row',
        justifyContent:'center'
    }
})
