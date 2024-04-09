import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header.js"

function Launch({profile}){
    console.log(profile)
    return (
        <>
        <BrowserRouter>
            <Header />
            <div className="profile">
                {profile && (
                    <>
                        <h2>Logged in as <span>{profile.display_name}</span></h2>
                        {profile.images && profile.images.length > 0 && (
                            <img width="200" src={profile.images[0]?.url} alt="Profile" />
                        )}
                        <ul>
                            <li>User ID: <span>{profile.id}</span></li>
                            <li>Email: <span>{profile.email}</span></li>
                            {profile.external_urls && profile.external_urls.spotify && (
                                <li>Spotify URI: <a href={profile.external_urls.spotify}>{profile.external_urls.spotify}</a></li>
                            )}
                            {profile.images && profile.images.length > 0 && (
                                <li>Profile Image: <span>{profile.images[0]?.url}</span></li>
                            )}
                        </ul>
                    </>
                )}
                {!profile && <p>Loading profile...</p>}
            </div>
        </BrowserRouter>
        </>
    )
}
export default Launch;