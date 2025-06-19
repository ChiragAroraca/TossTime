import { ScrollView, Text, View, TextInput, TouchableOpacity, Image, Dimensions, Animated } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Toast from 'react-native-simple-toast'
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
  const [userType, setUserType] = useState('player') // 'player' or 'facility_manager'
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

  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Password strength validation
  const isStrongPassword = (password) => {
    // At least 8 characters, contains uppercase, lowercase, number, and special character
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return strongPasswordRegex.test(password)
  }

  // Validation function
  const validateForm = () => {
    // Check if all fields are filled
    if (!fullName.trim()) {
      Toast.show('Please enter your full name', Toast.SHORT)
      return false
    }

    if (fullName.trim().length < 2) {
      Toast.show('Full name must be at least 2 characters long', Toast.SHORT)
      return false
    }

    if (!email.trim()) {
      Toast.show('Please enter your email address', Toast.SHORT)
      return false
    }


    if (!password) {
      Toast.show('Please enter a password', Toast.SHORT)
      return false
    }

    if (password.length < 6) {
      Toast.show('Password must be at least 8 characters long', Toast.SHORT)
      return false
    }

    if (!isStrongPassword(password)) {
      Toast.show('Password must contain uppercase, lowercase, number and special character', Toast.LONG)
      return false
    }

    if (!confirmPassword) {
      Toast.show('Please confirm your password', Toast.SHORT)
      return false
    }

    if (password !== confirmPassword) {
      Toast.show('Passwords do not match', Toast.SHORT)
      return false
    }

    return true
  }

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

    // Validate form before proceeding
    if (!validateForm()) {
      return
    }

    // Show success message
    Toast.show('Account validation successful!', Toast.SHORT)

    console.log('Register pressed', { fullName, email, password, confirmPassword, userType })

    // Navigate based on user type
    if(userType === 'player'){
      navigation.navigate('StepOnePlayer', {data: {name: fullName, email: email, password: password,role:userType}})
    } else {
      navigation.navigate('SubscriptionScreen', {data: {name: fullName, email: email, password: password,role:userType}})
    }
  }

  const handleLogin = () => {
    navigation.navigate('Login')
  }

  const toggleUserType = (type) => {
    setUserType(type)
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

          {/* User Type Selection */}
          <View style={styles.userTypeContainer}>
            <Text style={styles.userTypeLabel}>I am a:</Text>
            <View style={styles.userTypeOptions}>
              <TouchableOpacity
                style={[
                  styles.userTypeOption,
                  userType === 'player' && styles.userTypeOptionSelected
                ]}
                onPress={() => toggleUserType('player')}
              >
                <View style={[
                  styles.checkbox,
                  userType === 'player' && styles.checkboxSelected
                ]}>
                  {userType === 'player' && (
                    <AntDesign name="check" size={14} color={colors.white} />
                  )}
                </View>
                <MaterialIcons name="sports-baseball" size={20} color={userType === 'player' ? colors.theme : colors.lightGray} />
                <Text style={[
                  styles.userTypeText,
                  userType === 'player' && styles.userTypeTextSelected
                ]}>Player</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.userTypeOption,
                  userType === 'facility_manager' && styles.userTypeOptionSelected
                ]}
                onPress={() => toggleUserType('facility_manager')}
              >
                <View style={[
                  styles.checkbox,
                  userType === 'facility_manager' && styles.checkboxSelected
                ]}>
                  {userType === 'facility_manager' && (
                    <AntDesign name="check" size={14} color={colors.white} />
                  )}
                </View>
                <MaterialIcons name="business" size={20} color={userType === 'facility_manager' ? colors.theme : colors.lightGray} />
                <Text style={[
                  styles.userTypeText,
                  userType === 'facility_manager' && styles.userTypeTextSelected
                ]}>Facility Manager</Text>
              </TouchableOpacity>

                 <TouchableOpacity
                style={[
                  styles.userTypeOption,
                  userType === 'school-college' && styles.userTypeOptionSelected
                ]}
                onPress={() => toggleUserType('school-college')}
              >
                <View style={[
                  styles.checkbox,
                  userType === 'school-college' && styles.checkboxSelected
                ]}>
                  {userType === 'school-college' && (
                    <AntDesign name="check" size={14} color={colors.white} />
                  )}
                </View>
                <MaterialIcons name="business" size={20} color={userType === 'school-college' ? colors.theme : colors.lightGray} />
                <Text style={[
                  styles.userTypeText,
                  userType === 'school-college' && styles.userTypeTextSelected
                ]}>Schools/Universities</Text>
              </TouchableOpacity>
            </View>
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