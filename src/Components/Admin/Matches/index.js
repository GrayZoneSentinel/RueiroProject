import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../Hoc/AdminLayout';


import { firebaseMatches } from '../../../firebase';
import { firebaseLooper, reverseArray } from '../../ui/misc';

import CircularProgress from '@material-ui/core/CircularProgress';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class AdminMatches extends Component {

    state = {
        isloading: true,
        matches: []
    }

    componentDidMount() {
        firebaseMatches.once('value').then(snapshot =>{
            const matches = firebaseLooper(snapshot);

            this.setState({
                isloading: false,
                matches: reverseArray(matches)
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
                                <TableRow>
                                    <TableCell><strong>Fecha</strong></TableCell>
                                    <TableCell><strong>Partido</strong></TableCell>
                                    <TableCell><strong>Resultado</strong></TableCell>
                                    <TableCell><strong>Final</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.matches 
                                        ?
                                        this.state.matches.map((match,i) => (
                                            <TableRow key={i}>
                                                <TableCell>{match.date}</TableCell>
                                                <TableCell>
                                                    <Link to={`/admin_members/edit_member/${match.id}`}>
                                                        {match.away} <strong>-</strong> {match.local}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    {match.resultAway} <strong>-</strong> {match.resultLocal}
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        match.final === "Yes"
                                                            ?
                                                            <span className="matches_tag_green">Finalizado</span>
                                                            :
                                                            <span className="matches_tag_red">Pendiente</span>
                                                    }
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

export default AdminMatches;