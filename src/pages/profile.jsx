import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Box, Chip, Container, Divider, Paper, Typography } from '@mui/material'
import  Pokemontable from '../components/pokemontable'
import { useNavigate } from 'react-router-dom'

export const Profile = ({pokemonData}) => {
const {name, sprites, moves} = pokemonData || {}
const navigate = useNavigate()

useEffect(() => {
    if (!pokemonData) {
      navigate("/");
    }
  }, []);

  if (!pokemonData) {
    return null;
  }
    
    return (
    <>
    <Navbar hidesearch/>   
    <Container maxWidth="md">
        <Paper elevation={3}>
            <Box display="flex" flexDirection= "column" alignItems= "center" margin={10} >
                <Typography variant='h4'>{name}</Typography>
                <Box display= "flex" alignItems= "center" width= "100%" marginBottom= "15px" sx={{flexDirection: {xs: "column", md: "row"}}}>
                <Box component="img" src={sprites.front_default} width ="70%" height="100%"/>
                <Pokemontable pokemonData={pokemonData}/>    
                </Box>  

                <Box width="100%">
                    <Divider><Chip label="Stats" size="medium" /></Divider>
                    <Box display="flex" justifyContent="center" flexWrap="wrap" gap={2} marginTop="15px">
                    {pokemonData.stats.map((statItem, index) => (
                        <Chip key={index} label={`${statItem.stat.name.toUpperCase()}: ${statItem.base_stat}`} color="#cc0000" variant="outlined" sx={{ fontWeight: 'bold' }}/>
                    ))}
                    </Box>
                    <br/>
                    <Divider><Chip label="Variations" size="medium" /></Divider>
                    <Box display="flex"  justifyContent="center" gap={2} flexWrap="wrap">
                            {sprites.front_shiny && (
                            <Box component="img" src={sprites.front_shiny} width="30%" height="30%" />
                            )}
                            {sprites.front_female && (
                            <Box component="img" src={sprites.front_female} width="30%" height="30%" />
                            )}
                            {sprites.front_shiny_female && (
                            <Box component="img" src={sprites.front_shiny_female} width="30%" height="30%" />
                            )}
                    </Box>
                    <Divider><Chip label="Abilities" size="medium" /></Divider>
                    <Box textAlign="center" marginTop="15px">
                        {moves.map((moveData, key) => (
                        <Chip key={key} sx={{ m: "5px" }} label={moveData.move.name} />
                        ))}
                    </Box>
                </Box>   
            </Box>
        </Paper>
        
    </Container>
    </>
    )  
}