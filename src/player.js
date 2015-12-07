import React from 'react';
import ReactPlayer from 'react-player';
import ProgressBar from './widgets/progress-bar';
import { getMeta } from './oembed';

export default React.createClass({
  getInitialState() {
    return {
      meta: {},
      currentlyPlaying: null,
      paused: false,
      volume: 1,
      played: 0,
      loaded: 0
    };
  },
  componentWillMount() {
    const { paused, volume } = this.props;
    paused.on('value', this.onPause);
    volume.on('value', this.onVolumeChange);

    this.nextSong();
  },
  componentWillUnmount() {
    const { paused, volume } = this.props;
    paused.off('value', this.onPause);
    volume.on('value', this.onVolumeChange);
  },
  onPause(snapshot) {
    const paused = snapshot.val();
    this.setState({ paused });
  },
  onVolumeChange(snapshot) {
    const volume = snapshot.val();
    this.setState({ volume });
  },
  songChanged(snapshot) {
    const { playing } = this.props,
          currentlyPlaying = snapshot.val();

    snapshot.ref().remove();
    playing.set(currentlyPlaying);
    this.setState({ currentlyPlaying });

    getMeta(currentlyPlaying).then(meta => {
      this.setState({ meta });
    });
  },
  nextSong() {
    const { playlist } = this.props,
          nextSongRef = playlist.limitToFirst(1);

    nextSongRef.once('child_added', this.songChanged);
  },
  songEnded() {
    const { playing, history } = this.props;

    playing.once('value', (snapshot) => {
      history.push(snapshot.val());
    });

    this.nextSong();
  },
  onProgress(track) {
    const played = track.played || 0,
          loaded = track.loaded || this.state.loaded;

    this.setState({ played, loaded });
  },
  render() {
    const { playlist, history, playing } = this.props,
          { currentlyPlaying, played, loaded, meta } = this.state;

    // adding a random string to the url ensures that the next
    // video will play, even if it's the same song as before.
    const randomId = Math.random().toString(36).slice(2),
          safeUrl = `${currentlyPlaying}`;

    const thumbnailStyles = {
      backgroundImage: `url(${meta.thumbnail_url})`
    };

    if(!currentlyPlaying) {
      return null;
    }

    return (
      <div className='player'>
        <ReactPlayer
          url={safeUrl}
          playing={true}
          onProgress={this.onProgress}
          onEnded={this.songEnded}
          onError={this.nextSong} />
        <div className='player__tile'>
          <div
            className='player__thumbnail'
            style={thumbnailStyles}>
          </div>
          <ProgressBar primary={played} secondary={loaded} />
        </div>
        <div className='player__title'>
          <strong className='player__title__author'>{meta.author}</strong>
          <span className='player__tile__title'>{meta.title ? meta.title : '...'}</span>
        </div>
      </div>
    );
  }
});

