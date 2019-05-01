import React, { Component } from 'react';
import {
  Window,
  TitleBar
} from 'react-desktop/macOs';

export class SocialMedia extends Component {

  render() {
    return (
      <Window
        height="120px"
        padding="20px"
        width="40%"
        style={{ margin: '30px', position: 'absolute', top: '170px', left: '10px' }}
      >
        <TitleBar title="Social Media" controls />

        <a href="https://www.instagram.com/stanliest/">
          <img src="https://img.icons8.com/color/48/000000/instagram-new.png"
            target="_blank" rel="noopener"
            alt="instagram"
            width="52"
            height="52" />
        </a>

        <a href="https://www.linkedin.com/in/liu-stanley/">
          <img src="https://img.icons8.com/color/48/000000/linkedin.png"
            target="_blank" rel="noopener"
            alt="linkedin"
            width="52"
            height="52" />
        </a>

        <a href="https://github.com/stanliest">
          <img src="https://img.icons8.com/material-outlined/48/000000/github.png"
            target="_blank" rel="noopener"
            alt="github"
            width="52"
            height="52" />
        </a>
      </Window>
    );
  }
}

export default SocialMedia;