import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const Loader2 = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
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
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    borderWidth: 8,
    // borderColor: '#f3f3f3',
    borderTopColor: '#3498db',
    borderRadius: 50,
    width: 50,
    height: 50,
    borderWidth: 4,
    borderRadius: 60,
    borderBottomColor: "#f3f3f3",
    borderLeftColor: "#f3f3f3",
    borderRightColor: "#f3f3f3",
    borderTopColor: "#3498db",
    width: 80,
    height: 80,
  },
});

export default Loader2;
