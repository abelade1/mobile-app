import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  Octicons,
} from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import constants from '../../constants/index';

const { colors } = constants;

const ProfileSideTab = ({
  setActiveGradient,
  activeGradient,
  setCurrentIndex,
  indexOfItemToShow,

  handleNavigation,
  navigation,
  setDefaultPostImage,
  currentIndex,
  onClickEllipse,
}) => {
  const [coordinates, setCoordinates] = useState([]);
  const [roundBackgroundAnimation] = useState(
    new Animated.ValueXY({ x: -10, y: 84 })
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = React.useRef();

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const sideBarTabItems = [
    {
      name: 'notifications',
      icon: (color) => <Feather name='bell' size={24} color={color} />,
      ref: React.createRef(),
      backgroundColor: [colors.green, colors.greenDeep],
    },
    {
      name: 'create-post',
      icon: (color) => <Entypo name='plus' size={30} color={color} />,
      ref: React.createRef(),
      backgroundColor: [colors.purshBlueDeep, colors.blue],
    },
    {
      name: 'profile',
      icon: (color) => (
        <Ionicons
          name='md-person-outline'
          size={24}
          color={color}
          style={styles.icon}
        />
      ),
      ref: React.createRef(),
      activeColor: colors.greenDeep,
      backgroundColor: [colors.greenDeep, colors.green],
    },
    {
      name: 'explore',
      icon: (color) => <Octicons name='globe' size={34} color={color} />,
      ref: React.createRef(),
      activeColor: '#AD0048',
      backgroundColor: ['#AD0048', '#E8357F'],
    },
    {
      name: 'calendar',
      icon: (color) => (
        <Ionicons
          name='md-calendar-outline'
          size={24}
          color={color}
          style={styles.icon}
        />
      ),
      ref: React.createRef(),
      activeColor: colors.greenDeep,
      backgroundColor: [colors.greenDeep, colors.green],
    },
  ];

  const moveBall = (itemPosition) => {
    const itemsCoordinates = coordinates[itemPosition];

    if (sideBarTabItems[itemPosition].name === 'create-post') {
      handleNavigation('Posts');
    }

    Animated.spring(roundBackgroundAnimation, {
      toValue: { x: -10, y: itemsCoordinates?.y },
      useNativeDriver: false,
    }).start();

    setCurrentIndex(itemPosition);
    setActiveIndex(itemPosition);
    setActiveGradient(sideBarTabItems[itemPosition]?.backgroundColor || []);
  };

  useEffect(() => {
    // get coordinates/positions of sidebar items/icons on the screen (basically x and y axis)
    const intialCoordinatesDetails = [];
    sideBarTabItems.forEach((item) => {
      item.ref.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          intialCoordinatesDetails.push({
            x,
            y,
            width,
            height,
            item: item.name,
          });
          intialCoordinatesDetails.length === sideBarTabItems.length &&
            setCoordinates(intialCoordinatesDetails);
        }
      );
    });
  }, []);

  console.log(currentIndex, 'this is current index', indexOfItemToShow);

  useEffect(() => {
    if (indexOfItemToShow && coordinates.length === 5) {
      //currentindex handles the Icon/Menu Item to display
      setCurrentIndex(indexOfItemToShow);

      //move the active circle to the activeItem
      moveBall(indexOfItemToShow);

      //clears the route params...so that indexOfItemToShow doesn't keep clashing with currentinde
      navigation.setParams({
        indexOfItemToShow: null,
      });
    }
  }, [coordinates.length, indexOfItemToShow, currentIndex]);

  return (
    <SafeAreaView style={styles.tab}>
      <TouchableOpacity style={styles.ellipse} onPress={onClickEllipse}>
        <FontAwesome5 name='ellipsis-h' size={24} color={colors.white} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ flex: 1, alignItems: 'center' }}
        ref={containerRef}
      >
        <Animated.View
          onPress
          style={[styles.tabIconActive, roundBackgroundAnimation.getLayout()]}
        />

        {sideBarTabItems.map((item, index) => (
          <AnimatedTouchable
            style={[
              styles.tabIconWrapper,
              activeIndex === index && {
                left: -10,
              },
            ]}
            onPress={() => moveBall(index)}
            ref={item.ref}
            key={index}
          >
            {item.icon(
              activeIndex === index ? activeGradient[0] : colors.white
            )}
          </AnimatedTouchable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    backgroundColor: colors.white,
    width: '80%',
    paddingTop: '10%',
    flex: 1,
    borderTopRightRadius: 40,
  },
  tab: {
    width: 65,
  },
  ellipse: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconWrapper: {
    marginVertical: '35%',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 290323,
    elevation: 10,
  },
  tabIconActive: {
    top: 450,
    zIndex: -9,
    backgroundColor: colors.white,
    borderRadius: 30,
    elevation: 3,
    left: -10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    height: 60,
    width: 60,
  },
  icon: {
    opacity: 0.5,
  },
});

export default ProfileSideTab;
