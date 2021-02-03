import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
  media: {
    height: '500px'
  },
  content: {
    textAlign: 'center'
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  }
});
const MovieCard = ({
  id,
  imgSrc,
  title,
  rating,
  myRating,
  favorite,
  onToggleFavorite,
  onTitleClick,
}) => {
  const classes = useStyles();
  return (
    <Card raised>
      <CardMedia
        className={classes.media}
        image={imgSrc}
        title={title}
      />
      <CardActionArea onClick={() => onTitleClick(id)}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Box display="flex" alignItems="center">
          <StarIcon style={{ color: "#f5c518" }} />
          <Typography variant="body1">{myRating ? `${rating} / ${myRating}` : rating}</Typography>
        </Box>
        <Box display="flex" alignItems="center" onClick={() => onToggleFavorite(id)}>
          {favorite ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon style={{ color: "grey" }} />}
        </Box>
      </CardActions>
    </Card>
  )
}

export default MovieCard;
