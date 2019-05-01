import React, { Component } from "react";
import { TitleBar } from 'react-desktop/macOs';
import { Intro } from './components/Intro';
import { Projects } from "./components/Projects";
import { SocialMedia } from "./components/SocialMedia";

class Profile extends Component {

  render() {
    return (
      <div>
        <TitleBar
          title="My Profile"
          controls
        />
        <Intro />
        <Projects />
        <SocialMedia />
      </div>
    );
  }
}

export default Profile;