import React, { useState, useLayoutEffect } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
});

function ModalComponent( props) {
  const { classes, nationality } = props;
  const [country, setCountry] = useState('');
  const [flag, setFlag] = useState('');
  
  useLayoutEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/alpha/${nationality}`)
    .then(response => response.json())
    .then(data => {
      setCountry(data.name);
      setFlag(data.flag);
    });      
  },[nationality]);

  return (
  <React.Fragment>
    <div className="modal fade" id="flagModal" tabIndex="-1" role="dialog" aria-labelledby="flagModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="flagModalLabel">{country}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <Card className={classes.card}>
              <CardMedia className={classes.media} image={flag} />
            </Card>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  </React.Fragment>
  );
}

export default withStyles(styles)(ModalComponent);
