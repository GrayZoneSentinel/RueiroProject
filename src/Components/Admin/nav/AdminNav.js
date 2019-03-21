import React from 'react';
import { Link } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';

import { firebase } from '../../../firebase';

const AdminNav = () => {

    const links = [
        {
            title: 'Socios',
            linkTo: '/admin_members'
        },
        {
            title: 'Asociados',
            linkTo: '/admin_associates'
        },
        {
            title: 'Gestión',
            linkTo: '/admin_management'
        },
        {
            title: 'Actividades',
            linkTo: '/admin_events'
        },
        {
            title: 'Noticias',
            linkTo: '/admin_news'
        },
        {
            title: 'Finanzas',
            linkTo: '/admin_finance'
        }
    ]


    const style = {
        color: '#ffffff',
        fontWeight: '100',
        borderBottom: '1px solid #ffffff',
        paddingTop: '15px',
        fontSize: '14px'
    }

    const styleLogOut = {
        color: 'red',
        fontWeight: '500',
        borderBottom: '1px solid #ffffff'
    }

    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.title}>
                <ListItem button style={style}>
                    {link.title}
                </ListItem>
            </Link>
        ))
    );

    const logoutHandler = () => {
        firebase.auth().signOut().then(()=>{
            console.log('Log out succesfull')
        }, (error)=>{
            console.log('Error logging out')
        })
    }

  return (
    <div>
      {renderItems()}
      <ListItem button style={styleLogOut} onClick={()=> logoutHandler()}>Cerrar sesión</ListItem>
    </div>
  )
};

export default AdminNav;
