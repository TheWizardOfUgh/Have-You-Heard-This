import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from "./Components/Login.js"
import Launch from "./Components/Launch.js"
//import UserInfo from "./Components/UserInfo.js" ---> implement this!!
import Nav from "./Components/Nav.js"
import data from "./constants/index.js";
import secret from "./constants/secret.js";
import {getAccessToken, fetchProfile, updateProfile} from './auth_pkce'

function App() {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
          const accessToken = await getAccessToken(data.CLIENT_ID, secret.CLIENT_SECRET, code, data.REDIRECT_URI);
          const userProfile = await fetchProfile(accessToken);
          setProfile(userProfile);
          //console.log(accessToken);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {profile ? (
        <div>
          <Launch profile={profile}/>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
