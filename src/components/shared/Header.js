import { VideoCamera } from 'phosphor-react';
import React from 'react';

export const Header = () => {
  return (
    <header className="header">
      <a href="/" className="logo">
        <VideoCamera size={30} weight="duotone" /> <h2>Video app</h2>
      </a>
    </header>
  );
};
