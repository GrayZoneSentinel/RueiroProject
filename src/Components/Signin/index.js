import React, { Component } from 'react';

import FormField from '../ui/formFields';
import { validate } from '../ui/misc';

import { firebase } from '../../firebase';

class SignIn extends Component {

    state = {
        formError: false,
        formSuccess: '',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Escribe tu email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Escribe tu clave de acceso'
                },
                validation:{
                    required: true
                },
                valid: false,
                validationMessage: ''
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
            firebase.auth()
            .signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            ).then(()=>{
                // console.log('user is auth')
                this.props.history.push('/dashboard')
            }).catch(error =>{
                this.setState({
                    formError: true
                })
            })
        } else {
            // console.log('Error')
            this.setState({
                formError: true
            })
        }
        
    }

  render() {
    return (
      <div className="container">
        <div className="signin_wrapper" style={{margin:'100px'}}>
            <form onSubmit={(event)=> this.submitForm(event)}>
                <h2>Portal de acceso</h2>
                <FormField
                    id={'email'}
                    formdata={this.state.formdata.email}
                    change={(element)=> this.updateForm(element)}
                />
                <FormField
                    id={'password'}
                    formdata={this.state.formdata.password}
                    change={(element)=> this.updateForm(element)}
                />
                { 
                    this.state.formError 
                    ?
                        <div className="error_label">Hay algún error, inténtalo de nuevo.</div>
                    :
                        null
                }
                <button onClick={(event)=> this.submitForm(event)}>Acceder</button>
            </form>
        </div>
      </div>
    )
  }
}

export default SignIn;