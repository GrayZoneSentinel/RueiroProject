import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import { Link } from 'react-router-dom';


import { firebaseOffices } from '../../../firebase';
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


class Offices extends Component {

    state = {
        isloading: true,
        offices: []
    }

    componentDidMount() {
        firebaseOffices.once('value').then(snapshot =>{
            const offices = firebaseLooper(snapshot);

            this.setState({
                isloading: false,
                offices: reverseArray(offices)
            })
        });
    }

    render() {
        // console.log(this.state)
        return (
            <AdminLayout>
                <div style={{marginLeft:"40px"}}>
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Button style={{marginTop:"20px"}} variant="outlined" color="primary" href={`/admin_management/new_office`}>
                                Crear cargo
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={40}>
                        <Grid item xs={6}>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{textTransform: 'uppercase'}}>
                                            <TableCell style={{color: '#008ee0'}}><strong>ID</strong></TableCell>
                                            <TableCell style={{color: '#008ee0'}}><strong>Cargo</strong></TableCell>
                                            <TableCell style={{color: 'red'}}>Acciones</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.state.offices 
                                                ?
                                                this.state.offices.map((office,i) => (
                                                    <TableRow key={i}>
                                                        <TableCell>{office.abreviatura}</TableCell>
                                                        <TableCell>{office.cargo}</TableCell>
                                                        <TableCell>
                                                            <Link style={{color: 'green'}} to={`/admin_management/edit_office/${office.id}`}>
                                                                Editar
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                                :
                                                null
                                        }
                                    </TableBody>
                                </Table>
                                {/* Loader Spinner  */}
                                <div className="admin_progress">
                                    {
                                        this.state.isloading
                                        ?
                                            <CircularProgress thickness={8} style={{color:'#008ee0', padding:'50px', textAlign:'left'}}/>
                                        :
                                            ''
                                    }
                                </div>
                            </Paper>
                        </Grid>
                        
                    </Grid>
                    
                </div>
            </AdminLayout>
        )
    }
}

export default Offices;