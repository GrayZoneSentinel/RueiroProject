import React from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../Resources/images/logos/logo.png';

export const RueiroLogo = (props) => {
    
    const template = <div 
        className="img_cover"
        style={{
            width: props.width,
            height: props.height,
            background: `url(${Logo}) no-repeat`
        }}
    >
    </div>
    
    if(props.link) {
        return (
            <Link to={props.linkTo} className="link_logo">
                {template}
            </Link>
        )
    } else {
        return template
    }

} 