import React from 'react';

import { RueiroLogo } from '../ui/icons';

const Footer = () => {
    return (
        <footer className="bck_lblue">
            <div className="footer_logo">
                <RueiroLogo 
                    link={true}
                    linkTo="/" 
                    width="140px"
                    height="120px"
                />
            </div>
            <div className="footer_disc">
                Club Familiar Rueiro ® 2019
            </div>
        </footer>
    );
};

export default Footer;