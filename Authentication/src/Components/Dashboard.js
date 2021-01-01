import React from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';
const Dashboard = () => {
  const history = useHistory();
  const logout = () => {
    Cookies.remove('userToken');
    history.push('/')
  };
  return (
    <div className='h-full'>
      <Result
        status='success'
        title='Successfully Logged In!'
        extra={[
          <Button type='primary' key={'logout'} onClick={logout}>
            Logout
          </Button>,
        ]}
      />
      ,
    </div>
  );
};

export default Dashboard;
