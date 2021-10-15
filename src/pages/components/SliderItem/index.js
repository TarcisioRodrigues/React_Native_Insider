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
      <Title numberOfLines={1}>{data.title}</Title>
    </Container>
  );
}

export default SliderItem;
