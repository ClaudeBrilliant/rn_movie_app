//track the searches made by users
import { Client, Databases, ID, Query } from 'react-native-appwrite';

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') 
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
   try {

    const result = await database.listDocuments(databaseId, collectionId, [
        Query.equal('searchTerm', query)
    ]);

    if(result.documents.length > 0) {
        const existingMovie = result.documents[0];

        await database.updateDocument(
            databaseId, 
            collectionId, 
            existingMovie.$id, {
            count: existingMovie.count + 1
        });
    } else {
        await database.createDocument(
            databaseId, collectionId, ID.unique(), {
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            title: movie.title,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        });
    }
    // const result = await
//check if a recored of that search if installed
//if a document is found increament the searchCount field
//if no document found 
// create a new document in appwrite db with searchCount field set to 1
    } catch (error) {
    console.error('Error updating search count:', error);
   }
};

export const getTrendingMovies = async () :Promise<TrendingMovie[] | undefined> => {
    try{
        const result = await database.listDocuments(databaseId, collectionId, [
            Query.orderDesc('count'),
            Query.limit(5),
        ]);
        return result.documents as unknown as TrendingMovie[];
    }
    catch(error){
        console.error('Error fetching trending movies:', error);
        return [];
    }
}