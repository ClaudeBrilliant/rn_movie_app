import { images } from '@/constants/images';
import { Image, Text, View } from 'react-native';

const About = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      
      <View className="mt-20 px-5">
        <Text className="text-white text-2xl font-bold mb-6">About</Text>
        <Text className="text-light-200 mb-4">Movie App v1.0.0</Text>
        <Text className="text-light-200">Discover and track your favorite movies</Text>
      </View>
    </View>
  );
};

export default About;