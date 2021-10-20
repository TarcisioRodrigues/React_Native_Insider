import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  padding: 14px;
  padding-bottom: 16px;
  padding-right: 16px;
  width: 140px;
  height: 180px;
`;

export const BannerItem = styled.Image`
  width: 100%;
  height: 160px;
  border-radius: 8px;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: 14px;
  padding-top: 10px;
`;

export const RateContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rate = styled.Text`
  padding-left: 4px;
  color: #fff;
  font-size: 12px;
`;
