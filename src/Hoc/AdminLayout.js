import React from 'react';

import AdminNav from '../Components/Admin/nav/AdminNav';
// import AdminFooter from '../Components/Footer/AdminFooter';

const AdminLayout = (props) => {
  return (
    <div>
    <div className="admin_container">
      <div className="admin_left_nav">
        <AdminNav/>
      </div>
      <div className="admin_right">
        {props.children}
      </div>
    </div>
    {/* <AdminFooter/> */}
    </div>
  )
}

export default AdminLayout;
