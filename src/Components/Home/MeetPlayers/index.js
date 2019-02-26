import React, { Component } from 'react';

import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/misc';

import Reveal from 'react-reveal';

import HomeCards from './Cards';

class MeetPlayers extends Component {

    state = {
        show: false
    }

  render() {
    return (
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
                style={{background:`#ffffff url(${Stripes})`}}
            >  
                <div className="container">
                    <div className="home_meetplayers_wrapper">
                        <div className="home_card_wrapper">
                            <HomeCards
                                show={this.props.show}
                            />
                        </div>
                        <div className="home_text_wrapper">
                            <div>
                                <Tag bck="#0e1731" size="70px" color="#ffffff"
                                    add={{
                                        display:'inline-block',
                                        marginTop: '30px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    Conoce
                                </Tag>
                            </div>
                            <div>
                                <Tag bck="#0e1731" size="70px" color="#ffffff"
                                    add={{
                                        display:'inline-block',
                                        marginBottom: '20px',
                                    }}
                                >
                                    a nuestro
                                </Tag>
                            </div>
                            <div>
                                <Tag bck="#0e1731" size="80px" color="#ffffff"
                                    add={{
                                        display:'inline-block',
                                        marginBottom: '30px',
                                    }}
                                >
                                    personal
                                </Tag>
                            </div>
                            <div>
                                <Tag bck="#ffffff" size="20px" color="#0e1731" link={true} linkto="/the_members"
                                    add={{
                                        display:'inline-block',
                                        marginBottom: '30px',
                                        border: '1px solid #0e1731'
                                    }}
                                >
                                    Accede a nuestra plantilla desde aquí
                                </Tag>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    )
  }
}

export default MeetPlayers;
