import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
import { Feather } from '@expo/vector-icons';
import { Container, SearchContainer, SearchButton, Input } from './styles';
function Home() {
  return (
    <Container>
      <Header title="React Prime" />
      <SearchContainer>
        <Input placeholder="Ex:Vingadores" />
        <SearchButton>
          <Feather name="search" size={30} color="#FFF" />
        </SearchButton>
      </SearchContainer>
    </Container>
  );
}

export default Home;
