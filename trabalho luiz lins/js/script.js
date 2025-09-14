function searchMovies() {
    const searchQuery = document.getElementById('movieSearch').value.trim();  // Captura o texto inserido na pesquisa
    const apiKey = '8ff48223';  //chave da API OMDb

    // Verifica se o campo de pesquisa não está vazio
    if (searchQuery === '') {
        document.getElementById('results').innerHTML = 'Por favor, insira o nome de um filme.';
        return;
    }

    // Constrói a URL da requisição com o título do filme
    const url = `http://www.omdbapi.com/?s=${searchQuery}&apikey=${apiKey}`;

    console.log('Requisição para URL:', url);  // Depuração

    // Faz a requisição à API OMDb
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição. Status: ' + response.status);  
            }
            return response.json();  // Converte a resposta para JSON
        })
        .then(data => {
            console.log('Resposta da API:', data);  

            if (data.Response === 'True') {
                displayResults(data.Search);  // Mostra os resultados se a resposta for positiva
            } else {
                document.getElementById('results').innerHTML = 'Nenhum filme encontrado.';
            }
        })
        .catch(error => {
            console.error('Erro:', error);  // Se houver erro na requisição
            document.getElementById('results').innerHTML = 'Ocorreu um erro. Tente novamente.';
        });
}

function displayResults(movies) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';  // Limpa os resultados anteriores1

    // mostra filme encontrado
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}" />
            <h3>${movie.Title}</h3>
            <p>Ano: ${movie.Year}</p>
            <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">Ver no IMDb</a>
        `;
        resultsContainer.appendChild(movieElement);
    });
}



