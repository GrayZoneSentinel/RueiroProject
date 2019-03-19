import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
// UI STYLES IMPORTS
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// PAPER IMPORTS
import EventsPaper from '../../ui/eventsPaper';

class Events extends Component {
    render() {
        return (
            <AdminLayout>
                <div className="events_section">   
                    <h2>Tablero de actividades</h2>
                    <div className="events_wrapper">
                        <Grid container spacing={32}>
                            <Grid item xs={9}>
                                {/* <Grid><h3>Listado de actividades</h3></Grid> */}
                                {/* <Paper className="events_wrapper_left_filters_paper"> */}
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
                                <Paper className="events_wrapper_left">
                                    {/* BRING THE EVENTS CARDS LOOP */}
                                    <EventsPaper></EventsPaper>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className="events_wrapper_right">
                                    <Button style={{margin:"10px", minWidth: '180px', textAlign:"center"}}  variant="outlined" size="medium" color="primary" href="#">
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