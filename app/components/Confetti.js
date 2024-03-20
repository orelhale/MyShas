import React, { useRef, useState } from 'react';
import { View, StyleSheet, Animated, Button } from 'react-native';

const Particle = ({ x, y, size, color }) => (
  <Animated.View
    style={[
      styles.particle,
      { backgroundColor: color, width: size, height: size, borderRadius: size / 2 },
      { transform: [{ translateX: x }, { translateY: y }] },
    ]}
  />
);

const Confetti = ({ shouldAnimate }) => {
  const animationValue = useRef(new Animated.Value(0)).current;
  const particles = useRef([]);

  const createParticle = () => {
    const size = Math.random() * 10 + 5; // Random size between 5 and 15
    const color = Math.random() > 0.5 ? 'red' : 'green'; // Random color

    return {
      x: Math.random() * 300, // Random x position within screen width
      y: -20, // Start above the screen
      size,
      color,
      speed: Math.random() * 2 + 1, // Random speed between 1 and 3
    };
  };

  React.useEffect(() => {
    if (shouldAnimate) {
      Animated.timing(animationValue, {
        toValue: 2,
        duration: 3000,
        useNativeDriver: true,
      }).start();
    } else {
      animationValue.setValue(0);
    }
  }, [shouldAnimate]);

  React.useEffect(() => {
    particles.current = Array.from({ length: 50 }, createParticle);
  }, []);

  return (
    <View style={styles.container}>
      {particles.current.map((particle, index) => (
        <Particle
          key={index}
          x={animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [particle.x, particle.x + Math.random() * 20 - 10], // Random horizontal movement
          })}
          y={animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [particle.y, 600], // End at the bottom of the screen
          })}
          size={particle.size}
          color={particle.color}
        />
      ))}
    </View>
  );
};

const App = () => {
  const [animateConfetti, setAnimateConfetti] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Confetti shouldAnimate={animateConfetti} />
      <Button
        title="Start Confetti"
        onPress={() => {
          setAnimateConfetti(!animateConfetti);
        }}
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
  particle: {
    position: 'absolute',
  },
});

export default App;
