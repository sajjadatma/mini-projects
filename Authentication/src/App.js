import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { PrivateRoute } from './PrivateRoute';
import Cookies from 'js-cookie';
function App() {
  const history = useHistory();
  useEffect(() => {
    const CheckLogin = () => {
      return Cookies.get('userToken') ? history.push('/dashboard') : null;
    };
    CheckLogin();
  }, [history]);

  return (
    <div className='h-screen bg-gray-200'>
      <Switch>
        <Route exact path='/' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
