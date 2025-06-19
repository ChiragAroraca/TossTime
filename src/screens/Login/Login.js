import { ScrollView, Text, View, TextInput, TouchableOpacity, Image, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { styles } from './styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../constants/colors'
import { Icons } from '../../constants/icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../redux/store/slices/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-simple-toast'
import { useAuth } from '../../context/AuthContext'
import CustomLoader from '../../components/CustomLoader'

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const navigation=useNavigation()
  const logoScale = useRef(new Animated.Value(0.8)).current
  const formOpacity = useRef(new Animated.Value(0)).current
  const slideUp = useRef(new Animated.Value(50)).current
  const buttonScale = useRef(new Animated.Value(1)).current
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(formOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideUp, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ]).start()
  }, [])

  const handleLogin = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start()

    dispatch(loginUser({ email, password }))
    .unwrap()
    .then(async(res) => {
      console.log('Login successful:', res);
      await login(res?.token, res?.user);
      // navigation.replace('Home');
    })
    .catch((err) => {
      console.log('Login error:', err?.message);
      Toast.show(err?.message, Toast.SHORT)
      // You can also show a toast or banner using another slice
    });
  }
  const handleRegister=()=>{
    navigation.navigate('Register')
  }

  return (
    <ScrollView 
      style={styles.mainContainer} 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      <View style={styles.backgroundPattern}>
        <View style={[styles.circle, styles.circle1]} />
        <View style={[styles.circle, styles.circle2]} />
        <View style={[styles.circle, styles.circle3]} />
      </View>

      <View style={styles.header}>
        <Animated.View style={[
          styles.logoContainer,
          { transform: [{ scale: logoScale }] }
        ]}>
          <Image source={Icons.appLogo} style={styles.appLogo}/>
          <Text style={styles.appSubtitle}>Your Training. Your Time. Your Toss</Text>
        </Animated.View>
      </View>

      <Animated.View style={[
        styles.formContainer,
        {
          opacity: formOpacity,
          transform: [{ translateY: slideUp }]
        }
      ]}>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.signInText}>Sign in to continue your training</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <AntDesign name='mail' size={17} color={colors.white}/>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#8B9DC3"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <AntDesign name='lock' size={21} color={colors.white}/>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#8B9DC3"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <Text style={styles.iconText}>
                {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
              activeOpacity={0.8}
            >
              {userData?.status=='loading'?
              <CustomLoader size={25}/>
              :
              <>
              <Text style={styles.loginButtonText}>Sign In</Text>
               <MaterialIcons name='sports-baseball' size={16} style={{marginBottom:2.5}} color={colors.white}/>
               </>
            }
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Sign-In with Google</Text>
            <Image source={Icons.google} style={styles.googleIcon}/>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  )
}



export default Login