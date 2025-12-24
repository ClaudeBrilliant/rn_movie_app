import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface SettingItemProps {
  icon: any;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightComponent,
}: SettingItemProps) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-4 px-5 bg-dark-100 rounded-lg mb-3"
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View className="flex-row items-center flex-1">
      <Image source={icon} className="w-6 h-6 mr-4" tintColor="#fff" />
      <View className="flex-1">
        <Text className="text-white text-base font-semibold">{title}</Text>
        {subtitle && (
          <Text className="text-light-200 text-sm mt-1">{subtitle}</Text>
        )}
      </View>
    </View>
    {rightComponent || (
      showArrow && (
        <Image
          source={icons.arrow}
          className="w-5 h-5 -rotate-90"
          tintColor="#fff"
        />
      )
    )}
  </TouchableOpacity>
);

const Profile = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="items-center mt-20 mb-8">
          <Image source={icons.logo} className="w-16 h-14 mb-4" />
          <Text className="text-white text-2xl font-bold">Profile</Text>
        </View>

        {/* User Info Card */}
        <View className="mx-5 mb-6 bg-dark-100 rounded-2xl p-6 items-center">
          <View className="w-24 h-24 rounded-full bg-accent items-center justify-center mb-4">
            <Text className="text-white text-4xl font-bold">JD</Text>
          </View>
          <Text className="text-white text-xl font-bold mb-1">John Doe</Text>
          <Text className="text-light-200 text-sm">johndoe@example.com</Text>
          
          <TouchableOpacity
            className="mt-4 px-6 py-2 bg-accent rounded-full"
            onPress={() => {/* Handle edit profile */}}
          >
            <Text className="text-white font-semibold">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Account Section */}
        <View className="px-5 mb-6">
          <Text className="text-light-200 text-sm font-semibold mb-3 ml-1">
            ACCOUNT
          </Text>
          <SettingItem
            icon={icons.star}
            title="Favorites"
            subtitle="View your favorite movies"
            onPress={() => {/* Navigate to favorites */}}
          />
          <SettingItem
            icon={icons.search}
            title="Search History"
            subtitle="Recent searches"
            onPress={() => {/* Navigate to search history */}}
          />
        </View>

        {/* Preferences Section */}
        <View className="px-5 mb-6">
          <Text className="text-light-200 text-sm font-semibold mb-3 ml-1">
            PREFERENCES
          </Text>
          <SettingItem
            icon={icons.star}
            title="Notifications"
            subtitle="Get updates about new movies"
            showArrow={false}
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#3e3e3e', true: '#FF8A00' }}
                thumbColor="#fff"
              />
            }
          />
          <SettingItem
            icon={icons.star}
            title="Dark Mode"
            subtitle="Always enabled"
            showArrow={false}
            rightComponent={
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#3e3e3e', true: '#FF8A00' }}
                thumbColor="#fff"
              />
            }
          />
        </View>

        {/* Support Section */}
        <View className="px-5 mb-6">
          <Text className="text-light-200 text-sm font-semibold mb-3 ml-1">
            SUPPORT
          </Text>
          <SettingItem
            icon={icons.star}
            title="Help & Support"
            subtitle="Get help with the app"
            onPress={() => {/* Navigate to help */}}
          />
          <SettingItem
            icon={icons.star}
            title="About"
            subtitle="App version 1.0.0"
            onPress={() => {/* Navigate to about */}}
          />
        </View>

        {/* Logout Button */}
        <View className="px-5 mt-4">
          <TouchableOpacity
            className="bg-red-500 rounded-lg py-4 items-center"
            onPress={() => {/* Handle logout */}}
          >
            <Text className="text-white font-bold text-base">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;