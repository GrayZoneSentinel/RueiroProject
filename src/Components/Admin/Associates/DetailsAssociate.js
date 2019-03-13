import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';

import Card from '../../ui/detailCard';
import Fade from 'react-reveal/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';



import { firebaseDB, firebase } from '../../../firebase';
// import { firebaseLooper } from '../../ui/misc';
// import { Promise } from 'core-js';
// import { resolve } from 'q';

class DetailsAssociate extends Component {

    state = {
        isLoading: true,
        // associates: [],
        associateId: '',
        defaultImage: '',
        associateData: {
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            dni: '',
            correo: '',
            telefono: '',
            fechaNacimiento: '',
            fechaIncorporacion: '',
            image: ''
        }
    }

    componentDidMount() {
        const associateId = this.props.match.params.id

        firebaseDB.ref(`associates/${associateId}`).once('value')
        .then(snapshot => {
            const associateData = snapshot.val();
            firebase.storage().ref('associates')
            .child( associateData.image ).getDownloadURL()
            .then( url => {
                this.setState({ associateData, associateId, url } );
                this.setState({isloading:false})
                // console.log(associateData.image)
            })
        })
    }

    render() {
        // console.log(this.state.associateData);
        return (
            <AdminLayout>
                <div className="detailsAssociate">
                    <div>
                        {/* Loader Spinner  */}
                        {
                            this.state.isloading
                            ?
                                <div className="admin_progress">
                                    <CircularProgress thickness={4} style={{color:'#008ee0'}}/>
                                </div>
                            :
                             <Fade>
                                <Card
                                    imagen = {this.state.associateData.image}
                                    nombre = {this.state.associateData.nombre}
                                    primerApellido = {this.state.associateData.primerApellido}
                                    segundoApellido = {this.state.associateData.segundoApellido}
                                    dni = {this.state.associateData.dni}
                                    correo = {this.state.associateData.correo}
                                    telefono = {this.state.associateData.telefono}
                                    fechaIncorporacion = {this.state.associateData.fechaIncorporacion}
                                />
                             </Fade>
                                
                                            
                        }
                    </div>
                </div>
            </AdminLayout>
        )
    }
}

export default DetailsAssociate;
