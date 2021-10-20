import React from 'react';
import { View, Text } from 'react-native';
import { Container, BannerItem, Title, RateContainer, Rate } from './styles';
import { Ionicons } from '@expo/vector-icons';
function SliderItem({ data, navigatePage }) {
  return (
    <Container activeOpacity={0.7} onPress={() => navigatePage(data)}>
      <BannerItem
        source={{
          uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
        }}
      />
      <Title>{data?.title}</Title>
      <RateContainer>
        <Ionicons name="md-star" size={12} color="#E7A74e" />
        <Rate>{data?.vote_average}/10</Rate>
      </RateContainer>
    </Container>
  );
}

export default SliderItem;
