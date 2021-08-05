import React , {useState,useEffect} from 'react';
import { StyleSheet, Text, View,TouchableWithoutFeedback,Keyboard, Alert } from 'react-native';
import Formulario from './Components/Formulario'
import Respuesta from './Components/Respuesta';

export default function App() {
  
  const [busqueda, setBusqueda] = useState({
      ciudad:'',
      pais:''
  })

  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState({})

  const {ciudad, pais} = busqueda;

  const [bgColor, setBgColor] = useState('rgb(71,149,212)')

  const ocultarTeclado = () => {
    Keyboard.dismiss(); 
  }

  useEffect(() => {

    const consultarClima = async () => {
      
      if(consultar)
      {
            setBusqueda({ciudad:'',pais:''})
      
            const apikey = 'cb0dc18f03ed306264eb96c608ad5f97';
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apikey}`
      
            try {
              const respuesta = await fetch(url);
              const resutado = await respuesta.json();
              setResultado(resutado)
              setConsultar(false);
              
              //update background color 
              const kelvin = 273.15
              const {main} = resultado;
              const actual = main.temp - kelvin;
              
              if(actual < 10)
              {
                setBgColor('rgb(105,108,149)')
              }else if(actual >= 10 && actual < 23)
              {
                setBgColor('rgb(71,149,212)')
              }else {
                setBgColor('rgb(178,28,61)')
              }
              
              
            } catch (error) {
              console.log(error)
              alerta();
              // setBusqueda({ciudad:'',pais:''})
              

              
            }
          }      
        }
    consultarClima();
  }, [consultar])

  const alerta = () => {
    Alert.alert(
        'Algo malo sucedio!',
        'Llene nuevamente los campos correctamente.',
        [
            {
                text:'Ok',
                
            },
            
        ]
    )
}

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return (
    <>
    <TouchableWithoutFeedback onPress={()=>ocultarTeclado()}>
          <View style={[styles.app,bgColorApp]} >
          <View  style={styles.contenido}>
              <Respuesta pais={pais} resultado={resultado}/>
            </View>
            <View style={styles.contenido}>
                <Formulario busqueda={busqueda} setBusqueda={setBusqueda} setConsultar={setConsultar}/>
            </View>
           
          </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    
    justifyContent:'center'
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});
