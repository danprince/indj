import React from 'react';
import Player from './player';
import Preview from './preview';
import Queue from './queue';
import Entry from './entry';
import TitleBar from './widgets/titlebar';
import { userIsDJ, becomeDJ } from './util/dj';
import { playlist, history, dj, playing, paused, volume } from './model';

export default React.createClass({
  getInitialState() {
    return { isDJ: false };
  },
  componentWillMount() {
    dj.on('value', snapshot => {
      this.setState({
        isDJ: userIsDJ(snapshot.val())
      });
    });
  },
  render() {
    const { isDJ } = this.state;

    const className = isDJ ?
      'titlebar__title' :
      'titlebar__title--inactive';

    return (
      <div className='app'>
        <TitleBar>
          <h1
            className={className}
            onClick={becomeDJ}>
            in<span className='alt'>dj</span>
          </h1>
          <Entry playlist={playlist} />
        </TitleBar>
        { this.state.isDJ ?
          <Player
            playlist={playlist}
            history={history}
            playing={playing}
            paused={paused}
            volume={volume} /> :
          null }
        <Queue playlist={playlist} />
      </div>
    );
  }
});

