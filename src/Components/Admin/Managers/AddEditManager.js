import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import FileUploader from '../../ui/fileuploader';
import { firebaseManagers, firebaseOffices, firebase, firebaseDB } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';


class AddEditManager extends Component {

    state = {
        isloading:true,
        managerId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        offices: [], 
        defaultImg:'',
        formdata: {
            nombre: {
                element: 'input',
                value: '',
                config: {
                    label: 'Nombre',
                    name: 'nombre_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            primerApellido: {
                element: 'input',
                value: '',
                config: {
                    label: 'Primer apellido',
                    name: 'primerApellido_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            segundoApellido: {
                element: 'input',
                value: '',
                config: {
                    label: 'Segundo apellido',
                    name: 'segundoApellido_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            dni: {
                element: 'input',
                value: '',
                config: {
                    label: 'DNI',
                    name: 'dni_input',
                    type: 'text'
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            telefono: {
                element: 'input',
                value: '',
                config: {
                    label: 'Teléfono',
                    name: 'telefono_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            correo: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'correo_input',
                    type: 'email',
                },
                validation: {
                    required: false
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            fechaNombramiento: {
                element: 'input',
                value: '',
                config: {
                    label: 'Nombramiento',
                    name: 'fechaNombramiento_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            cargo: {
                element: 'select',
                value: '',
                config: {
                    label: 'Cargo',
                    name: 'select_cargo',
                    type: 'select',
                    options: [
                        // {
                        //     key: "Yes",
                        //     value: "Yes"
                        // },
                        // {
                        //     key: "No",
                        //     value: "No"
                        // }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showlabel: true
            },
            image:{
                element:'image',
                value:'',    
                validation:{
                    required:false
                },
                valid:false
            } 
        }
    }

    updateForm(element, content = '') {
        // console.log(element)
        const newFormdata = {...this.state.formdata};
        const newElement = {...newFormdata[element.id]};

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

    updateFields = ( manager, officesOptions, offices, type, managerId ) => {
        const newFormdata = { ...this.state.formdata }
        for(let key in newFormdata) {
            if(manager) {
                newFormdata[key].value = manager[key];
                newFormdata[key].valid = true;
            }
            if(key === 'cargo') {
                newFormdata[key].config.options = officesOptions
            }
        } 
        // console.log(newFormdata)
        this.setState({
            managerId,
            formType: type,
            // defaultImg,
            formdata: newFormdata,
            offices
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

        this.state.offices.forEach((office)=>{
            if(office.abreviatura === dataToSubmit.cargo){
                dataToSubmit['cargo'] = office.abreviatura
            }
            if(office.cargo === dataToSubmit.cargo){
                dataToSubmit['cargo'] = office.cargo
            }
        })

        if(formIsValid){
            // add manager
            firebaseManagers.push(dataToSubmit).then(()=>{
            this.props.history.push('/admin_management');
            }).catch((e)=>{
                this.setState({formError:true})
            })            
        } else {
            this.setState({
                formError: true
            })
        }   
    }
 
    componentDidMount() {
        const managerId = this.props.match.params.id;
        // console.log(managerId)
        const getOffices = (manager, type) => {
            firebaseOffices.once('value').then(snapshot => {
                const offices = firebaseLooper(snapshot);
                // console.log(offices)
                const officesOptions = [];
                snapshot.forEach((childSnapshot)=>{
                    officesOptions.push({
                        key: childSnapshot.val().abreviatura,
                        value: childSnapshot.val().cargo
                    })
                });
                // console.log(officesOptions)
                this.updateFields( manager, officesOptions, offices, type, managerId )
            })
        }

        if(!managerId){
    //         this.setState({
    //             isloading:false,
    //             // formType: 'Agregar Directivo'
    //         })
    //         getCargos(false)
        } else {
            firebaseDB.ref(`managers/${managerId}`).once('value')
            .then((snapshot) => {
                const manager = snapshot.val();
                // console.log(manager);
                getOffices(manager, 'Editar directivo')
                this.setState({
                    isloading:false
                })
    //             firebase.storage().ref('managers')
    //             .child( managerData.image ).getDownloadURL()
    //             .then( url => {
    //                 this.updateFields( managerData, managerId, 'Editar directivo' , url );
    //                 this.setState({isloading:false})
    //             }).catch( e => {
    //                 this.updateFields({
    //                     ...managerData,
    //                     image:''
    //                 }, managerId, 'Editar directivo', '' )
    //             })
            })
        }
    }
    

    // resetImage = () => {
    //     const newFormdata = {...this.state.formdata}
    //     newFormdata['image'].value = '';
    //     newFormdata['image'].valid= false;
    //     this.setState({
    //         defaultImg: '',
    //         formdata: newFormdata
    //     }) 
    // }

    // storeFilename = (filename) => {
    //     this.updateForm({id:'image'}, filename)
    // }

  render() {
    //console.log(this.state.formdata)
    return (
      <AdminLayout>
            <div className="editassociate_dialog_wrapper">
                <h2>
                    {this.state.formType}
                </h2>
                <div>
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
                                                id={'nombre'}
                                                formdata={this.state.formdata.nombre}
                                                change={(element)=> this.updateForm(element)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormField
                                                id={'primerApellido'}
                                                formdata={this.state.formdata.primerApellido}
                                                change={(element)=> this.updateForm(element)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormField
                                                id={'segundoApellido'}
                                                formdata={this.state.formdata.segundoApellido}
                                                change={(element)=> this.updateForm(element)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={4}>
                                            <FormField
                                                id={'dni'}
                                                formdata={this.state.formdata.dni}
                                                change={(element)=> this.updateForm(element)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                                <FormField  
                                                id={'fechaNombramiento'}
                                                formdata={this.state.formdata.fechaNombramiento}
                                                change={(element)=> this.updateForm(element)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormField
                                                id={'cargo'}
                                                formdata={this.state.formdata.cargo}
                                                change={(element)=> this.updateForm(element)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={24}>
                                        <Grid item xs={12} sm={4}>
                                            <FormField
                                                id={'telefono'}
                                                formdata={this.state.formdata.telefono}
                                                change={(element)=> this.updateForm(element)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={7}>
                                            <FormField
                                                id={'correo'}
                                                formdata={this.state.formdata.correo}
                                                change={(element)=> this.updateForm(element)}
                                            />
                                        </Grid>
                                    </Grid>

                                    <div className="success_label">{this.state.formSuccess}</div>
                                    {
                                        this.state.formError
                                        ?
                                            <div className="error_label">
                                                Error: por favor, revisa los datos del nuevo directivo.
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
                                <Grid item xs={12} sm={5}>
                                    <FileUploader
                                        dir="managers"
                                        tag={"Foto directivo"}
                                        defaultImg={this.state.defaultImg}
                                        defaultImgName={this.state.formdata.image.value}
                                        resetImage={()=> this.resetImage()}
                                        filename={(filename)=> this.storeFilename(filename)}
                                    />
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

export default AddEditManager;
