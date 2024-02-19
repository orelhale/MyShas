// https://reactnavigation.org/docs/getting-started/
// https://reactnavigation.org/docs/hello-react-navigation/

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CompletAreaScreen from './CompletAreaScreen';
import HomeScreen from './HomeScreen';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator()


export default function Layout2() {

   let names = [{ name: "Home", component: HomeScreen }, { name: "CompletAreaScreen", component: CompletAreaScreen }]

   function buttonHeader({ navigation, route }) {
      return (
         <View style={styles.wrapButton}>
            {names.map((item, index) =>
               <Pressable onPress={() => { (route.name != item.name) && navigation.navigate(item.name) }}>
                  <Text style={styles.text}>{item.name}</Text>
               </Pressable>
            )}
         </View>
      )
   }

   return (
      <NavigationContainer>
         <Stack.Navigator
            initialRouteName='Home'
            // defaultScreenOptions={defaultScreenOptions}
            screenOptions={(option) => {
               // console.log("option ==== ", option.route.name);
               return {
                  headerStyle: {
                     backgroundColor: '#f4511e',
                  },
               }
            }}
         >
            {names.map(({ name, component }) => (
               <Stack.Screen
                  name={name}
                  component={component}
               // options={(option) => (
               //    {
               //       // headerTitle: (props) => <LogoTitle />
               //       headerTitle: (props) => {

               //          // names.map(({ name }) => <Text>{name}</Text>)
               //          // <View>
               //          //    {names.map(({ name }) => <Text>{name}</Text>)}
               //          // </View>
               //          // console.log("option ==== ",option);
               //          // console.log("props ==== ",props);
               //          return buttonHeader(option)
               //       }

               //    }
               // )}

               />
            ))}
            {/* <Stack.Screen name="Home"

          options={({ route, navigation }) => ({
            title: 'My home',
            // headerStyle: {
            //   backgroundColor: '#f4511e',
            // },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            // headerTitle: (props) => {
            //   // console.log("route ===== ", route);
            //   console.log("navigation ===== ", navigation.getParent());
            //   return <><LogoTitle {...props} /><LogoTitle {...props} /></>
            // }
          })}
        >
          {props => <HomeScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name="CompletAreaScreen" component={CompletAreaScreen} /> */}

         </Stack.Navigator>
      </NavigationContainer>
   );
}
const styles = StyleSheet.create({
   wrapButton: {
      flexDirection: "row",
      gap: 30,
   },
   text: {
      fontSize: 18,
      color: "yellow"
   }
})


// const MyTabs = ({ currentUser, navigation }) => {
//     return (
//       <Tab.Navigator initialRouteName="Home">
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//         />
//         {/* <Tab.Screen
//           name="Network"
//           component={NetworkScreen}
//         />
//         <Tab.Screen
//           name="Profile"
//           component={ProfileScreen}
//           options={{
//             tabBarIcon: ({ color, size }) => (
//               <Entypo name="map" color={color} size={26} />
//             ),
//           }}
//         /> */}
//       </Tab.Navigator>
//     );
//   };