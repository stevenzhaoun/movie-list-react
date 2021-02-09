import { Box, Button, Chip, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { getImgUrl } from '../apiServices';
import StarIcon from '@material-ui/icons/Star';
import _ from 'lodash';

const MovieDetails = ({
  id,
  posterPath,
  title,
  releaseDate,
  overview,
  genres,
  movieRate,
  myRate,
  productionCompanies,
  onRate
}) => {
  const [rateValue, setRateValue] = useState(1);
  return (
    <Box display="flex">
      <img src={posterPath} alt={title} style={{ width: '400px', flexBasis: '50%' }} />
      <Box ml={4}>
        <Typography variant="h3" >
          {title}
        </Typography>
        <Box my={1}>
          <Typography variant="h6" gutterBottom>Release date:</Typography>
          <Typography variant="body1">
            {releaseDate}
          </Typography>
        </Box>
        <Box my={1}>
          <Typography variant="h6" gutterBottom>Overview:</Typography>
          <Typography variant="body1">
            {overview}
          </Typography>
        </Box>
        <Box my={1}>
          <Typography variant="h6" gutterBottom>Genres:</Typography>
          <Box display="flex" alignItems='center' flexWrap="wrap">
            {genres.map(genre => {
              return <Box mr={1} key={genre.id}><Chip label={genre.name} style={{ backgroundColor: "#01b4e4", color: 'white' }} /></Box>
            })}
          </Box>
        </Box>
        <Box my={1}>
          <Typography variant="h6" gutterBottom>Average Rating:</Typography>
          <Box display="flex" alignItems="center">
            <StarIcon style={{ color: "#f5c518" }} />
            <Box ml={1}>
              <Typography variant="body1">
                {movieRate}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box my={1}>
          <Typography variant="h6">Your Rating:</Typography>
          <Box>
            <Typography variant="body1">{myRate ? myRate : 'Not yet'}</Typography>
            <Box display="flex" alignItems="center">
              <Select value={rateValue} onChange={e => setRateValue(e.target.value)}>
                {_.range(1, 11).map(num => <MenuItem key={num} value={num}>{num}</MenuItem>)}
              </Select>
              <Box ml={3}>
                <Button variant="outlined" onClick={() => onRate(id, rateValue)}>Rate it!</Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box my={1}>
          <Typography variant="h6" gutterBottom>Production Companies:</Typography>
          <Box display="flex" alignItems='center' flexWrap="wrap">
            {productionCompanies.map(company => {
              return (
                <Box mr={2} key={company.id} display="flex" flexDirection="column" justifyContent="space-between">
                  <img alt={company.name} src={getImgUrl(company.logo_path)} width="50px" height="30" style={{ objectFit: 'cover' }} />
                  <Typography variant="body2">{company.name}</Typography>
                </Box>)
            })}
          </Box>
        </Box>


      </Box>
    </Box>
  )
}

export default MovieDetails
