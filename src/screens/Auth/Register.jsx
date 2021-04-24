import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import growthLogo from '../../assets/growth_logo.png';
import {
  GradientButton,
  Input,
  Logo,
  KeyboardAvoiding,
  SafeArea,
} from '../../components';
import constants from '../../constants';

export const Register = ({ navigation }) => {
  const [authDetails, setAuthDetails] = useState({
    email: '',
    name: '',
    bio: '',
    location: '',
    password: '',
  });

  const handleAuthDetails = (name, value) => {
    setAuthDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submit = () => {};

  const { colors } = constants;

  return (
    <KeyboardAvoiding>
      <SafeArea>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ backgroundColor: colors.white }}
        >
          <View style={{ alignItems: 'center' }}>
            <Logo
              source={growthLogo}
              logoStyles={{
                marginTop: '20%',
                marginBottom: '10%',
                display: 'flex',
                justifyContent: 'center',
              }}
            />
          </View>

          <View style={styles.container}>
            <LinearGradient
              style={{
                width: '100%',
                paddingLeft: '5%',
                paddingRight: '5%',
                flex: 1,
                paddingBottom: 30,
                paddingTop: 50,
              }}
              colors={[colors.blueLigth, colors.blue]}
            >
              <Input
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText='Email'
                value={authDetails.email}
                onChangeText={(text) => handleAuthDetails('email', text)}
                placeholder='Enter your email'
                placeholderTextColor={colors.white}
              />
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText='Name'
                value={authDetails.name}
                onChangeText={(text) => handleAuthDetails('name', text)}
                placeholder='Enter your name'
                placeholderTextColor={colors.white}
              />
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText='Location'
                value={authDetails.location}
                onChangeText={(text) => handleAuthDetails('location', text)}
                placeholder='Enter your location'
                placeholderTextColor={colors.white}
              />
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                labelStyle={styles.label}
                labelText='Password'
                value={authDetails.password}
                onChangeText={(text) => handleAuthDetails('password', text)}
                placeholder='Enter your password'
                secureTextEntry={true}
                placeholderTextColor={colors.white}
              />

              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                coverStyle={{ marginBottom: 20, marginTop: 50 }}
                title={'Register'}
                onPress={() => navigation.navigate('Onboarding')}
              />
              <Text
                style={{ textAlign: 'center', color: 'white' }}
                onPress={() => navigation.navigate('ManualAuthentication')}
              >
                Already have an Account? Log in
              </Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                  marginTop: '30%',
                  fontSize: 16,
                }}
                onPress={() => navigation.navigate('Login')}
              >
                Cancel
              </Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </SafeArea>
    </KeyboardAvoiding>
  );
};

const styles = StyleSheet.create({
  parentContainer: {},
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: constants.colors.white,
  },
  scrollView: {
    width: '100%',
    alignSelf: 'center',
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    flex: 1,
  },
  image: {
    marginTop: '25%',
  },
  inputContainer: {
    marginTop: '5%',
  },
  input: {
    borderBottomWidth: 1,
    marginTop: '3%',
    borderBottomColor: constants.colors.greyLight,
    paddingBottom: '2%',
    color: constants.colors.white,
  },
  label: {
    color: constants.colors.white,
  },
  alignItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
});

export default Register;
