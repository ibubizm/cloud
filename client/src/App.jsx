import { NavBar } from "./components/navbar/navbar";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Registration } from './components/authorithation/registration'
import { Redirect } from "react-router";
import { Login } from './components/authorithation/login'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./actions/user";
import { Disk } from "./components/disk/disk";

function App() {
  const { isAuth } = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
  }, [])


  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        {!isAuth ?
          <Switch>
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
          :
          <Switch>
            <Route exect path="/" component={Disk} />
            <Redirect to="/" />
          </Switch>
        }
      </div>
    </BrowserRouter>

  );
}

export default App;
