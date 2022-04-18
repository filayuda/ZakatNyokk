import React, { useContext, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './page/Landing'
import Template1 from './page/Template1'
import MenuBar from './components/MenuBar';
import Temp from './components/content/Temp';
import Profile from './components/content/Profile';
import MyLink from './components/content/MyLink';
import AddLink from './components/content/AddLink';
import KalkulatorZakat from './components/content/KallkulatorZakat';
import FormZakat from './components/content/FormZakat';

import { UserContext } from './context/userContext'
import { API, setAuthToken } from './config/api'
import EditLink from './components/content/EditLink';
import Template2 from './page/Template2';

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else {
      navigate('/landing')
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "failed",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "success",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path='/landing' element={<Landing />} />
      {/* <Route path="/" element={<MenuBar />}> */}
      <Route path="KalkulatorZakat" element={<KalkulatorZakat />} />
      <Route path="FormZakat" element={<FormZakat />} />
      <Route path="templates" element={<Temp />} />
      <Route path="profile" element={<Profile />} />
      <Route path="mylink" element={<MyLink />} />
      <Route path="addlink/:id" element={<AddLink />} />
      <Route path="editlink/:id" element={<EditLink />} />
      {/* </Route> */}
      <Route path='/template/1/:id' element={<Template1 />} />
      <Route path='/template/2/:id' element={<Template2 />} />
    </Routes >
  );
}

export default App;
