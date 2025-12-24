import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../constants/icons';

interface movieInfoProps {
  label: string;
  value: string | number | null;
}

const MovieInfo = ({label, value} : movieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 text-sm font-normal'>{label}</Text>
    <Text className='text-light-100 text-base font-bold mt-2'>
      {value || 'N/A'}
    </Text>
  </View>
)

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

  // Format currency properly
  const formatCurrency = (amount: number) => {
    if (amount === 0) return 'N/A';
    return `$${(amount / 1_000_000).toFixed(1)}M`;
  };

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
          
          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white font-bold text-sm'>
              {(movie?.vote_average ?? 0).toFixed(1)}/10
            </Text>
            <Text className='text-light-200'>
              ({movie?.vote_count} votes)
            </Text>
          </View>

          {movie.overview && (
            <MovieInfo label='Overview' value={movie.overview} />
          )}

          {movie.genres && movie.genres.length > 0 && (
            <MovieInfo 
              label='Genres' 
              value={movie.genres.map((genre) => genre.name).join(' • ')} 
            />
          )}

          <View className='flex flex-row justify-between w-full mt-5'>
            <View className='flex-1 mr-4'>
              <MovieInfo 
                label='Budget' 
                value={formatCurrency(movie.budget ?? 0)} 
              />
            </View>
            <View className='flex-1'>
              <MovieInfo 
                label='Revenue' 
                value={formatCurrency(movie.revenue ?? 0)} 
              />
            </View>
          </View>

          {movie.production_companies && movie.production_companies.length > 0 && (
            <MovieInfo 
              label='Production Companies' 
              value={movie.production_companies.map((company) => company.name).join(', ')} 
            />
          )}
        </View>
      </ScrollView>

      <TouchableOpacity 
        className='absolute bottom-10 left-5 right-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' 
        onPress={() => router.back()}
      >
        <Image 
          source={icons.arrow} 
          className='size-5 mr-1 rotate-180' 
          tintColor="#fff" 
        />
        <Text className='text-white font-semibold text-base'>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MovieDetails;