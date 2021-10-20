import AsyncStorage from '@react-native-async-storage/async-storage';

//Buscar filmes salvos
export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);
  let moviesSave = JSON.parse(myMovies) || [];

  return moviesSave;
}

//Salvar um novo filmes
export async function saveMovie(key, newMovie) {
  let moviesStorage = await getMoviesSave(key);
  //Se tiver algum filme salvo com o mesmo id ou duplicado ignora
  const hasMovie = moviesStorage.some((item) => item.id === newMovie);
  if (hasMovie) {
    console.log('Essefilme ja tem');
    return;
  }
  moviesStorage.push(newMovie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStorage));
}
//Deletar algum filme especifico

export async function deleteMovie(id) {
  let moviesStored = await getMoviesSave('@primereact');

  let myMovies = moviesStored.filter((item) => {
    return item.id !== id;
  });
  await AsyncStorage.setItem('@primereact', JSON.stringify(myMovies));
  return myMovies;
}

//Filtrar algum que está a salvo
export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave('@primereact');
  const hasMovie = moviesStored.find((item) => item.id === movie.id);
  if (hasMovie) {
    return true;
  }
  return false;
}
