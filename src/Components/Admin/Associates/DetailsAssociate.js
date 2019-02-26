import React, { Component } from 'react';
import AdminLayout from '../../../Hoc/AdminLayout';
import { Tag } from '../../ui/misc';
import Reveal from 'react-reveal';

import AssociateCards from './AssociateCards';

import { firebaseAssociates, firebaseDB, firebase } from '../../../firebase';

import CircularProgress from '@material-ui/core/CircularProgress';

class DetailsAssociate extends Component {

    state = {
        show: false
    }

  render() {
    return (
        <AdminLayout>
            <Reveal
                // onReveal = {()=>{
                //     console.log('revealed')
                // }}
                fraction={0.7}
                onReveal={()=>{
                    this.setState({
                        show: true
                    })
                }}
            >
                <div 
                    className="home_meetplayers"
                    // style={{background:`#ffffff url(${Stripes})`}}
                >  
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            <div className="home_card_wrapper">
                                <AssociateCards
                                    show={this.props.show}
                                />
                            </div>
                            <div className="home_text_wrapper">
                                <div>
                                    <Tag bck="#ffffff" size="20px" color="#0e1731" link={true} linkto={`/admin_associates/edit_associate/${this.props.associate.id}`}
                                        add={{
                                            display:'inline-block',
                                            marginBottom: '30px',
                                            border: '1px solid #0e1731'
                                        }}
                                    >
                                       Editar datos
                                    </Tag>
                                </div>
                                <div>
                                    <Tag bck="#ffffff" size="20px" color="red" link={true} linkto={`/admin_associates/edit_associate/${this.state.associate.id}`}
                                        add={{
                                            display:'inline-block',
                                            marginBottom: '30px',
                                            border: '1px solid red'
                                        }}
                                    >
                                      Baja asociado
                                    </Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>   
        </AdminLayout>
    )
  }
}

export default DetailsAssociate;
