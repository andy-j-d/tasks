// @flow

import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const MainMenu = ({ toggleShowCompleted, toggleShowCompletedText }) => (
  <IconMenu
    iconButtonElement={
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    }
    iconStyle={{ color: 'white' }}
    anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
  >
    <MenuItem
      primaryText={toggleShowCompletedText}
      onClick={toggleShowCompleted}
    />
  </IconMenu>
);

export default MainMenu;
