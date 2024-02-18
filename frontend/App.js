import { Tabs } from 'expo-router/tabs';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <Tabs>
       <Tabs.Screen
        name="Home"
        options={{
          href: '/home',
        }}
      />
    </Tabs>
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
