import React, { useState, useRef } from 'react'
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  SafeAreaView,
  Keyboard,
  StyleSheet
} from 'react-native'
import api from './src/services/api'
import Button from './src/components/Button'

export default function App() {
  const [cep, setCep] = useState('')
  const [cepUser, setCepUser] = useState(null)
  const inputRef = useRef(null)

  async function getCep() {
    if(cep === '') {
      alert('Digite um cep válido!')
      setCep('')

      return
    }

    try {
      const response = await api.get(`/${cep}/json`)
      if(response.status === 200) {
        console.log(response.data)
        setCepUser(response.data)
        setCep('')
        Keyboard.dismiss()
      }
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  function clearInput() {
    setCep('')
    inputRef.current.focus()
    setCepUser(null)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text}>Informe o cep</Text>
        <TextInput
          style={styles.input}
          placeholder='Ex: 49000713'
          value={cep}
          onChangeText={(text) => setCep(text)}
          keyboardType='numeric'
          ref={inputRef}
        />
      </View>

      <View style={styles.areaBtn}>
        <Button 
          onPress={getCep} 
          title='Buscar' 
          style={[styles.btn, { backgroundColor: '#1d75cd' }]}
        />
        <Button 
          onPress={clearInput} 
          title='Limpar' 
          style={[styles.btn, { backgroundColor: '#cd3e1d' }]}
        />
      </View>

      { cepUser && 
        <View style={styles.detailsCep}>
          <Text style={styles.itemText}>CEP: {cepUser.cep}</Text>
          <Text style={styles.itemText}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.itemText}>Complemento: {cepUser.complemento}</Text>
          <Text style={styles.itemText}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.itemText}>Cidade: {cepUser.localidade}</Text>
          <Text style={styles.itemText}>Estado: {cepUser.uf}</Text>
        </View>
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    marginTop: 25,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 16
  },
  areaBtn: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  btn: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 30
  },
  detailsCep: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})
