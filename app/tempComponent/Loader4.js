import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';
import globalColors from '../styleFile/globalColors';

const Loader4 = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1500, // Adjust the duration for a slower rotation
        easing: Easing.linear, // You can experiment with different easing functions
        useNativeDriver: true,
      })
    ).start();
  }, [rotation]);

  const rotateInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.loader,
          { transform: [{ rotate: rotateInterpolation }] },
          { borderTopColor: globalColors.gold3 },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  loader: {
    borderWidth: 8,
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 6,
    borderRadius: 60,
    borderBottomColor: "#f3f3f3",
    borderLeftColor: "#f3f3f3",
    borderRightColor: "#f3f3f3",
    borderTopColor: "#3498db",
    width: 80,
    height: 80,
    zIndex: 100,

  },
});

export default Loader4;
