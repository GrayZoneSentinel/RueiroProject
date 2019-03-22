import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
// UI STYLES IMPORTS
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// PAPER IMPORTS
import EventsPaper from '../../ui/eventsPaper';
// FIREBASE IMPORTS
import { firebaseEvents } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

class Events extends Component {

    state = {
        isLoading:true,
        events: []
    }

    componentDidMount() {
        firebaseEvents.once('value').then(snapshot =>{
            const events = firebaseLooper(snapshot);

            this.setState({
                isloading: false,
                events: reverseArray(events)
            })
        });
    }

    render() {
        return (
            <AdminLayout>
                <div className="events_section">   
                    <h2>Tablero de actividades</h2>
                    <div className="events_wrapper">
                        <Grid container spacing={32}>
                            <Grid item xs={9}>
                                    <div className="events_wrapper_left_filters_paper">
                                        <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  size="small" color="default" href="#">
                                            Todas
                                        </Button>
                                        <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  size="small" color="primary" href="#">
                                            Previstas
                                        </Button>
                                        <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}} size="small" color="secondary" href="#">
                                            Pasadas
                                        </Button>
                                    </div>
                                {/* </Paper> */}
                                    {  this.state.events 
                                                ?
                                                    this.state.events.map((event,i) => (
                                                        <Paper className="events_wrapper_left" key={i}>
                                                            <EventsPaper
                                                                titulo = {event.titulo}
                                                                description = {event.description}
                                                                fechaCelebracion = {event.fechaCelebracion}
                                                                minAvalaibleAttendance = {event.minAvalaibleAttendance}
                                                                maxAvalaibleAttendance = {event.maxAvalaibleAttendance}
                                                            />
                                                        </Paper>
                                                    ))
                                                :
                                                null  
                                    }          
                                
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className="events_wrapper_right">
                                    <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  variant="outlined" size="medium" color="primary" href="/admin_events/new_event">
                                        Nueva actividad
                                    </Button>
                                    <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  variant="outlined" size="medium" color="primary" href="#">
                                        Buscar actividad
                                    </Button>
                                    <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  variant="outlined" size="medium" color="primary" href="#">
                                        Promoción
                                    </Button>
                                    <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  variant="outlined" size="medium" color="primary" href="#">
                                        Encargados
                                    </Button>
                                    <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  variant="outlined" size="medium" color="primary" href="#">
                                        Localizaciones
                                    </Button>
                                    <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  variant="outlined" size="medium" color="default" href="#">
                                        Estadísticas
                                    </Button>
                                    <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  variant="outlined" size="medium" color="secondary" href="#">
                                        Cancelar evento
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </AdminLayout>
        )
    }
}

export default Events;