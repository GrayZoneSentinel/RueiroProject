import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';

import { firebasePromotions } from '../../../firebase';

class Enroll extends Component {

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
                    placeholder: 'Déjanos aquí tu email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    updateForm(element) {
        // console.log(element)
        const newFormdata = {...this.state.formdata}
        const newElement = {...newFormdata[element.id]}

        newElement.value = element.event.target.value;
        // console.log(validData)
        

        let validData = validate(newElement)
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1]

        newFormdata[element.id] = newElement;

        console.log(newFormdata)

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }

    resetFormSuccess(type) {
        const newFormdata = {...this.state.formdata}
        
        for(let key in newFormdata){
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].validationMessage = '';
        }

        this.setState({
            formError: false,
            formdata: newFormdata,
            formSuccess: type 
                            ? 
                            'Gracias, estamos encantados de enviarte más información. Pronto recibirás un correo nuestro.' 
                            :
                            'Este correo ya ha solicitado información previamente.'
        });
        this.successMessage();
    }

    successMessage() {
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            })
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
            //console.log(dataToSubmit)
            // this.resetFormSuccess()
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once("value")
            .then((snapshot)=>{
                //console.log(snapshot.val())
                if(snapshot.val() === null){
                    firebasePromotions.push(dataToSubmit);
                    this.resetFormSuccess(true);
                } else {
                    this.resetFormSuccess(false);
                }
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
            <Fade>
                <div className="enroll_wrapper">
                    <form onSubmit={(event)=> this.submitForm(event)}>
                        <div className="enroll_title">
                            Te contamos más
                        </div>
                        <div className="enroll_input">
                            <FormField
                                id={'email'}
                                formdata={this.state.formdata.email}
                                change={(element)=> this.updateForm(element)}
                            />
                            { 
                                this.state.formError 
                                ?
                                    <div className="error_label">Hay algún error, inténtalo de nuevo, por favor.</div>
                                :
                                    null
                            }
                            <div className="success_label">{this.state.formSuccess}</div>
                            <button onClick={(event)=> this.submitForm(event)}>Enviar</button>
                            <div className="enroll_discl">
                                <p>
                                    <strong>Atención: </strong> al enviar tu dirección de email consientes que Club Familiar Rueiro remita correos electrónicos informativos en atención a tu solicitud.
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;