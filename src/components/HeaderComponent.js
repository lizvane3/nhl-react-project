import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import NhlLogo from '../nhllogo.png';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  appBar: {
    marginLeft: 300,
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 300px)',
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  }
});


function HeaderComponent(props) {
  const { classes, onclick, isOpen } = props;

  return (
    <React.Fragment >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Open drawer" onClick={() => onclick(!isOpen)} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Avatar alt="Remy Sharp" src={NhlLogo} className='avatar' />
          <Typography variant="h6" color="inherit" noWrap>National Hockey Leage NHL</Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(HeaderComponent);
