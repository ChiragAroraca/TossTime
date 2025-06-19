import { Image, StyleSheet, Text, View, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { colors } from '../../constants/colors'
import { Icons } from '../../constants/icons'

const Splash = () => {
  const ballBounce = useRef(new Animated.Value(-7)).current
  const ballRotation = useRef(new Animated.Value(0)).current

  const shadowOpacity = useRef(new Animated.Value(0)).current
  const shadowScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    // Create bouncing animation with realistic physics
    const createBounceAnimation = () => {
      return Animated.sequence([
        // Ball falls down (accelerating)
        Animated.timing(ballBounce, {
          toValue: 0.7,
          duration: 800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        // Ball bounces back up (decelerating)
        Animated.timing(ballBounce, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    }

    // Create rotation animation
    const createRotationAnimation = () => {
      return Animated.timing(ballRotation, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    }

    // Create shadow animation that syncs with bounce
    const createShadowAnimation = () => {
      return Animated.sequence([
        // Shadow grows and becomes more opaque as ball approaches
        Animated.timing(shadowOpacity, {
          toValue: 0.6,
          duration: 800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shadowScale, {
          toValue: 1.5,
          duration: 800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        // Shadow shrinks and fades as ball bounces up
        Animated.parallel([
          Animated.timing(shadowOpacity, {
            toValue: 0.2,
            duration: 600,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(shadowScale, {
            toValue: 1,
            duration: 600,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          })
        ])
      ])
    }

    // Start animations with a delay
    setTimeout(() => {
      const runAnimations = () => {
        // Reset rotation for continuous spinning
        ballRotation.setValue(0)
        
        Animated.parallel([
          createBounceAnimation(),
          createRotationAnimation(),
          createShadowAnimation()
        ]).start(() => {
          // Loop the animation
          setTimeout(runAnimations, 500) // Small pause between bounces
        })
      }
      
      runAnimations()
    }, 800)

  }, [])

  // Interpolate values for smooth animations
  const ballTranslateY = ballBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [-80, -20] // Bounce closer above the text
  })

  const ballRotate = ballRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  const ballScale = ballBounce.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 1, 0.95] // Slight squash on impact
  })

  return (
    <View style={styles.mainContainer}>
      {/* Shadow for the ball */}
      <Animated.View 
        style={[
          styles.ballShadow,
          {
            opacity: shadowOpacity,
            transform: [{ scaleX: shadowScale }]
          }
        ]} 
      />
      
      {/* Animated Ball */}
      <Animated.Image 
        source={Icons.ball} 
        style={[
          styles.appLogo,
          {
            transform: [
              { translateY: ballTranslateY },
              { rotate: ballRotate },
              { scale: ballScale }
            ]
          }
        ]}
      />
      
      {/* Static Logo Text */}
      <Image 
        source={Icons.logoText} 
        style={styles.logoText} 
      />
      
      {/* Shadow for the ball */}
      <Animated.View 
        style={[
          styles.ballShadow,
          {
            opacity: shadowOpacity,
            transform: [{ scaleX: shadowScale }]
          }
        ]} 
      />
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: colors.darkGray,
        alignItems: 'center',
        justifyContent: 'center'
    },
    appLogo:{
        width: 100,
        height: 100,
        resizeMode: 'contain',
        tintColor: colors.white,
        position: 'absolute',
        zIndex: 2,
    },
    logoText:{
        width: 250,
        height: 100,
        resizeMode: 'contain',
        tintColor: colors.white,
        marginTop: 40,
        zIndex: 1,
    },
    ballShadow: {
        position: 'absolute',
        width: 80,
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 40,
        top: '45%',
        zIndex: 0,
        blur: 4,
    }
})