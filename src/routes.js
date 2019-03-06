import React from 'react';
import Layout from './Hoc/Layout';

import { Switch } from 'react-router-dom';

import Home from './Components/Home';
import SignIn from './Components/Signin';
import Dashboard from './Components/Admin/Dashboard';
import AdminMatches from './Components/Admin/Matches';
import AddEditMatch from './Components/Admin/Matches/addEditMatch';

import AdminAssociates from './Components/Admin/Associates';
import AddEditAssociate from './Components/Admin/Associates/AddEditAssociate';
import DetailsAssociate from './Components/Admin/Associates/DetailsAssociate';

import Managers from './Components/Admin/Managers';
import AddManager from './Components/Admin/Managers/AddManager';
import EditManager from './Components/Admin/Managers/EditManager';
import Offices from './Components/Admin/Managers/Offices';
import AddEditOffice from './Components/Admin/Managers/OfficeAddEdit';

import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';

const Routes = (props) => {

  // console.log(props)

  return (
    <Layout>
      <Switch>
        
        <PrivateRoute {...props} path="/admin_management/edit_office/:id" exact component={AddEditOffice}/>
        <PrivateRoute {...props} path="/admin_management/new_office" exact component={AddEditOffice}/>
        <PrivateRoute {...props} path="/admin_management/offices" exact component={Offices}/>
        <PrivateRoute {...props} path="/admin_management/edit_manager/:id" exact component={EditManager}/>
        <PrivateRoute {...props} path="/admin_management/new_manager" exact component={AddManager}/>
        <PrivateRoute {...props} path="/admin_management" exact component={Managers}/>

        <PrivateRoute {...props} path="/admin_associates/new_associate" exact component={AddEditAssociate}/>
        <PrivateRoute {...props} path="/admin_associates/details_associate/:id" exact component={DetailsAssociate}/>
        <PrivateRoute {...props} path="/admin_associates/edit_associate/:id" exact component={AddEditAssociate}/>
        <PrivateRoute {...props} path="/admin_associates" exact component={AdminAssociates}/>

        <PrivateRoute {...props} path="/admin_members/new_member" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_members/edit_member/:id" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_members" exact component={AdminMatches}/>
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn}/>
        <PublicRoute {...props} restricted={false} path="/" exact component={Home}/>
      </Switch>
    </Layout>
  );
}

export default Routes;

