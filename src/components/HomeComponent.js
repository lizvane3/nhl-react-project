import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

function HomeComponent(props) {
  const {classes} = props;
  
  return (
  <React.Fragment>
    <main className='homeContent'>
      <div className={classes.toolbar} />
      <div className='homeBackground' />
    </main>
  </React.Fragment>
  );
}

export default withStyles(styles)(HomeComponent);
