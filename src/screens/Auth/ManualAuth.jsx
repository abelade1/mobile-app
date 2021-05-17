import { LinearGradient } from 'expo-linear-gradient';
import { useFormik } from 'formik';
import React from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import * as Yup from 'yup';

import {
  GradientButton,
  Header,
  Input,
  Logo,
  Text,
  SafeArea,
} from '../../components';

import { useSelector, useDispatch } from 'react-redux';

import { login } from '../../redux/actions/authActions';

import growthLogo from '../../assets/growth_logo.png';

import constants from '../../constants';

const { colors } = constants;

const ManualAuth = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email is not valid')
      .required('Required')
      .min(2, 'Too Short!')
      .max(1000, 'Too Long!'),
    password: Yup.string()
      .required('Required')
      .min(6, 'Too Short!')
      .max(100, 'Too Long!'),
  });

  const { handleChange, handleBlur, values, errors, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // const valid =
      // values.email === 'Testuser@tmail.com' && values.password === 'test01!';
      // if (valid) {
      // setTimeout(() => {
      // navigation.navigate('Onboarding');
      // }, 500);
      // }
      dispatch(login(values, navigation));
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <SafeArea containerStyle={{ backgroundColor: colors.white }}>
        <View
          style={{
            flex: 1,
            // alignItems: 'center',
            backgroundColor: colors.white,
          }}
        >
          <ScrollView>
            <Header onIconPress={() => navigation.goBack()} />
            <Logo
              source={growthLogo}
              logoStyles={{ marginTop: '10%', marginBottom: '10%', alignSelf: 'center' }}
            />
            <View style={styles.authContainer}>
              <Input
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelText}
                labelText='Email'
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                placeholder='Enter your email'
                errorMessage={errors.email}
                autoCapitalize='none'
              />
              <Input
                containerStyle={styles.inputPasswordCont}
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelText}
                labelText='Password'
                value={values.password}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                placeholder='Enter your password'
                secureTextEntry={true}
              />

              <View style={{ marginTop: 25 }}>
                <GradientButton
                  gradient={[colors.green, colors.greenDeep]}
                  coverStyle={{}}
                  title={'Log in'}
                  onPress={handleSubmit}
                  loading={loading}
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => navigation.navigate('Forgot-password')}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      marginTop: '6%',
                      marginBottom: 32,
                      fontSize: 14,
                      fontFamily: 'Hero-New-Light',
                    }}
                  >
                    Forgotten Password?
                </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                {
                  width: '100%',
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  overflow: 'hidden',
                },
              ]}
            >
              <LinearGradient
                style={{
                  width: '100%',
                  height: 305,
                  paddingLeft: '8%',
                  paddingRight: '8%',
                }}
                colors={[colors.blueLigth, colors.blue]}
              >
                <Text
                  style={{
                    color: colors.white,
                    textAlign: 'center',
                    marginTop: 40,
                    marginBottom: 10,
                  }}
                >
                  Not got an account?
              </Text>
                <GradientButton
                  gradient={[colors.green, colors.greenDeep]}
                  coverStyle={{ marginBottom: '10%' }}
                  title={'Register'}
                  onPress={() => navigation.navigate('Register')}
                />

                <Text
                  style={{
                    position: 'absolute',
                    bottom: '35%',
                    left: 0,
                    right: 0,
                    color: colors.white,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: 16,
                  }}
                  onPress={() => navigation.goBack()}
                  fontType='bold'
                >
                  Cancel
              </Text>
              </LinearGradient>
            </View>
          </ScrollView>
        </View>

      </SafeArea>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom: '5%',
  },
  scrollContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    marginTop: '10%',
  },
  labelText: {
    color: constants.colors.blueLigth,
  },
  authContainer: {
    width: '85%',
    justifyContent: 'center',
    marginTop: '5%',
    alignSelf: 'center',
  },
  inputPasswordCont: {
    marginTop: '10%',
  },
  forgottenPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  inputStyle: {
    borderBottomWidth: 1,
    marginTop: 10,
    borderBottomColor: constants.colors.greyLight,
    paddingBottom: '2%',
  },
});

export default ManualAuth;
