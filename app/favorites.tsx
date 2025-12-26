import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Image, Text, View } from 'react-native';

const Favorites = () => {
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full"
        resizeMode="cover"
      />
      
      <View className="mt-20 px-5">
        <View className="flex-row items-center mb-6">
          <Image source={icons.star} className="w-8 h-8 mr-3" tintColor="#FF8A00" />
          <Text className="text-white text-2xl font-bold">Favorites</Text>
        </View>
        
        <Text className="text-light-200 text-center mt-10">
          No favorite movies yet
        </Text>
      </View>
    </View>
  );
};

export default Favorites;