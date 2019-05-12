import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import NhlLogo from '../nhllogo.png';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
});

function HeaderComponent(props) {
  const { classes } = props;
  
  return (
  <React.Fragment >
    <CssBaseline />
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Avatar alt="Remy Sharp" src={NhlLogo} className='avatar' />
          <Typography variant="h6" color="inherit" noWrap>National Hockey Leage NHL</Typography>
      </Toolbar>
    </AppBar>
  </React.Fragment>
  );
}

export default withStyles(styles)(HeaderComponent);
