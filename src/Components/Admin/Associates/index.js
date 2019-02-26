import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';


import { firebaseAssociates } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

import CircularProgress from '@material-ui/core/CircularProgress';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow style={{textTransform: 'uppercase'}}>
                                    <TableCell style={{width: 100}}><strong>Nombre</strong></TableCell>
                                    <TableCell style={{width: 120}}><strong>Apellidos</strong></TableCell>
                                    <TableCell><strong>Nacimiento</strong></TableCell>
                                    <TableCell><strong>DNI</strong></TableCell>
                                    <TableCell><strong>Teléfono</strong></TableCell>
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell><strong>Incorporación</strong></TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.associates 
                                        ?
                                        this.state.associates.map((associate,i) => (
                                            <TableRow key={i}>
                                                <TableCell style={{width: 100}}>{associate.nombre}</TableCell>
                                                <TableCell style={{width: 120}}>{associate.primerApellido} {associate.segundoApellido}</TableCell>
                                                <TableCell>{associate.fechaNacimiento}</TableCell>
                                                <TableCell>{associate.dni}</TableCell>
                                                <TableCell>{associate.telefono}</TableCell>
                                                <TableCell>{associate.correo}</TableCell>
                                                <TableCell>{associate.fechaIncorporacion}</TableCell>
                                                <TableCell>
                                                    <Link style={{color: '#008ee0'}} to={`/admin_associates/edit_associate/${associate.id}`}>
                                                        Editar -
                                                    </Link>  
                                                    <Link style={{color: '#008ee0'}} to={`/admin_associates/details_associate/${associate.id}`}>
                                                        - Detalles
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