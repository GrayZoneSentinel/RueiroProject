import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { Link } from 'react-router-dom';

import { firebaseManagers } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

import CircularProgress from '@material-ui/core/CircularProgress';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import LookDetailIcon from '../../../Resources/images/icons/magnifier-tool.png';
import EditIcon from '../../../Resources/images/icons/edit.png';


class AdminManagers extends Component {

    state = {
        isloading: true,
        managers: []
    }

    componentDidMount() {
        firebaseManagers.once('value').then(snapshot =>{
            const managers = firebaseLooper(snapshot);

            this.setState({
                isloading: false,
                managers: reverseArray(managers)
            })
        });
    }

    render() {
        // console.log(this.state)
        return (
            <AdminLayout>
                <div>
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                             <Button style={{margin:"20px"}} variant="outlined" color="primary" href={`/admin_management/new_manager`}>
                                Añadir directivo
                            </Button>
                            <Button style={{margin:"20px"}} variant="outlined" color="primary" href={`/admin_management/offices`}>
                                Listado de cargos
                            </Button>
                            <Button style={{margin:"20px"}} variant="outlined" color="primary" href={`/admin_management/the_management`}>
                                Mapa
                            </Button>
                            {/* <Button style={{margin:"20px"}} variant="outlined" color="secondary">
                                Eliminar directivo
                            </Button> */}
                        </Grid>
                    </Grid>
                    <Paper style={{width:'70%'}}>
                        <Table style={{tableLayout: 'auto'}}>
                            <TableHead>
                                <TableRow style={{textTransform: 'uppercase'}}>
                                    <TableCell style={{width: 100, color: '#008ee0'}}><strong>Nombre</strong></TableCell>
                                    <TableCell style={{width: 120, color: '#008ee0'}}><strong>Apellidos</strong></TableCell>
                                    {/* <TableCell><strong>DNI</strong></TableCell> */}
                                    <TableCell style={{color: '#008ee0'}}><strong>Cargo</strong></TableCell>
                                    <TableCell style={{color: '#008ee0'}}><strong>Nombramiento</strong></TableCell>
                                    {/* <TableCell><strong>Teléfono</strong></TableCell> */}
                                    {/* <TableCell><strong>Email</strong></TableCell> */}
                                    <TableCell style={{color: 'red', textAlign:'center', padding: '0px 15px'}}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.managers 
                                        ?
                                        this.state.managers.map((manager,i) => (
                                            <TableRow key={i}>
                                                <TableCell style={{width: '100px'}}>{manager.nombre}</TableCell>
                                                <TableCell style={{width: '130px', fontWeight:'600'}}>{manager.primerApellido} {manager.segundoApellido}</TableCell>
                                                <TableCell>{manager.cargo}</TableCell>
                                                <TableCell>{manager.fechaNombramiento}</TableCell>
                                                <TableCell>
                                                    <Link style={{color: '#008ee0'}} to={`/admin_management/edit_manager/${manager.id}`}>
                                                        <img className="tableIcon" style={{textAlign:'left', marginLeft:'25px'}} src={LookDetailIcon} alt="Ver" title="Detalles"/>
                                                    </Link>
                                                    <Link style={{color: 'green'}} to={`/admin_management/edit_manager/${manager.id}`}>
                                                        <img className="tableIcon" style={{textAlign:'right', paddingRight:'15px'}} src={EditIcon} alt="Editar" title="Editar"/>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                        :
                                        null
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                    {/* Loader Spinner  */}
                    <div className="admin_progress">
                        {
                            this.state.isloading
                            ?
                                <CircularProgress thickness={4} style={{color:'#008ee0', padding:'50px'}}/>
                            :
                                ''
                        }
                    </div>
                </div>
            </AdminLayout>
        )
    }
}

export default AdminManagers;