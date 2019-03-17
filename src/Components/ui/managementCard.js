
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

// Incorporate a table to display the Associate data
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const styles = {
  card: {
    widht: '420px'
  },
  media: {
    // objectFit: 'scale-down',
    objectFit: 'contain',
    padding: '10px',
  },
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      {/* <CardActionArea> */}
        <CardMedia
          component="img"
          alt={props.primerApellido + ` foto`}
          className={classes.media}
          height="250"
          // image={props.image}
          src={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{color:'#62a2d3'}}>
            {props.nombre + ` ` +  props.primerApellido + ` ` +  props.segundoApellido}
          </Typography>
          <Table>
            <TableHead style={{padding: '0px 20px 0px 20px', textAlign:"center", color:'#62a2d3'}}>{props.cargo}</TableHead>
            <TableBody>
              <TableRow style={{padding: '0px 20px 0px 20px'}}>
                <TableCell style={{padding: '0px 20px 0px 20px', textAlign:"right"}}>
                    DNI: 
                </TableCell>
                <TableCell style={{padding: '0px 20px 0px 20px'}}>
                     {props.dni}
                </TableCell>
              </TableRow>
              <TableRow style={{padding: '0px 20px 0px 20px'}}>
                <TableCell style={{padding: '0px 20px 0px 20px', textAlign:"right"}}>
                    Fecha de nombramiento:
                </TableCell>
                <TableCell style={{padding: '0px 20px 0px 20px'}}>
                    {props.fechaNombramiento}
                </TableCell>
              </TableRow> 
              <TableRow style={{padding: '0px 20px 0px 20px'}}>
                <TableCell style={{padding: '0px 20px 0px 20px', textAlign:"right"}}>
                    Teléfono:
                </TableCell>
                <TableCell style={{padding: '0px 20px 0px 20px'}}>
                    {props.telefono}
                </TableCell>
              </TableRow>
              <TableRow style={{padding: '0px 20px 0px 20px'}}>
                <TableCell style={{padding: '0px 20px 0px 20px', textAlign:"right"}}>
                    Correo: 
                </TableCell>
                <TableCell style={{padding: '0px 20px 0px 20px'}}>
                    {props.correo}
                </TableCell>
              </TableRow>
              {/* <TableRow style={{padding: '0px 20px 0px 20px'}}>
                <TableCell style={{padding: '0px 20px 0px 20px', textAlign:"right"}}>
                    Fecha de incorporación:
                </TableCell>
                <TableCell style={{padding: '0px 20px 0px 20px'}}>
                    {props.fechaIncorporacion}
                </TableCell>
              </TableRow>   */}
            </TableBody>
          </Table>
        </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button size="small" color="primary">
          Enviar mail
        </Button>
        <Button size="small" color="primary">
          Aviso
        </Button>
        {/* <Button size="small" color="secondary" style={{marginLeft:'50px'}}>
          Cerrar
        </Button> */}
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgMediaCard);