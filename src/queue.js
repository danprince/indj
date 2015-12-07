import React from 'react';
import { getMeta } from './oembed';

export const SongPreview = React.createClass({
  getInitialState() {
    return {
      meta: null
    };
  },
  componentDidMount() {
    const { url } = this.props;

    getMeta(url)
      .then(meta => {
        if(this.isMounted()) {
          this.setState({ meta });
        }
      });
  },
  render() {
    const { meta } = this.state;

    if(!meta) {
      return (
        <div className='song-preview--loading'>
          <i className='fa fa-circle-o-notch fa-spin'></i>
          <span> Loading</span>
        </div>
      );
    }

    const styles = {
      backgroundImage: `url(${meta.thumbnail_url})`
    };

    return (
      <div className='song-preview'>
        <div
          className='song-preview__thumbnail'
          style={styles} />
        <strong
          className='song-preview__author'>
          {meta.author}
        </strong>
        <span
          className='song-preview__title'>
          {meta.title}
        </span>
      </div>
    );
  }
});

export default React.createClass({
  getInitialState() {
    return {
      songs: []
    };
  },
  playlistChanged(snapshot) {
    const songMap = snapshot.val() || {};

    if(songMap) {
      // convert firebase object to array
      const songs = Object.keys(songMap).map(key => songMap[key]);
      this.setState({ songs });
    }
  },
  componentWillMount() {
    const { playlist } = this.props;

    playlist.on('value', this.playlistChanged);
  },
  componentWillUnmount() {
    const { playlist } = this.props;

    playlist.off('value', this.playlistChanged);
  },
  render() {
    const songs = this.state.songs.map((url, index) => {
      return (
        <div className='queue__item' key={index}>
          <SongPreview url={url} key={index} />
        </div>
      );
    });

    const availableSongs = songs.length > 0;

    const songsHint = (
      <span>
        <i className='alt fa fa-arrow-right-o'></i>
        <span> Next Up</span>
      </span>
    );

    const noSongsHint = (
      <span>
        <i className='alt fa fa-frown-o'></i>
        <span> No songs in playlist</span>
      </span>
    );

    return (
      <div className='queue'>
        <div className='queue__hint'>
          { availableSongs ? songsHint : noSongsHint }
        </div>
        {songs}
      </div>
    );
  }
});

