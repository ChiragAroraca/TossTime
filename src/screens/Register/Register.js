import { ScrollView, Text, View, TextInput, TouchableOpacity, Image, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../constants/colors'
import { Icons } from '../../constants/icons'
import { styles } from '../Login/styles'
import { useNavigation } from '@react-navigation/native'

const Register = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const navigation = useNavigation()
  const logoScale = useRef(new Animated.Value(0.8)).current
  const formOpacity = useRef(new Animated.Value(0)).current
  const slideUp = useRef(new Animated.Value(50)).current
  const buttonScale = useRef(new Animated.Value(1)).current

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

  const handleRegister = () => {
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
    console.log('Register pressed', { fullName, email, password, confirmPassword })
  }

  const handleLogin = () => {
    navigation.navigate('Login')
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
          <View style={styles.baseballIcon}>
            <View style={styles.baseball}>
              <View style={styles.baseballStitch1} />
              <View style={styles.baseballStitch2} />
            </View>
          </View>
          <Text style={styles.appTitle}>TossTime</Text>
          <Text style={styles.appSubtitle}>' OUR MOTO FOR APP '</Text>
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
          <Text style={styles.welcomeText}>Join TossTime</Text>
          <Text style={styles.signInText}>Create your account to start training</Text>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <AntDesign name='user' size={17} color={colors.white} />
            </View>
            <TextInput
              style={[styles.input, { fontSize: 13 }]}
              placeholder="Full Name"
              placeholderTextColor="#8B9DC3"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <AntDesign name='mail' size={17} color={colors.white} />
            </View>
            <TextInput
              style={[styles.input, { fontSize: 13 }]}
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
              <AntDesign name='lock' size={21} color={colors.white} />
            </View>
            <TextInput
              style={[styles.input, { fontSize: 13 }]}
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

          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <AntDesign name='lock' size={21} color={colors.white} />
            </View>
            <TextInput
              style={[styles.input, { fontSize: 13 }]}
              placeholder="Confirm Password"
              placeholderTextColor="#8B9DC3"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!isConfirmPasswordVisible}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            >
              <Text style={styles.iconText}>
                {isConfirmPasswordVisible ? '👁️' : '👁️‍🗨️'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>By signing up, you agree to our</Text>
            <View style={styles.termsSubContainer}>
              <TouchableOpacity>
                <Text style={styles.termsLink}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.and}>and</Text>
              <TouchableOpacity>
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>

          </View>

          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Create Account</Text>
              <MaterialIcons name='sports-baseball' size={16} style={{ marginBottom: 2.5 }} color={colors.white} />
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Sign-Up with Google</Text>
            <Image source={Icons.google} style={styles.googleIcon} />
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.signUpLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  )
}

export default Register