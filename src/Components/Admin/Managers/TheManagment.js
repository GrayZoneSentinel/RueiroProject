import React, { Component } from 'react';

import AdminLayout from '../../../Hoc/AdminLayout';

import PlayerCard from '../../ui/playerCard';
import Fade from 'react-reveal/Fade';
import { firebaseManagers, firebase } from '../../../firebase';
import { firebaseLooper } from '../../ui/misc';
import { Promise } from 'core-js';

class TheManagement extends Component {

    state = {
        loading:true,
        managers: []
    } 

    componentDidMount() {
        firebaseManagers.once('value').then(snapshot => {
            const managers = firebaseLooper(snapshot);
            let promises = [];
            // console.log(managers)
            for( let key in managers ) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('managers')
                        .child(managers[key].image).getDownloadURL()
                        .then( url => {
                            managers[key].url = url;
                            resolve();
                        })
                    })
                )
            }
            Promise.all(promises).then( () => {
                this.setState({
                    loading:false,
                    managers
                })
            })
        })
    }

    showManagersByCargo = (cargo) => (
        this.state.managers
            ?
                this.state.managers.map(( manager, i ) => {
                    return manager.cargo === cargo
                        ?
                            <Fade left key={i}>
                                <div className="item">
                                    <PlayerCard
                                        number = {i++}
                                        name = {manager.nombre}
                                        lastname = {manager.primerApellido + manager.segundoApellido} 
                                        bck = {manager.url}
                                    />
                                </div>
                            </Fade>
                        :
                            null
                })
            :
                null
    )

    render() {
        // console.log(this.state.managers)
        return (
            <AdminLayout>
                <div className="the_team_container">
                    {
                        !this.state.loading
                        ?
                        <div>
                            <div>
                                <div className="team_category_wrapper">
                                    <div className="title">Chief Executice Officer</div>
                                    <div className="team_cards">
                                        {this.showManagersByCargo('CEO')}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="team_category_wrapper">
                                    <div className="title">Chief Operations Officer</div>
                                    <div className="team_cards">
                                        {this.showManagersByCargo('CEO')}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="team_category_wrapper">
                                    <div className="title">Chief Financial Officer</div>
                                    <div className="team_cards">
                                        {this.showManagersByCargo('CFO')}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                            null
                    }
                </div>
            </AdminLayout>
        );
    }
};

export default TheManagement;