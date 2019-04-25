import React, { Component } from "react";
import { TitleBar } from 'react-desktop/macOs';
import { Intro } from './components/Intro';
import { Projects } from "./components/Projects";

class Profile extends Component {
  constructor() {
    super();
    this.state = { isFullscreen: false };
  }

  render() {
    return (
      <div>
        <TitleBar
          title="My Profile"
          controls
          isFullscreen={this.state.isFullscreen}
          onCloseClick={() => console.log('Close window')}
          onMinimizeClick={() => console.log('Minimize window')}
          onMaximizeClick={() => console.log('Mazimize window')}
          onResizeClick={() => this.setState({ isFullscreen: !this.state.isFullscreen })}
        />
        <Intro />
        <Projects />
      </div>
    );
  }
}

export default Profile;