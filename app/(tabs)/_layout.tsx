import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { UserProvider } from '../context/userContext'

const TabIcon = ({focused, icon, title}: any) => {
  if (focused) {
  return(
   <ImageBackground source={images.highlight}
               className='flex gap-1 flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'>
                <Image source={icon} tintColor="#15131" className="size-5 "/>
                <Text className='text-secondary text-base font-semibold' >{title}</Text>
               </ImageBackground>
               )
  }
  else {
    return(
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} tintColor="#A8b5db" className="size-5"/>
      </View>
    )
  }
}

const _layout = () => {
  return (
    <UserProvider>
    <Tabs
      screenOptions={{
        tabBarShowLabel:false,
        tabBarItemStyle: {
          width: '100%',
          height:'100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0d23',
        },
      }}
    >

      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            icon={icons.home} 
            title="Home" />
          )
        }} 
      />
      <Tabs.Screen 
        name="help" 
        options={{ 
          title: 'Help',
          headerShown: false,
          tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            title="Help" />
          )
        }} 
      />

      <Tabs.Screen
       name = "search-history"
        options = {{
          title : "History",
          headerShown: false,
          tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            icon={icons.search} 
            title="History" />
          )
        }}
      />
      <Tabs.Screen
       name = "saved"
        options = {{
          title : "Saved",
          headerShown: false,
            tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            icon={icons.save} 
            title="Saved" />
          )
        }}
      />
      <Tabs.Screen 
        name="about" 
        options={{ 
          title: 'About',
          headerShown: false,
          tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            title="About" />
          )
        }} 
      />
      <Tabs.Screen 
        name="favorites" 
        options={{ 
          title: 'Favorite',
          headerShown: false,
          tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            title="Favorite" />
          )
        }} 
      /><Tabs.Screen 
        name="login" 
        options={{ 
          title: 'Login',
          headerShown: false,
          tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            title="Login" />
          )
        }} 
      />
      <Tabs.Screen 
        name="register" 
        options={{ 
          title: 'Register',
          headerShown: false,
          tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            title="Register" />
          )
        }} 
      />
      <Tabs.Screen
       name = "profile"
        options = {{
          title : "Profile",
          headerShown: false,
            tabBarIcon: ({ focused}) => (
            <TabIcon  
            focused={focused} 
            icon={icons.person} 
            title="Profile" />
          )
        }}
      />
    </Tabs>
    </UserProvider>
  )
}

export default _layout

const styles = StyleSheet.create({})