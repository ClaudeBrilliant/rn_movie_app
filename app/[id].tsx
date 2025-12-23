import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { icons } from '../constants/icons';

interface movieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({label, value} : movieInfoProps) => {
  return (
    <View className='flex-col items-start justify-center mt-5'>
      <Text className='text-light-200 text-sm font-normal'>{label}</Text>
      <Text className='text-light-100 text-sm mt-2 text-base font-bold'>
        {value || 'N/A'}</Text>
    </View>
  )
};

const MovieDetails = () => {
  const {id} = useLocalSearchParams();
  const {data: movie, loading} = useFetch(() => fetchMovieDetails(id as string)); 

  if (loading) {
    return (
      <View className='flex-1 bg-primary items-center justify-center'>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View className='flex-1 bg-primary items-center justify-center'>
        <Text className='text-white'>Movie not found</Text>
      </View>
    );
  }

  return (
    <View className='flex-1 bg-primary'>
      <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        <View>
          <Image 
            source={{uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`}} 
            className='w-full h-[550px]' 
            resizeMode='cover' 
          />
        </View>

        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white text-3xl font-bold'>{movie.title}</Text>
          
          <View className='flex-row items-center mt-2'>
            <Text className='text-light-200 text-sm'>
              {movie.release_date?.split('-')[0]}
            </Text>
          </View>
          
          <View className='flex-row items-center mt-2 bg-dark-100 px-2 py-1 rounded-md gap-x-1'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white font-bold text-sm'>
              {((movie.vote_average ?? 0) / 2).toFixed(1)}/5
            </Text>
            <Text className='text-light-200'>
              ({movie.vote_count} votes)
            </Text>
          </View>

          

          {movie.overview && (
            <View className='mt-4'>
              <Text className='text-white text-lg font-bold mb-2'>Overview</Text>
              <Text className='text-light-200 text-base leading-6'>
                {movie.overview}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default MovieDetails;