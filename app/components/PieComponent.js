import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import PieChart from 'react-native-pie-chart';

const PieComponent = () => {
  const widthAndHeight = 250;
  const series = [123, 321];
  const sliceColor = ['#2196F3', '#2196F350'];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Basic</Text>
        <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} /> */}
        <Text style={styles.title}>Doughnut</Text>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          doughnut={true}
          coverRadius={0.70}
          coverFill={'#FFF'}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
    position:"absolute",
    top:70,
    zIndex:2,
  },
});

export default PieComponent;
