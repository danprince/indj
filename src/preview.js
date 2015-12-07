import React from 'react';
import { getMeta } from './oembed';

export default React.createClass({
  getInitialState() {
    return {
      playing: null
    };
  },
  componentWillMount() {
    const { playing } = this.props;

    playing.on('value', this.trackChanged);
  },
  componentWillUnmount() {
    playing.off('value', this.trackChanged);
  },
  trackChanged(snapshot) {
    const url = snapshot.val();

    if(url) {
      getMeta(url)
        .then(meta => this.setState({ playing: meta }));
    }
  },
  render() {
    const { playing } = this.state;

    if(!playing) {
      return (
        <span className='preview--empty'>
        </span>
      );
    }

    return (
      <span className='preview'>
        <i className='fa fa-music'></i>
        <strong> {playing.title}</strong>
      </span>
    );
  }
});

