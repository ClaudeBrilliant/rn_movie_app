import { images } from '@/constants/images';
import { Image, Text, View } from 'react-native';

const Help = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      
      <View className="mt-20 px-5">
        <Text className="text-white text-2xl font-bold mb-6">Help & Support</Text>
        <Text className="text-light-200">Contact us at support@example.com</Text>
      </View>
    </View>
  );
};

export default Help;