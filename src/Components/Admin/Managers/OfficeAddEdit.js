import React, { Component } from 'react';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import AdminLayout from '../../../Hoc/AdminLayout';

import { firebaseOffices, firebaseDB, firebase } from '../../../firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

class AddOffice extends Component {

    state = {
        isloading:true,
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
                    required: false
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

    updateForm(element, content = ''){
        // console.log(element)
        const newFormdata = {...this.state.formdata}
        const newElement = {...newFormdata[element.id]}

        if( content === 'Editar'){
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

    updateFields = ( office, officeId, type ) => {

        const newFormdata = { ...this.state.formdata }

        for(let key in newFormdata) {
            newFormdata[key].value = office[key];
            newFormdata[key].valid = true;
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
            if(this.state.formType === 'Editar'){
                firebaseDB.ref(`offices/${this.state.officeId}`)
                .update(dataToSubmit).then(()=>{
                    this.successForm('Actualizado')
                }).catch((e)=>{
                    this.setState({ formError: true })
                })
            } else {
                // add match
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
       
        if( !officeId ) {
            this.setState({
                isloading:false,
                formType: 'Crear cargo'
            })
        } else {
            firebaseDB.ref(`offices/${officeId}`).once('value')
            .then(snapshot => {
                const officeData = snapshot.val();
                // firebase.storage().ref('managers')
                // .child( managerData.image ).getDownloadURL()
                // .then( url => {
                this.updateFields( officeData, officeId, 'Editar' );
                this.setState({isloading:false})
                // }).catch( e => {
                //     this.updateFields({
                //         ...managerData
                //         // image:''
                //     }, managerId, 'Editar cargo', '' )
                // })
            })
        }

    }

  render() {
    //console.log(this.state.formdata)
    return (
      <AdminLayout>
            <div className="editassociate_dialog_wrapper">
                <h2>
                    {this.state.formType}
                </h2>
                <div>
                    {/* Loader Spinner  */}
                    {
                        this.state.isloading
                        ?
                            <div className="admin_progress">
                                <CircularProgress thickness={8} style={{color:'#008ee0'}}/>
                            </div>
                        :
                            <form onSubmit={(event)=> this.submitForm(event)}>
                                <Grid container spacing={24}>
                                    
                                    <Grid item xs={12} sm={7}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={4}>
                                                <FormField
                                                    id={'Abreviatura'}
                                                    formdata={this.state.formdata.abreviatura}
                                                    change={(element)=> this.updateForm(element)}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={4}>
                                                <FormField
                                                    id={'Cargo'}
                                                    formdata={this.state.formdata.cargo}
                                                    change={(element)=> this.updateForm(element)}
                                                />
                                            </Grid>
                                        </Grid>
                                        
                                        <div className="success_label">{this.state.formSuccess}</div>
                                        {
                                            this.state.formError
                                            ?
                                                <div className="error_label">
                                                    Error: por favor, determina un cargo.
                                                </div>
                                            :
                                                ''
                                        }
                                        <div className="admin_submit">
                                            <button onClick={(event)=> this.submitForm(event)}>
                                                {this.state.formType}
                                            </button>
                                        </div>
                                    </Grid>
                                    
                                </Grid>
                        </form>
                    }
                </div> 
            </div>
      </AdminLayout>
    )
  }
}

export default AddOffice;