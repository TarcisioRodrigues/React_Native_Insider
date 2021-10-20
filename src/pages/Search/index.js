import React, { useEffect, useState } from 'react';
import { Container, ListMovies } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SearchItem } from '../../components/SearchItem';
import api, { key } from '../../services/api';
function Search() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    let isActive = true;
    async function getSearchMovie() {
      const response = await api.get('/search/movie', {
        params: {
          query: route?.params.name,
          api_key: key,
          language: 'pt-BR',
          page: 1,
        },
        if(isActive) {
          setMovie(response.data.results);
          setLoading(false);
        },
      });
    }
    if (isActive) {
      getSearchMovie();
    }
    return () => {
      isActive = false;
    };
  }, []);
  function navigatieDetailsPage() {
    navigation.navigate('Detail', { id: item.id });
  }
  if (loading) {
    return <Container></Container>;
  }
  return (
    <Container>
      <ListMovies
        data={movie}
        showVerticalScrollIndicator={false}
        keyExtractor={(item) => String(item.id)}
        renderItem={(item) => (
          <SearchItem
            data={item}
            navigationPage={() => navigatieDetailsPage(item)}
          />
        )}
      />
    </Container>
  );
}

export default Search;
