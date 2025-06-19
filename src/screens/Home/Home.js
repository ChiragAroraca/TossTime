import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import CustomHeader from '../../components/CustomHeader'
import { useSelector } from 'react-redux'
import PlayerHome from './PlayerHome'
import FacilityHome from './FacilityHome'

const Home = () => {
  const user=useSelector((state)=>state.user)
  console.log(user,'USER<>')
  return (
    <View style={styles.mainContainerView}>
      <CustomHeader/>
      {user?.role=='player'?
      <PlayerHome/>
      :
      <FacilityHome/>
    }
    </View>
  )
}

export default Home

