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
        margin="auto"
        marginBottom="40px"
        marginTop="40px"
        width="90%"
      >
        {this.renderItems()}
      </SegmentedControl>
    );
  }

  renderItems() {
    return [
      this.renderItem(1, 'About me', <Text textAlign="center" size="14">{dataFile.Intro.About}</Text>),
      this.renderItem(2, 'School', <Text textAlign="center" size="14">{dataFile.Intro.School}</Text>),
      this.renderItem(3, 'Interests', <Text textAlign="center" size="14">{dataFile.Intro.Interest}</Text>)
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