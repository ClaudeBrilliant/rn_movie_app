import { Tabs } from 'expo-router'
import { StyleSheet } from 'react-native'

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // This hides headers for all tabs
      }}
    >
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
        }} 
      />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})