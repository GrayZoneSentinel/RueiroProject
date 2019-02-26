import React, { Component } from 'react';

//Import the appbar from materialUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';

//Import the link module from react-dom
// import { Link } from 'react-router-dom';

//Import the reusable logo component
import { RueiroLogo } from '../ui/icons';

class Header extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        style={{
            backgroundColor: '#ffffff',
            boxShadow: 'none',
            padding: '10px',
            borderBottom: '1px solid #00285e'
        }}
      >
            <Toolbar style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                    <div className="header_logo">
                        <RueiroLogo
                            link={true} 
                            linkTo="/"
                            width="140px"
                            height="120px"
                        />
                    </div>
                </div>
                {/* <Link to="/the_members">
                    <Button color="primary"> Socios </Button>
                </Link>
                <Link to="/the_events">
                    <Button color="primary"> Actividades </Button>
                </Link>
                <Link to="/the_news">
                    <Button color="primary"> Noticias </Button>
                </Link>
                <Link to="/the_management">
                    <Button color="primary"> Management </Button>
                </Link> */}
            </Toolbar>  
      </AppBar>
    )
  }
}

export default Header;