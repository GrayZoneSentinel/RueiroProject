import React from 'react';
// import Button from '@material-ui/core/Button';
// import Otamendi from '../../Resources/images/players/Otamendi.png';
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
                {/* <img className="event_card_wrapper_thumbnail" src={Otamendi} alt="event thumbnail"/> */}
            </div>
          </div>
          <div className="event_card_wrapper_right">
            <div className="event_card_nfo">
              <h3>{props.titulo}</h3>    
              <Table style={{width:'98%', marginLeft:'20px'}}>
                <TableBody>
                    <TableRow>
                      <TableCell >
                        Fecha de celebración:
                      </TableCell>
                      <TableCell>
                        {props.fechaCelebracion}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Fecha de anuncio:
                      </TableCell>
                      <TableCell>
                        {props.fechaCelebracion} 
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Plazas mínimas: {props.minAvalaibleAttendance} 
                      </TableCell>
                      <TableCell>
                        Plazas máximas: {props.maxAvalaibleAttendance} 
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
              </div>
          </div>
            
        </div>
    );
};

export default EventCard;