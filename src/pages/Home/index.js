import React, { useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import SliderItem from '../../components/SliderItem';
import { Feather } from '@expo/vector-icons';
import api, { key } from '../../services/api';
import { getListMovies, randomBanner } from '../../utils/movie';
import {
  Container,
  SearchContainer,
  SearchButton,
  Input,
  Title,
  BannerButton,
  Banner,
  SliderMovie,
} from './styles';
import { useNavigation } from '@react-navigation/native';
function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bannerMovie, setBannerMovie] = useState({});
  const [input, setInput] = useState(' ');
  const navigation = useNavigation();

  useEffect(() => {
    let isActive = true;
    const ac = new AbortController(); //Para cancelar tudo
    async function getMovies() {
      // const response = await api.get('/movie/now_playing', {
      //     params: {
      //  api_key: key,
      //    language: 'pt-BR',
      //  page: 1,
      //   },
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/movie/popular', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1,
          },
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 2,
          },
        }),
      ]);
      if (isActive) {
        const nowList = getListMovies(10, nowData.data.results);
        const popularList = getListMovies(5, popularData.data.results);
        const topList = getListMovies(5, topData.data.results);
        setBannerMovie(
          nowData.data.results[randomBanner(nowData.data.results)]
        );
        setNowMovies(nowList);
        setPopularMovies(popularList);
        setTopMovies(topList);
        setLoading(false);
      }
    }

    getMovies();

    return () => {
      isActive = false;
      ac.abort();
    };
  }, []);
  function navigateDetailsPage(item) {
    navigation.navigate('Detail', { id: item.id });
  }

  function handleSearchMovie() {
    //Verificando
    if (input === '') {
      return;
    }

    navigation.navigate('Search', { name: input });
    setInput(' ');
  }
  //Renderizaão condicional
  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#FFF" />
      </Container>
    );
  }
  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input
          placeholder="Digite seu filme"
          placeholderTextColor="#DDD"
          value={input}
          OnChangeText={(text) => setInput(text)}
        />
        <SearchButton onPress={handleSearchMovie}>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        <BannerButton
          activeOpacity={0.8}
          onPress={() => navigateDetailsPage(bannerMovie)}
        >
          <Banner
            resizeMethod="resize"
            source={{
              uri: `https://image.tmdb.org/t/p/original/${bannerMovie.poster_path}`,
            }}
          />
        </BannerButton>
        <SliderMovie
          horizontal={true}
          data={nowMovies}
          showHorizontalIndicator={false}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          data={popularMovies}
          showHorizontalIndicator={false}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
        <Title>Mais votados</Title>
        <SliderMovie
          horizontal={true}
          data={topMovies}
          showHorizontalIndicator={false}
          renderItem={({ item }) => (
            <SliderItem
              data={item}
              navigatePage={() => navigateDetailsPage(item)}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
