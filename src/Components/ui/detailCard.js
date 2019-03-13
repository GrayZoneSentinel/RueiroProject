
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 500,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      {/* <CardActionArea> */}
        <CardMedia
          component="img"
          alt={props.primerApellido + `foto`}
          className={classes.media}
          height="250"
          image={props.imagen}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.nombre + ` ` +  props.primerApellido + ` ` +  props.segundoApellido}
          </Typography>
          <Typography component="p">
            DNI: {props.dni}
          </Typography>
          <Typography component="p">
            Teléfono: {props.telefono}
          </Typography>
          <Typography component="p">
            Correo: {props.correo}
          </Typography>
          <Typography component="p">
            Fecha de incorporación: {props.fechaIncorporacion}
          </Typography>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary">
          Enviar mail
        </Button>
        <Button size="small" color="primary">
          Marcar aviso
        </Button>
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);