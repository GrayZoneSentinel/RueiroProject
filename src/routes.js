import React from 'react';
import Layout from './Hoc/Layout';
import { Switch } from 'react-router-dom';

// FRONT END //
import Home from './Components/Home';
import SignIn from './Components/Signin';
import Dashboard from './Components/Admin/Dashboard';
import AdminMatches from './Components/Admin/Matches';
import AddEditMatch from './Components/Admin/Matches/addEditMatch';

// BACK END //
//===== Path routes =====//
import PrivateRoute from './Components/authRoutes/privateRoutes';
import PublicRoute from './Components/authRoutes/publicRoutes';
//===== Associates routes =====//
import AdminAssociates from './Components/Admin/Associates';
import AddEditAssociate from './Components/Admin/Associates/AddEditAssociate';
import DetailsAssociate from './Components/Admin/Associates/DetailsAssociate';
//===== Managers routes =====//
import Managers from './Components/Admin/Managers';
import AddEditManager from './Components/Admin/Managers/AddEditManager';
import TheManagement from './Components/Admin/Managers/TheManagment';
import Offices from './Components/Admin/Managers/Offices';
import AddEditOffice from './Components/Admin/Managers/OfficeAddEdit';
//===== Events routes =====//
import Events from './Components/Admin/Events';
//===== News routes =====//
import News from './Components/Admin/News';


const Routes = (props) => {
  // console.log(props)
  return (
    <Layout>
      <Switch>
        {/* //===== NEWS ==== */}
        <PrivateRoute {...props} path="/admin_news" exact component={News}/>
        {/* //===== EVENTS ==== */}
        <PrivateRoute {...props} path="/admin_events" exact component={Events}/>
        {/* //===== MANAGEMENT ==== */}
        {/* //===== Offices ==== */}
        <PrivateRoute {...props} path="/admin_management/edit_office/:id" exact component={AddEditOffice}/>
        <PrivateRoute {...props} path="/admin_management/new_office" exact component={AddEditOffice}/>
        <PrivateRoute {...props} path="/admin_management/offices" exact component={Offices}/>
        {/* //===== Managers ==== */}
        <PrivateRoute {...props} path="/admin_management/the_management" exact component={TheManagement}/>
        <PrivateRoute {...props} path="/admin_management/new_manager" exact component={AddEditManager}/>
        <PrivateRoute {...props} path="/admin_management/edit_manager/:id" exact component={AddEditManager}/>
        <PrivateRoute {...props} path="/admin_management" exact component={Managers}/>
        {/* //===== ASSOCIATES ==== */}
        <PrivateRoute {...props} path="/admin_associates/details_associate/:id" exact component={DetailsAssociate}/>
        <PrivateRoute {...props} path="/admin_associates/new_associate" exact component={AddEditAssociate}/>
        <PrivateRoute {...props} path="/admin_associates/edit_associate/:id" exact component={AddEditAssociate}/>
        <PrivateRoute {...props} path="/admin_associates" exact component={AdminAssociates}/>
        {/* //===== MOCK ROUTES ==== */}
        <PrivateRoute {...props} path="/admin_members/new_member" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_members/edit_member/:id" exact component={AddEditMatch}/>
        <PrivateRoute {...props} path="/admin_members" exact component={AdminMatches}/>
        {/* //===== DASHBOARD ==== */}
        <PrivateRoute {...props} path="/dashboard" exact component={Dashboard}/>
        {/* //===== SIGN IN ==== */}
        <PublicRoute {...props} restricted={true} path="/sign_in" exact component={SignIn}/>
        {/* //===== FRONT END ==== */}
        <PublicRoute {...props} restricted={false} path="/" exact component={Home}/>
      </Switch>
    </Layout>
  );
}

export default Routes;

