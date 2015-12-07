import React from 'react';

export function makeStyles(amount) {
  const rounded = Math.round(amount * 100),
        progressAsPercent = `${rounded}%`;

  return { width: progressAsPercent };
}

export default function({primary, secondary}) {
  return (
    <div className='progress-bar'>
      <div
        className='progress-bar__secondary'
        style={makeStyles(secondary)}>
      </div>
      <div
        className='progress-bar__primary'
        style={makeStyles(primary)}>
      </div>
    </div>
  );
};

