import React from 'react';
import ReactPlayer from 'react-player';

export default React.createClass({
  addSong(url) {
    this.props.playlist.push(url);
  },
  canPlay(url) {
    return ReactPlayer.canPlay(url);
  },
  textEntered(event) {
    const url = event.target.value;

    if(this.canPlay(url)) {
      this.addSong(url);
      event.target.value = '';
    }
  },
  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  },
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keydown', this.handleKeyUp);
  },
  handleKeyUp(event) {
    const { input } = this.refs,
          { keyCode } = event,
          CTRL_KEYCODE = 17;

    if(keyCode === CTRL_KEYCODE) {
      input.blur();
    }
  },
  handleKeyDown(event) {
    const { input } = this.refs,
          { keyCode } = event,
          CTRL_KEYCODE = 17;

    if(keyCode === CTRL_KEYCODE) {
      input.focus();
    }
  },
  render() {
    return (
      <div className='entry'>
        <input
          ref='input'
          className='entry__input'
          type='text'
          placeholder='Paste a YouTube or SoundCloud URL here'
          onKeyUp={this.textEntered}/>
      </div>
    );
  }
});

