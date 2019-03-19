import React from 'react';
// import Button from '@material-ui/core/Button';
import Otamendi from '../../Resources/images/players/Otamendi.png';
// Incorporate a table to display the Associate data
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const EventCard = (props) => {
    return (
        <div className="event_card_wrapper">
          <div className="event_card_wrapper_left">
            <div className="event_card_wrapper_thumbnail">
                <img className="event_card_wrapper_thumbnail" src={Otamendi} alt="event thumbnail"/>
            </div>
          </div>
          <div className="event_card_wrapper_right">
            <div className="event_card_nfo">
              <h3>TÍTULO DE LA ACTIVIDAD</h3>    
              <Table style={{width:'90%', marginLeft:'20px'}}>
                <TableBody>
                    <TableRow>
                      <TableCell >
                        Fecha de celebración:
                      </TableCell>
                      <TableCell>
                        Fecha de celebración
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Fecha de anuncio:
                      </TableCell>
                      <TableCell>
                        Fecha 
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Plazo de inscripción:
                      </TableCell>
                      <TableCell>
                        Estado del plazo de inscripción 
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Fecha de cierre inscripciones:
                      </TableCell>
                      <TableCell>
                        Fecha de cierre
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Fecha de anuncio:
                      </TableCell>
                      <TableCell>
                        Fecha 
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Plazas mínimas: nº mín 
                      </TableCell>
                      <TableCell>
                        Plazas máximas: nº mín 
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
              <div className="event_card_number">
                  {props.number}
              </div>
              <div className="event_card_name">
                  <span>{props.name}</span>
                  <span>{props.lastname}</span>
              </div>
              </div>
          </div>
            
        </div>
    );
};

export default EventCard;