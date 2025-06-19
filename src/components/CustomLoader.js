import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';
import { Icons } from '../constants/icons';

const CustomLoader = ({ size = 40, color='white'}) => {
  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000, // 1 second for full rotation
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View>
      <Animated.Image
        source={Icons.ball}
        style={[
          styles.ball,
          {
            width: size,
            height: size,
            transform: [{ rotate: spin }],
            tintColor:color
          },
        ]}
      />
    </View>
  );
};

export default CustomLoader;

const styles = StyleSheet.create({
  ball: {
    resizeMode: 'contain',
  },
});
