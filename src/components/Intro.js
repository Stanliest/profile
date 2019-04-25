import React, { Component } from 'react';
import { SegmentedControl, SegmentedControlItem, Text } from 'react-desktop/macOs';
import dataFile from "../text";

export class Intro extends Component {
  constructor() {
    super();
    this.state = { selected: 1 }
  }

  render() {
    return (
      <SegmentedControl
        box
        margin="40px"
        width="40%"
        style={{float: 'left'}}
      >
        {this.renderItems()}
      </SegmentedControl>
    );
  }

  renderItems() {
    return [
      this.renderItem(1, 'About me', <Text>{dataFile.Intro.About}</Text>),
      this.renderItem(2, 'School', <Text>{dataFile.Intro.School}</Text>),
      this.renderItem(3, 'Interests', <div><Text>{dataFile.Intro.Interest1}</Text>
        <Text>{dataFile.Intro.Interest2}</Text></div>)
    ];
  }

  renderItem(key, title, content) {
    return (
      <SegmentedControlItem
        key={key}
        title={title}
        selected={this.state.selected === key}
        onSelect={() => this.setState({ selected: key })}
      >
        {content}
      </SegmentedControlItem>
    );
  }
}

export default Intro;