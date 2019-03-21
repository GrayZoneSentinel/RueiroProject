import React, { Component } from 'react';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import AdminLayout from '../../../Hoc/AdminLayout';

import Grid from '@material-ui/core/Grid';

import { firebaseEvents , firebaseDB } from '../../../firebase';

class AddEditEvent extends Component {

    state = {
        eventId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        formdata: {
            titulo: {
                element: 'input',
                value: '',
                config: {
                    label: 'Nombre del evento',
                    name: 'nombre_evento_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            fechaCelebracion: {
                element: 'input',
                value: '',
                config: {
                    label: 'Fecha de celebración',
                    name: 'fechaCelebracion_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            maxAvalaibleAttendance: {
                element: 'input',
                value: '',
                config: {
                    label: 'Nº máx. de asistentes',
                    name: 'maxAvalaibleAttendance_input',
                    type: 'number'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            minAvalaibleAttendance: {
                element: 'input',
                value: '',
                config: {
                    label: 'Nº mín. de asistentes',
                    name: 'minAvalaibleAttendance_input',
                    type: 'number'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            // attendees: {
            //     element: 'input',
            //     value: '',
            //     config: {
            //         label: 'Inscripciones',
            //         name: 'attendees_input',
            //         type: 'number'
            //     },
            //     validation: {
            //         required: false
            //     },
            //     valid: false,
            //     validationMessage: '',
            //     showlabel: true
            // },
            description: {
                element: 'input',
                value: '',
                config: {
                    label: 'Descripción evento',
                    name: 'eventDescription_input',
                    type: 'text'
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            }
        }
    }

    updateForm(element, content = '') {
        // console.log(element)
        const newFormdata = {...this.state.formdata}
        const newElement = {...newFormdata[element.id]}

        if( content === ''){
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content
        }
    
        // console.log(validData)
        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;
        // console.log(newFormdata)

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    updateFields( event, type, eventId ) {
        const newFormdata = {
            ...this.state.formdata
        }
        for(let key in newFormdata) {
            if(event) {
                newFormdata[key].value = event[key];
                newFormdata[key].valid = true;
            }
        } 
        
        this.setState({
            eventId,
            formType: type,
            formdata: newFormdata
        })
    }

    successForm(message){
        this.setState({
            formSuccess: message
        });
        setTimeout(()=>{
            this.setState({
                formSuccess: ''
            });
        }, 2000)
    }

    submitForm(event) {
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata) {
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            // console.log(dataToSubmit)
            if(this.state.formType === 'Editar evento'){
                firebaseDB.ref(`events/${this.state.eventId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Evento actualizado')
                }).catch((e)=>{
                    this.setState({ formError: true })
                })
            } else {
                // add event
                firebaseEvents.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_events');
                }).catch((e)=>{
                    this.setState({formError:true})
                })
            }
        } else {
            // console.log('Error')
            this.setState({
                formError: true
            })
        }
    }

    componentDidMount() {
        const eventId = this.props.match.params.id;
        const getEvent = (event, type) => {
            // firebase.once('value').then(snapshot => {
            //     const teams = firebaseLooper(snapshot);
            //     const teamOptions = [];
                // snapshot.forEach((childSnapshot)=>{
                //     teamOptions.push({
                //         key: childSnapshot.val().shortName,
                //         value: childSnapshot.val().shortName
                //     })
                // });
            this.updateFields( event, type, eventId )
        }
        // console.log(matchId);
        if(!eventId){
            //Add matchID
            getEvent(false, 'Agregar evento')
        } else {
            firebaseDB.ref(`events/${eventId}`).once('value')
            .then((snapshot)=>{
                const event = snapshot.val();
                getEvent(event, 'Editar evento')
            })
        }
    }

  render() {
    return (
      <AdminLayout>
        <div className="editassociate_dialog_wrapper">
            <h2>
                {this.state.formType}
            </h2>
            <div>
                <form onSubmit={(event)=> this.submitForm(event)}>
                    <Grid container spacing={24}>
                            <Grid item xs={12} sm={8}>
                                <FormField
                                    id={'titulo'}
                                    formdata={this.state.formdata.titulo}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={8}>
                                <FormField
                                    id={'description'}
                                    formdata={this.state.formdata.description}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormField
                                    id={'fechaCelebracion'}
                                    formdata={this.state.formdata.fechaCelebracion}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                 <FormField
                                    id={'maxAvalaibleAttendance'}
                                    formdata={this.state.formdata.maxAvalaibleAttendance}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormField
                                    id={'minAvalaibleAttendance'}
                                    formdata={this.state.formdata.minAvalaibleAttendance}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </Grid>
                            {/* <Grid item xs={12} sm={4}>
                                <FormField
                                    id={'attendees'}
                                    formdata={this.state.formdata.attendees}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </Grid> */}
                            
                    </Grid>
                    
                    <div className="success_label">{this.state.formSuccess}</div>
                    {
                        this.state.formError
                        ?
                            <div className="error_label">
                                Error: por favor, revisa los datos del evento.
                            </div>
                        :
                            ''
                    }
                    <div className="admin_submit">
                        <button onClick={(event)=> this.submitForm(event)}>
                            {this.state.formType}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      </AdminLayout>
    )
  }
}

export default AddEditEvent;