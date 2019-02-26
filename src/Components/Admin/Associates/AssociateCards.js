import React, { Component } from 'react';

import { easePolyOut } from 'd3-ease';
import Animate from 'react-move/Animate';

import Otamendi from '../../../Resources/images/players/Otamendi.png';

import { firebaseAssociates, firebaseDB, firebase } from '../../../firebase';

import AssociateCard from '../../ui/associateCard';


class AssociateCards extends Component {

    state = {
        show: this.props.show,
        cards: [
            {
                bottom: 90,
                left: 300
            },
            {
                bottom: 60,
                left: 200
            },
            // {
            //     bottom: 30,
            //     left: 100
            // },
            // {
            //     bottom: 0,
            //     left: 0
            // }
        ],
        // isloading:true,
        associateId: '',
        defaultImg: '',
        associate: {
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            dni: '',
            fechaNacimiento: '',
            fechaIncorporacion: '',
            telefono: '',
            correo: '',
            image: ''
        }
    }

    cardFields = ( associate, associateId, defaultImg ) => {

        const newAssociateData = { ...this.state.associate }

        for(let key in newAssociateData) {
            newAssociateData[key].value = associate[key];
            // newAssociateData[key].valid = true;
        } 
        
        this.setState({
            associateId,
            defaultImg,
            associate: newAssociateData
        })
    }

    showAnimateCards = () => (
        this.state.cards.map((card,i)=>(
            <Animate
                key={i}
                show={this.props.show}

                start={{
                    left:0,
                    bottom:0
                }}

                enter={{
                    left: [card.left],
                    bottom: [card.bottom],
                    timing: {delay: 1000, duration: 1500, ease: easePolyOut}
                }}
            >
                {({ left, bottom })=>{
                    return (
                        <div
                            style={{
                                position: 'absolute',
                                left,
                                bottom
                            }}
                        >
                            <AssociateCard
                                // fechaIncorporacion="30"
                                // nombre="Nicolas"
                                // primerApellido="Otamendi"
                                // bck={Otamendi}
                                fechaIncorporacion={this.cardFields.fechaIncorporacion}
                                nombre={this.cardFields.name}
                                primerApellido={this.cardFields.primerApellido}
                                bck={Otamendi}
                            />
                        </div>
                    )
                }}
            </Animate>
        ))
    )

    componentDidMount(){
        const associateId = this.props.match.params.id;
        firebaseDB.ref(`associates/${associateId}`).once('value')
            .then(snapshot => {
                const associateData = snapshot.val();
                firebase.storage().ref('associates')
                .child( associateData.image ).getDownloadURL()
                .then( url => {
                    // this.state({
                    //     ...associateData
                    // })
                    this.cardFields( associateData, associateId, url)
                    // this.updateFields( associateData, associateId, 'Editar asociado' , url );
                    // this.setState({isloading:false})
                }).catch( e => {
                    // this.state({
                    //     ...associateData,
                    //     image:''
                    // }, associateId )
                })
            })
    }

    render() {
        return (
            <div>
                {this.showAnimateCards()}
            </div>
        );
    }
}

export default AssociateCards;