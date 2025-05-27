import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Pokemoncard from '../components/Pokemoncard'
import { Box, Button, Container, Grid, Skeleton } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Home = ({setpokemonData}) => {
    const [pokemons, setpokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const pokemonsPerPage = 102;
    const maxPokemon = 1025; 
    const totalPages = Math.ceil(maxPokemon / pokemonsPerPage);

  useEffect(() => {
    getPokemons();
  }, [page]);

  const getPokemons = () => {
    setIsLoading(true);
    const start = (page - 1) * pokemonsPerPage + 1;
    const end = Math.min(start + pokemonsPerPage - 1, maxPokemon);

    const endpoints = [];
    for (let i = start; i <= end; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }

    axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setpokemons(res);
        setAllPokemons(res);
        setIsLoading(false);
      });
  };
        
    const pokemonFilter = (value) => {
    if (value.trim() === "") {
      setpokemons(allPokemons);
      return;
    }
    
        const filtered = allPokemons.filter(pokemon => {
        const nameMatches = pokemon.data.name.includes(value.toLowerCase());
        const idMatches = pokemon.data.id.toString().includes(value);
        return nameMatches || idMatches;
         });

  setpokemons(filtered);
};
            
    const pokemonpickhandler = (pokemonData) =>{
        setpokemonData(pokemonData)
        navigate("/profile")
    }

        return (
        <div>
            <Navbar pokemonFilter={pokemonFilter}/>
            <Container maxWidth ="xg">
            <Grid container spacing={3}>
                    {pokemons.length === 0 ? (Array.from({ length: 102 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
                <Skeleton data-testid ="pokemon-skeleton" variant="rectangular" width={210} height={118} />
              </Grid>
            ))
        ):(
            pokemons.map((pokemon, key) => (
            <Grid size={{xs: 12, sm: 6, md: 4, lg: 2}} key={key}>
                <Box onClick={() => pokemonpickhandler(pokemon.data)}>
                <Pokemoncard name={pokemon.data.name} id={pokemon.data.id} type={pokemon.data.types.map(t => t.type.name).join(', ')} image={pokemon.data.sprites.front_default}/>
                </Box>
            </Grid>
        ))) 
        }         
            </Grid>

        <Box display="flex" justifyContent="center" alignItems="center" mt={4} gap={2}>
          <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 1} sx={{ backgroundColor: '#ff1c1c', '&:hover': { backgroundColor: '#cc0000' }}} >
            Anterior
          </Button>
          <span>Página {page} de {totalPages}</span>
          <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page === totalPages} sx={{ backgroundColor: '#ff1c1c', '&:hover': { backgroundColor: '#cc0000' }}}>
            Próxima
          </Button>
        </Box>

            </Container>  
        </div>
    )
}