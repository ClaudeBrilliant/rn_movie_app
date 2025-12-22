import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { icons } from "../../constants/icons";


export default function Index() {

  const router = useRouter();

  const {data: movies , loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({
    query: "",
  })

  )
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className='absolute  w-full z-0'></Image>
      <ScrollView className=" flex-1 px-5" 
      showsVerticalScrollIndicator={false} contentContainerStyle=
      {{paddingBottom:10, minHeight:'100%'}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading ?(
          <ActivityIndicator 
          size="large" 
          color="#0000ff" 
          className="mt-10 self-center" />
        ): moviesError ? (
          <View className="mt-10">
            <Text className="text-white text-center">Error: {moviesError?.message}</Text>
          </View>
        ) : (
          <View className="mt-5 flex-1">
            <SearchBar placeholder="Search movies, TV shows..." 
            onPress={() => router.push("/search")
            }/>
             <>
            <Text className="text-white text-lg font-bold mb-3 mt-5">Latest Movies</Text>
             <FlatList
             data={movies}
             renderItem={({item}) => (
              <MovieCard {...item} />
             )}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={{justifyContent: 'flex-start', gap:20 , paddingRight:5,
                marginBottom:20
              }}  
              className="mt-2 pb-32"
              scrollEnabled={false}
             />
            </>
          </View>
        )}
          
      </ScrollView>
    </View>
  );
}