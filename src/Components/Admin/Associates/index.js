import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';


import { firebaseAssociates } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

import CircularProgress from '@material-ui/core/CircularProgress';

import LookDetailIcon from '../../../Resources/images/icons/magnifier-tool.png';
import EditIcon from '../../../Resources/images/icons/edit.png';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';



class AdminAssociates extends Component {

    state = {
        isloading: true,
        associates: []
    }

    componentDidMount() {
        firebaseAssociates.once('value').then(snapshot =>{
            const associates = firebaseLooper(snapshot);

            this.setState({
                isloading: false,
                associates: reverseArray(associates)
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
                             <Button style={{margin:"20px 20px 30px 20px"}}  variant="contained" color="primary" href={`/admin_associates/new_associate`}>
                                Añadir asociado
                            </Button>
                            <Button style={{margin:"20px 20px 30px 20px"}}  variant="contained" color="primary" href='#'>
                                Enviar correo global
                            </Button>
                        </Grid>
                    </Grid>
                    <Paper style={{width:'80%'}}>
                        <Table style={{tableLayout: 'auto'}}>
                            <TableHead>
                                <TableRow style={{textTransform: 'uppercase'}}>
                                    <TableCell style={{color: '#008ee0'}}><strong>Nombre</strong></TableCell>
                                    <TableCell style={{color: '#008ee0'}}><strong>Apellidos</strong></TableCell>
                                    <TableCell style={{color: '#008ee0'}}><strong>Teléfono</strong></TableCell>
                                    <TableCell style={{color: '#008ee0'}}><strong>Email</strong></TableCell>
                                    <TableCell style={{textAlign:'center', color:'red'}}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.associates 
                                        ?
                                        this.state.associates.map((associate,i) => (
                                            <TableRow key={i}>
                                                <TableCell>{associate.nombre}</TableCell>
                                                <TableCell style={{fontWeight:"600"}}>{associate.primerApellido} {associate.segundoApellido}</TableCell>
                                                <TableCell>{associate.telefono}</TableCell>
                                                <TableCell>{associate.correo}</TableCell>
                                                <TableCell style={{align:"center"}}> 
                                                    <Link style={{color: '#62a2d3'}} to={`/admin_associates/details_associate/${associate.id}`}>
                                                        <img className="tableIcon" src={LookDetailIcon} alt="Ver" title="Detalles"/>
                                                    </Link>
                                                    <Link style={{color: '#62a2d3'}} to={`/admin_associates/edit_associate/${associate.id}`}>
                                                         <img className="tableIcon" src={EditIcon} alt="Editar" title="Editar"/>
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

export default AdminAssociates;