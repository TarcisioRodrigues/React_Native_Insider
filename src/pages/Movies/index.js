import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import FavoriteItem from '../../components/FavoriteItem';
import { Container, ListMovies } from './styles';
import { getMoviesSave, deleteMovie } from '../../utils/storage';
import { useNavigation, useIsFocused } from '@react-navigation/native';
function Movies() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies() {
      const result = await getMoviesSave('@primereact');
      if (isActive) {
        setMovies(result);
      }
    }
    if (isActive) {
      getFavoriteMovies();
    }
    return () => {
      isActive = false;
    };
  }, [isFocused]);
  async function handleDelete(id) {
    const result = await deleteMovie(id);
    setMovies(result);
  }
  function navigate(item) {
    navigation.navigate('Detail', { id: item.id });
  }
  return (
    <Container>
      <Header title="Meus Filmes" />
      <ListMovies
        showVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={() => navigate(item)}
          />
        )}
      />
    </Container>
  );
}
export default Movies;
