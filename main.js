let pagina = 1;

let btnAnterior = document.getElementById('btnAnterior');
let btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener("click", () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
})

btnAnterior.addEventListener("click", () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
})

let cargarPeliculas = async() => {
    document.documentElement.scrollTop = 0;
    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f95af6bd44cd222e483074017be70f54&language=en-US&page=${pagina}`);

        //Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas = peliculas + `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h4>${pelicula.title}</h4>
                </div>
                `;
            })
            document.getElementById('container').innerHTML = peliculas;
        } else if (respuesta.status === 401) {
            console.log('Error de tipeo');
        } else if (respuesta.status === 404) {
            console.log('La película no existe');
        } else {
            console.log('Algo salió mal :/');
        }

    } catch(error) {
        console.log(error);
    }

}

cargarPeliculas();