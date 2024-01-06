import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Layout from './app/layout/Layout';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>My Shas App</Text>
      <Text>Orel hale</Text>
      <Layout />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
