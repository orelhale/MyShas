import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

const RotatingLoader = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prevRotation) => prevRotation + 1);
    }, 4);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.loader, { transform: [{ rotate: `${rotation}deg` }] }]} />
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
    borderBottomColor: "#f3f3f3",
    borderLeftColor: "#f3f3f3",
    borderRightColor: "#f3f3f3",
    borderTopColor: "#3498db",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
});

export default RotatingLoader;
