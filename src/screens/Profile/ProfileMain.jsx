import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import constants from '../../constants/index'
import Calendar from './AddToCalendar'
import Explore from "./Explore"
import FirstView from './FirstView'
import ProfileSideTab from './ProfileSideTab'
import CropSearch from "../Crops/CropSearch"

const { colors } = constants

const Main = ({ currentIndex }) => {
  return (
    <View style={styles.main}>
      {currentIndex === 0 ? (
       <CropSearch />
      ) : currentIndex === 1 ? (
        <>
          <Text>1</Text>
        </>
      ) : currentIndex === 2 ? (
        <FirstView />
      ) : currentIndex === 3 ? (
        <Explore />
      ) : currentIndex === 4 ? (
        <Calendar />
      ) : null}
    </View>
  )
}

const MainProfile = ({ navigation }) => {
  const [activeGradient, setActiveGradient] = useState([
    colors.greenDeep,
    colors.green,
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient style={styles.container} colors={activeGradient}>
        <View style={styles.safeArea}>
          <Main currentIndex={currentIndex} />
          <ProfileSideTab
            navigation={navigation}
            setActiveGradient={setActiveGradient}
            activeGradient={activeGradient}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    backgroundColor: colors.white,
    width: '80%',
    overflow: 'hidden',
    flex: 1,
    borderTopRightRadius: 40,
  },
})

export default MainProfile
