import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity,Keyboard, StyleSheet, SafeAreaView, Image } from 'react-native';

import api from './src/services/api'

export default function App() {

  const [input, setInput] = useState('');
  const [cepUser, setCepUser] = useState(null)
  const inputRef = useRef(null);

  async function buscar() {
    if (input == '') {

      alert('Digite um Cep Valido');
      setInput('');
      return;
    }
    try {
      const response = await api.get(`/${input}/json`);
      setCepUser(response.data)
      Keyboard.dismiss
      
    } catch (error) {
      console.log('ERROR: ' + error)

    }

  }

  function limpar() {
    setInput('');
    inputRef.current.focus();
  }


  return (
    <SafeAreaView style={styles.container}>

      <Image
        source={require('./src/images/logo.jpg')}
        style={styles.logo}
      />

      <Text style={styles.title}>Digite o CEP</Text>

      <TextInput
        value={input}
        placeholder='Ex:. 52415362'
        onChangeText={(texto) => setInput(texto)}
        style={styles.inputBox}
        keyboardType='numeric'
        ref={inputRef}
      />

      <View style={styles.btnView}>
        <TouchableOpacity
          style={[styles.btnArea, { backgroundColor: '#07ab07' }]}
          onPress={buscar}
        >
          <Text style={styles.btnText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnArea, { backgroundColor: '#d41308' }]}
          onPress={limpar}
        >
          <Text style={styles.btnText}>Limpar</Text>
        </TouchableOpacity>

      </View>
      {cepUser &&
      <View style={styles.areaResult}>
        <Text style={styles.textResult}>CEP: {cepUser.cep} </Text>
        <Text style={styles.textResult}>Lougradouro: {cepUser.logradouro}</Text>
        <Text style={styles.textResult}>Bairro: {cepUser.bairro}</Text>
        <Text style={styles.textResult}>Cidade: {cepUser.localidade}</Text>
        <Text style={styles.textResult}>Estado: {cepUser.uf}</Text>

      </View>
      
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'


  },
  title: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 30

  },

  inputBox: {
    backgroundColor: '#fff',
    height: 50,
    width: 350,
    marginTop: 20,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 25,
    textAlign: 'center'


  },

  btnView: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  btnArea: {
    borderRadius: 5,
    margin: 10

  },

  btnText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10
  },

  areaResult: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  textResult: {
    textAlign: 'center',
    color: '#555',
    fontSize: 20
  },

  logo: {
    width: 400,
    height: 90
  }

})