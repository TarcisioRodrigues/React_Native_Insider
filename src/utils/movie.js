//gera uma lista de filmes do tamanho que desejar

export function getListMovies(size, movies) {
  let popularMovies = [];

  for (let i = 0, l = size; i < 1; i++) {
    popularMovies.push(movies[i]);
  }
  return popularMovies;
}

//Gerar um numero aleatorio com base no tamanho da lista

export function randomBanner(movies) {
  return Math.floor(Math.random() * movies.length);
}
