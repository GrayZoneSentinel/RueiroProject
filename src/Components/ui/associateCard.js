import React from 'react';

const AssociateCard = (props) => {
    return (
        <div className="player_card_wrapper">
            <div 
                className="player_card_thmb"
                style={{background:`#f2f9ff url(${props.bck})`}}
            ></div>
            <div className="player_card_nfo">
                <div className="player_card_number">
                    {props.fechaIncorporacion}
                </div>
                <div className="player_card_name">
                    <span>{props.nombre}</span>
                    <span>{props.primerApellido}</span>
                </div>
            </div>
        </div>
    );
};

export default AssociateCard;