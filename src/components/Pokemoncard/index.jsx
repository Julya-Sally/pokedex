import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export default function Pokemoncard({name, id, type , image}) {
    const getTypeColor = (type) => {
    const colors = {
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
      normal: '#A8A878',
    };

    return colors[type.toLowerCase()] || '#000';
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image= {image}
          alt= {name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name} 
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ID: {id} <br/>
          </Typography>
          <Typography variant="caption">
            Type:{' '}
            {type.split(', ').map((type, index) => (
              <span
                key={index}
                style={{ color: getTypeColor(type), marginRight: 8 }}>
                {type}
              </span>  
            ))} 
              </Typography>
              
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
  
}
