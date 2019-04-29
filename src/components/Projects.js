import React, { Component } from 'react';
import {
  ListView,
  ListViewHeader,
  ListViewFooter,
  ListViewSection,
  ListViewSectionHeader,
  ListViewRow,
  Text,
  Window,
  TitleBar
} from 'react-desktop/macOs';

export class Projects extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      projectInfo: []
    };
  }

  componentDidMount() {
    this.getGithubInfo();
  }

  getGithubInfo = async () => {
    try {
      // set user agent to prevent api abusing
      const headers = new Headers({
        "Accept"       : "application/json",
        "Content-Type" : "application/json",
        "User-Agent"   : "Stanliest"
      })
      const response = await fetch('https://api.github.com/users/stanliest/repos', {
        method: 'GET',
        headers: headers
      });
      const json = await response.json();
      console.log('repo response: ', json);

      let info = [];
      
      for (var repo of json) {
        info.push(repo.name);
        info.push(repo.description);
      }

      this.setState({
        projectInfo: info
      })

    } catch (err) {
      console.log(err);
    }
    
  }

  render() {
    return (
      <Window 
        chrome
        height="550px"
        padding="10px"
        width="50%"
        style={{margin: '30px'}}
      >
      <TitleBar title="Github" controls />
      <ListView background="#f1f2f4" width="240" height="500px">
        <ListViewHeader>
          <Text size="11" color="#696969">Order by name</Text>
        </ListViewHeader>
        <ListViewSection header={this.renderSectionHeader('Projects')}>
          {this.state.projectInfo.map((prop, key) => {
            if (key%2 == 0) {
              return this.renderItem(key, prop)
            } else {
              return this.renderDescription(key, prop)
            }
          })}
          {/* {this.state.projectDescription.map((prop, key) => {
            return this.renderDescription(key, prop)
          })} */}
        </ListViewSection>
        <ListViewFooter>
          <Text size="11" color="#696969">github.com/stanliest</Text>
        </ListViewFooter>
      </ListView>
    </Window>

    );
  }

  renderSectionHeader(title) {
    return (
      <ListViewSectionHeader>
        {title}
      </ListViewSectionHeader>
    );
  }

  renderItem(title, info) {
    return (
      <ListViewRow
        onClick={() => this.setState({ selected: title })}
        background={this.state.selected === title ? '#d8dadc' : null}
      >
        <svg x="0px" y="0px" width="18" height="12" viewBox="0 0 18 12" style={{ marginRight: '6px' }}>
          <path fill="#727476" d="M13.2,0H4.9L0,6.8v3.7C0,11.3,0.7,12,1.5,12h15
    c0.8,0,1.5-0.7,1.5-1.5V6.8L13.2,0z M13.8,6.8L12.3,9L5.9,9L4.2,6.8l-3.1,0l4.2-6h7.4l4.2,6L13.8,6.8z"/>
          <polygon fill="#C9CBCD" points="13.8,6.8 12.3,9 5.9,9 4.2,6.8 1.2,6.7 5.4,0.8 12.8,0.8
    17,6.7 "/>
        </svg>
        <Text color="#414141" size="13">{info}</Text>
      </ListViewRow>
    );
  }

  renderDescription(title, info) {
    return (
      <ListViewRow
        onClick={() => this.setState({ selected: title })}
        background={this.state.selected === title ? '#d8dadc' : null}
      >
        <Text size="11" color="#696969">{info}</Text>
      </ListViewRow>
    );
  }
}

export default Projects;