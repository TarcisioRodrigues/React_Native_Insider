import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import Header from '../components/Header';
import SliderItem from '../components/SliderItem';
import { Feather } from '@expo/vector-icons';
import api, { key } from '../../services/api';
import { getListMovies } from '../../utils/movie';
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
function Home() {
  const [nowMovies, setNowMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    let isActive = true;
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
      const nowList = getListMovies(10, nowData.data.results);
      const popularList = getListMovies(5, popularData.data.results);
      const topList = getListMovies(5, topData.data.results);
      setNowMovies(nowList);
      setPopularMovies(popularList);
      setTopMovies(topList);
    }

    getMovies();
  }, []);

  return (
    <Container>
      <Header title="React Prime" />

      <SearchContainer>
        <Input placeholder="Ex:Vingadores" />
        <SearchButton>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>
        <BannerButton activeOpacity={0.8} onPress={() => alert('Teste')}>
          <Banner
            resizeMethod="resize"
            source={{
              uri: 'https://images.unsplash.com/photo-1632914026261-0b9fa8665c36?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            }}
          />
        </BannerButton>
        <SliderMovie
          horizontal={true}
          data={nowMovies}
          showHorizontalIndicator={false}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />
        <Title>Populares</Title>
        <SliderMovie
          horizontal={true}
          data={popularMovies}
          showHorizontalIndicator={false}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />
        <Title>Mais votados</Title>
        <SliderMovie
          horizontal={true}
          data={topMovies}
          showHorizontalIndicator={false}
          renderItem={({ item }) => <SliderItem data={item} />}
          keyExtractor={(item) => String(item.id)}
        />
      </ScrollView>
    </Container>
  );
}

export default Home;
