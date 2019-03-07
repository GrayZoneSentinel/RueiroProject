import React, { Component } from 'react';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import AdminLayout from '../../../Hoc/AdminLayout';

import Grid from '@material-ui/core/Grid';

import { firebaseOffices, firebaseDB } from '../../../firebase';

class AddEditOffice extends Component {

    state = {
        officeId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        formdata: {
            abreviatura: {
                element: 'input',
                value: '',
                config: {
                    label: 'Abreviatura',
                    name: 'abreviatura_input',
                    type: 'text'
                },
                validation: {
                    required: true,
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            cargo: {
                element: 'input',
                value: '',
                config: {
                    label: 'Cargo',
                    name: 'cargo_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            }
        }
    }

    updateForm(element){
        // console.log(element)
        const newFormdata = {...this.state.formdata}
        const newElement = {...newFormdata[element.id]}

        newElement.value = element.event.target.value;
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

    updateFields( office, type, officeId ) {
        const newFormdata = {
            ...this.state.formdata
        }
        for(let key in newFormdata) {
            if(office) {
                newFormdata[key].value = office[key];
                newFormdata[key].valid = true;
            }
        } 
        
        this.setState({
            officeId,
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
            if(this.state.formType === 'Editar cargo'){
                firebaseDB.ref(`offices/${this.state.officeId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Cargo actualizado')
                }).catch((e)=>{
                    this.setState({ formError: true })
                })
            } else {
                // add office
                firebaseOffices.push(dataToSubmit).then(()=>{
                    this.props.history.push('/admin_management/offices');
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
        const officeId = this.props.match.params.id;
        const getOffices = (office, type) => {
            // firebase.once('value').then(snapshot => {
            //     const teams = firebaseLooper(snapshot);
            //     const teamOptions = [];
                // snapshot.forEach((childSnapshot)=>{
                //     teamOptions.push({
                //         key: childSnapshot.val().shortName,
                //         value: childSnapshot.val().shortName
                //     })
                // });
            this.updateFields( office, type, officeId )
        }
        // console.log(matchId);
        if(!officeId){
            //Add matchID
            getOffices(false, 'Agregar cargo')
        } else {
            firebaseDB.ref(`offices/${officeId}`).once('value')
            .then((snapshot)=>{
                const office = snapshot.val();
                getOffices(office, 'Editar cargo')
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
                            <Grid item xs={4} sm={1}>
                                <FormField
                                    id={'abreviatura'}
                                    formdata={this.state.formdata.abreviatura}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <FormField
                                    id={'cargo'}
                                    formdata={this.state.formdata.cargo}
                                    change={(element)=> this.updateForm(element)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}></Grid>
                    </Grid>
                    
                    <div className="success_label">{this.state.formSuccess}</div>
                    {
                        this.state.formError
                        ?
                            <div className="error_label">
                                Error: por favor, revisa los datos del cargo.
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

export default AddEditOffice;