import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { JobItem } from './JobItem';

import {
    GradientButton,
    Input,
    Text,
    FavoriteCropItem, SafeArea, KeyboardAvoiding,
} from '../../components';

import { getCropsFavoriteToGrow, getUserJobs } from '../../redux/actions';
import ManageCropContext from '../../context/ManageCropsContext';

import constants from '../../constants';

const {
  colors,
  screenHeight,
  screenWidth,
  monthsAbr: months,
  months: monthsFull,
} = constants;

const AddToCalendar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const manageCropContext = useContext(ManageCropContext);

  const {
    favoriteCrops,
    user,
    jobs: userJobs,
  } = useSelector((state) => ({
    favoriteCrops: state.crops.favoriteCrops,
    user: state.auth?.user,
    jobs: state.jobs?.usersJobs,
  }));

  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [m, setM] = useState(currentMonthIndex);
  const [y, setY] = useState(currentYear);
  const scrollRef = useRef();

  const [jobs, setJobs] = useState(false);
  const [rest, setRest] = useState(false);
  const [viewingMore, setViewingMore] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [cropToolTipIdToShow, setCropToolTipIdToShow] = useState('');
  const [fetchingFavoriteCrops, setFetchingFavoriteCrops] = useState(false);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const getFavoriteCrops = async () => {
    setFetchingFavoriteCrops(true);
    await dispatch(getCropsFavoriteToGrow(months[m]));
    setFetchingFavoriteCrops(false);
  };

  const getJobs = async (userId) => {
    setLoadingJobs(true);
    await dispatch(getUserJobs(userId));
    setLoadingJobs(false);
  };

  useEffect(() => {
    getFavoriteCrops();
    if (user?.id) {
      getJobs(user?.id);
    }
  }, [m, user?.id, JSON.stringify(userJobs)]);

  const nextItem = () => {
    if (m > months.length - 2) {
      setM(0);
      setY(y + 1);
      return;
    }
    setM(m + 1);
  };

  const prevYear = () => {
    if (m === 0) {
      setM(11);
      setY(y - 1);
      return;
    }
    setM(m - 1);
  };

  const setMonth = (index) => {
    setM(index);
  };

  const onFabPress = () => {
    scrollRef.current.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const addJob = () => {
    setRest(true);
    setJobs(false);
  };

  const handleJobTextChange = (text) => setJobTitle(text);

  const jobDate = new Date().getDate();

  return (
      <KeyboardAvoiding>
          <SafeArea>
    <View style={{ flex: 1 }}>
      <SafeAreaView style={[styles.parent]}>
        <ScrollView
          style={[styles.parentContiner]}
          nestedScrollEnabled
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          ref={scrollRef}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FlatList
                data={months}
                keyExtractor={(item, index) => item}
                numColumns={6}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                      height: 46,
                      width: 46,
                      borderRadius: 46 / 2,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginHorizontal: 2,
                      marginVertical: 10,
                      backgroundColor: `${
                        index === m ? colors.green : 'white'
                      }`,
                    }}
                    onPress={() => setMonth(index)}
                  >
                    <Text
                      style={{
                        color: `${index === m ? '#fff' : 'black'}`,
                        fontWeight: `${index === m ? 'bold' : '100'}`,
                      }}
                      fontType={index === m ? 'bold' : 'light'}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
                marginBottom: 10,
              }}
            >
              <TouchableOpacity onPress={prevYear}>
                <MaterialIcons
                  name='arrow-back-ios'
                  size={24}
                  color={colors.green}
                />
              </TouchableOpacity>
              <View style={{}}>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 40,
                    fontWeight: '100',
                  }}
                >
                  {months[m]} {y}
                </Text>
              </View>
              <TouchableOpacity onPress={nextItem}>
                <MaterialIcons
                  name='arrow-forward-ios'
                  size={24}
                  color={colors.green}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                marginBottom: 30,
                textAlign: 'center',
                color: colors.green,
              }}
            >
              Today
            </Text>
          </View>

          <View>
            <GradientButton
              gradient={[colors.red, colors.redDeep]}
              onPress={() => navigation.navigate('Crops')}
            >
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={styles.btnText}>Grow in {monthsFull[m]} </Text>
                <AntDesign name='search1' size={25} color={colors.white} />
              </View>
            </GradientButton>
            <GradientButton
              gradient={[colors.green, colors.greenDeep]}
              onPress={() => setJobs(!jobs)}
            >
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={styles.btnText}>Jobs</Text>
                <AntDesign name='plus' size={25} color={colors.white} />
              </View>
            </GradientButton>

            {/* {jobs && (
              <TouchableOpacity activeOpacity={0.9} style={[styles.jobs]}>
                <View style={[styles.jobsChild]}>
                  <Image source={require('../../assets/circle.png')} />
                  <View style={[styles.jobsText]}>
                    <Input
                      inputStyle={{ width: screenWidth * 0.4, fontSize: 16 }}
                      onChangeText={handleJobTextChange}
                      value={jobTitle}
                      placeholder='Enter Job...'
                      placeholderTextColor={colors.grey}
                    />
                    <Text style={styles.boldText}>
                      {jobDate} {months[m]}
                    </Text>
                  </View>
                </View>
                <AntDesign
                  name='right'
                  size={24}
                  color={colors.green}
                  onPress={addJob}
                />
              </TouchableOpacity>
            )} */}
            <View style={{ marginTop: 30 }}>
              {loadingJobs ? (
                <ActivityIndicator />
              ) : (
                userJobs?.jobs
                  ?.slice(0, viewingMore ? userJobs?.jobs.length : 3)
                  .map((job, index) => {
                    return job.job_type !== 'harvest' ? (
                      <React.Fragment key={index}>
                        <JobItem job={job} />
                      </React.Fragment>
                    ) : null;
                  })
              )}

              <TouchableOpacity onPress={() => setViewingMore(!viewingMore)}>
                {userJobs?.jobs?.length > 3 && (
                  <Text style={styles.viewMore}>
                    {viewingMore ? 'Hide jobs' : 'View more'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <GradientButton gradient={[colors.blueLigth, colors.blue]}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={styles.btnText}>What you’re harvesting</Text>
                <AntDesign name='info' size={28} color={colors.white} />
              </View>
            </GradientButton>
            <View>
              {loadingJobs ? (
                <ActivityIndicator />
              ) : (
                userJobs?.jobs
                  ?.slice(0, viewingMore ? userJobs?.jobs.length : 3)
                  .map((job, index) => {
                    return job?.job_type === 'harvest' ? (
                      <React.Fragment key={index}>
                        <JobItem job={job} />
                      </React.Fragment>
                    ) : null;
                  })
              )}
            </View>

            <View style={[styles.horizontalLine]}></View>

            <View style={[styles.favoriteContainer]}>
              <Text style={styles.favouriteText}>
                Some of our favourites to grow this month
              </Text>
            </View>
            {fetchingFavoriteCrops ? (
              <View>
                <ActivityIndicator />
              </View>
            ) : (
              favoriteCrops?.crops?.map((crop, index) => (
                <FavoriteCropItem
                  crop={crop}
                  key={index}
                  tipToShowId={cropToolTipIdToShow}
                  onSetTipToShow={setCropToolTipIdToShow}
                  onNavigate={() => {
                    navigation.navigate('Crops', {
                      screen: 'Crop-selection',
                      params: {
                        cropName: crop?.name,
                        sowTip: crop?.sow_tip,
                        growLevel: crop?.grow_level,
                      },
                    });
                    //update state context???
                    manageCropContext?.actions?.updateCropToGrowDetails({
                      cropName: crop?.name,
                      month: months[m],
                      variety: crop?.variety,
                      monthIndex: m,
                      cropId: crop?.id,
                      action: 'sow'
                    });
                  }}
                />
              ))
            )}

            <View style={{ marginBottom: 50 }}>
              <Text style={styles.explore}>Continue to explore</Text>
              <GradientButton
                gradient={[colors.red, colors.redDeep]}
                onPress={onFabPress}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={styles.btnText}>Grow in {monthsFull[m]} </Text>

                  <AntDesign name='plus' size={25} color={colors.white} />
                </View>
              </GradientButton>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
          </SafeArea>
      </KeyboardAvoiding>
  );
};

const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#fff',
  },
  parentContiner: {
    padding: 24,
  },
  dateText: {
    textAlign: 'center',
    color: colors.green,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 5,
  },
  jobs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 50,
    height: 78,
    backgroundColor: colors.white,
    // shadow iOS
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // shadow android
    elevation: 10,
  },
  jobsChild: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: screenWidth * 0.04,
  },
  jobsText: {
    marginLeft: 15,
  },
  jobsImg: {
    width: 20,
    height: 20,
  },
  viewMore: {
    color: colors.green,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 18,
  },
  quote: {
    textAlign: 'center',
    marginVertical: 10,
  },
  calendarContainer: {
    marginTop: 60,
  },
  horizontalLine: {
    borderWidth: 1,
    borderColor: colors.greyLight,
    marginVertical: 35,
  },
  favoriteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  favouriteText: {
    textAlign: 'center',
    color: colors.green,
    maxWidth: 250,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  flowers: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 5,
    backgroundColor: colors.white,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // shadow android
    elevation: 10,
  },
  flowerImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  flowerText: {
    marginLeft: 20,
  },
  explore: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 6,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default AddToCalendar;
