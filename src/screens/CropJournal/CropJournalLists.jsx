import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globe from '../../assets/globe.png';
import { SafeArea } from '../../components';
import constants from '../../constants';
import ModalSheet from './ModalSheet';
import DeleteModal from './DeleteModal';

import { getJournals } from '../../redux/actions';

const { colors } = constants;

const CropJournalLists = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, journal } = useSelector((state) => ({
    user: state?.auth.user,
    journal: state?.journal?.journals,
  }));


  useEffect(() => {
    dispatch(getJournals(user?.id));
  }, []);

  return (
    <SafeArea>
      <TouchableOpacity style={styles.plusButtonContainer}>
        <AntDesign
          name='plus'
          size={24}
          color={colors.blue}
          onPress={() => navigation.navigate('Create-Journal')}
        />
      </TouchableOpacity>
      <View
        style={{
          transform: [{ rotate: '-90deg' }],
          position: 'absolute',
          zIndex: 343,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          bottom: 200,
          left: -35,
        }}
      >
        <Text
          style={{
            color: colors.white,
            overflow: 'visible',
          }}
        >
          Add to Crop Journal
        </Text>
      </View>
      <LinearGradient
        style={styles.container}
        colors={[colors.purshBlue, colors.blue]}
      >
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            width: Dimensions.get('screen').width * 0.1,
            overflow: 'visible',
          }}
        >
          <AntDesign
            name='left'
            size={24}
            color={colors.white}
            style={{ marginTop: 30, marginLeft: 0 }}
            onPress={() => navigation.goBack()}
          />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <JournalCard uri='https://images.pexels.com/photos/1030913/pexels-photo-1030913.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' />
          <JournalCard uri='https://images.pexels.com/photos/4503273/pexels-photo-4503273.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' />
          <JournalCard uri='https://images.pexels.com/photos/4503732/pexels-photo-4503732.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' />
          <View style={{ height: 50, backgroundColor: colors.white }} />
        </ScrollView>
      </LinearGradient>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'visible',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    width: Dimensions.get('screen').width * 0.8,
    paddingBottom: 50,
  },
  plusButtonContainer: {
    backgroundColor: colors.white,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    bottom: 85,
    left: 20,
    position: 'absolute',
    zIndex: 423,
  },
});

const JournalCard = ({ uri }) => {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const open = () => {
    setShow(false);
  };

  const opeDeletModal = () => {
    setDeleteModal(false);
  };

  const openDelete = () => {
    setShow(false);
    setDeleteModal(true);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <View style={{ alignItems: 'flex-end', paddingHorizontal: '5%' }}>
        <LinearGradient
          style={{ width: 96, padding: 14, borderRadius: 23 }}
          colors={[colors.purshBlue, colors.blue]}
        >
          <Text
            style={{ fontSize: 14, textAlign: 'center', color: colors.white }}
          >
            Jul 2020
          </Text>
        </LinearGradient>
      </View>
      <Image
        source={{
          uri,
        }}
        style={{ height: 300, marginTop: '3%' }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
        }}
      >
        <Text style={{ color: colors.greyDark, fontStyle: 'italic' }}>
          23 July 2020
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(!show)}>
          <AntDesign name='ellipsis1' size={24} color={'#9B9B9B'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: '4%',
          marginTop: 5,
        }}
      >
        <Image source={globe} style={{ height: 17, width: 17 }} />
        <Text style={{ width: '92%', marginLeft: 5 }}>
          <Text style={{ fontWeight: 'bold' }}>Garden_of_Riley</Text>{' '}
          <Text>First handful of tomatoes!! Well worth the wait!</Text>
        </Text>
        <Text style={{ fontWeight: 'bold', marginLeft: 5, marginTop: 10 }}>
          Tomatoes - ‘Sungold’
        </Text>
      </View>
      <ModalSheet
        showBottomSheet={show}
        onClose={open}
        showDelete={openDelete}
      ></ModalSheet>
      <DeleteModal showBottomSheet={deleteModal} onClose={opeDeletModal} />
    </View>
  );
};

export default CropJournalLists;
