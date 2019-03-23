import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import Otamendi from '../../Resources/images/players/Otamendi.png';
// Incorporate a table to display the Associate data
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import TableFooter from '@material-ui/core/TableFooter';
import ControlledExpansionPanels from '../ui/expandableComponent';

const EventCard = (props) => {
    return (
        <div className="event_card_wrapper">
          <Grid container spacing={8}>
             <Grid item xs={2}>
              <div className="event_card_wrapper_left">
                <div className="event_card_wrapper_thumbnail">
                  {/* <img className="event_card_wrapper_thumbnail" src={Otamendi} alt="event thumbnail"/> */}
                </div>
              </div>
             </Grid>
             <Grid item xs={8}>
              <div className="event_card_wrapper_right">
                <div className="event_card_nfo">
                  <h3>{props.titulo}</h3>    
                  <Table style={{width:'100%'}}>
                    <TableBody>
                        <TableRow>
                          <TableCell colspan={2} style={{lineHeight:'1.5rem', fontSize:'14px', width:'100%', textAlign:'justify', padding:'15px 5px'}}>
                            {props.description}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colspan={2}>
                             Fecha de celebración:  {props.fechaCelebracion} 
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{width:'50%'}}>
                            Plazas mínimas: {props.minAvalaibleAttendance} 
                          </TableCell>
                          <TableCell style={{width:'50%'}}>
                            Plazas máximas: {props.maxAvalaibleAttendance} 
                          </TableCell>
                        </TableRow>
                    </TableBody>
                    {/* <TableFooter> */}
                    {/* </TableFooter> */}
                  </Table>
                  <div className="expand_info_card">
                    <ControlledExpansionPanels/>
                  </div>
                  {/* <div className="expand_info_card">
                    <ControlledExpansionPanels/>
                  </div> */}
                </div>
              </div>
             </Grid>
             <Grid item xs={2} style={{textAlign:"center"}}>
                <Button style={{textAlign:"center", padding:'20px 0px', marginTop:'50px', marginBottom:'10px', width:'100%'}}  size="small" variant="contained" color="default" href="#">
                  Promoción
                </Button>
                <Button style={{textAlign:"center", padding:'20px 0px', marginBottom:'10px', width:'100%'}} size="small" variant="contained" color="primary" href="#">
                  Edición
                </Button>
                <Button style={{textAlign:"center", padding:'20px 0px', width:'100%'}}  size="small" variant="contained" color="secondary" href="#">
                  Cancelar
                </Button>
             </Grid>
          </Grid>   
        </div>
    );
};

export default EventCard;