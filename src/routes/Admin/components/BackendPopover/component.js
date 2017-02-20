import React, { Component, PropTypes } from 'react'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';


class BackendPopover extends Component {

  render() {
    const { open, anchor, handleRefresh, handleDelete, handleClose } = this.props
    return (
      <Popover
        open={open} anchorEl={anchor}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        onRequestClose={handleClose} useLayerForClickAway
        >
        <Menu>
          <MenuItem primaryText="刷新" onClick={handleRefresh}
            leftIcon={
              <FontIcon className="material-icons">refresh</FontIcon>
            }/>
          <MenuItem primaryText="删除" onClick={handleDelete}
            leftIcon={
              <FontIcon className="material-icons">delete</FontIcon>
            }/>
        </Menu>
      </Popover>
    )
  }
}

export default BackendPopover
