import React, { useState, useLayoutEffect, useReducer } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tooltip } from "@material-ui/core";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';

import ModalComponent from './ModalComponent';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  textField: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  menu: {
    width: 200
  },
});

function ContentComponent(props) {
  const { classes, list, teamName } = props;
  const [players, setPlayers] = useState(list);
  const [playersCopy, setPlayerCopy] = useState(list);
  const [order, setOrder] = useState(false);
  const [nationality, setNationality] = useState();

  const positions = Object.values( playersCopy.reduce( (prev, next) => Object.assign( prev,{ [next.position.name]: next } ), {} ));

  useLayoutEffect(() => {
    setPlayers(list);
    setPlayerCopy(list);
  },[list]);

  const [, dispatch] = useReducer(({ type, value }) => {
    switch (type) {
      case "SORT BY NUMBER":
        return [value];
      case "SORT BY NAME":
        return [value];
      default:
        return players;
    }
  }, players);

  function sortByNumber(asc) {
    if(asc) {
      players.sort(function(a, b) {
        return a.jerseyNumber - b.jerseyNumber
      })
      setOrder(true);
    } else {
      players.sort(function(a, b) {
        return b.jerseyNumber - a.jerseyNumber;
      })
      setOrder(false);
    }
  }

  function sortByName(asc) {
    players.sort(function(a, b) {
      if(asc) {
        setOrder(true);
        return (a.person.fullName > b.person.fullName) ? 1 : ((a.person.fullName < b.person.fullName) ? -1 : 0);
      } else {
        setOrder(false);
        return (b.person.fullName > a.person.fullName) ? 1 : ((b.person.fullName < a.person.fullName) ? -1 : 0);
      }
    });
  }
  
  function filterByPosition(pos) {
    if(pos !== '') {
      const filtered = playersCopy.filter((value) => {
        return value.position.name === pos;
      });
      setPlayers(filtered);
    } else {
      setPlayers(list);
    }
  }

  function getPlayerNationality(idPerson) {
    fetch( `https://statsapi.web.nhl.com/api/v1/people/${idPerson}` )
    .then(response => response.json())
    .then(data => {
      setNationality(data.people[0].nationality);
    });
  }

  return (
  <React.Fragment>
    <main className='content'>
      <div className={classes.toolbar} />
      <Paper className='rootMainContent'>
        <Typography component="h2" variant="display1" gutterBottom className='title'>
          {teamName}
        </Typography>
        <TextField select label="Select player position"
          className={classes.textField} variant="outlined"
          helperText="Please select a player position"
          margin="normal"
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu
            }
          }}
          onChange={e => filterByPosition(e.target.value)}>

          <option value='' />
          {positions.map((option, index) => (
          <option key={index} value={option.position.name}>
            {option.position.name}
          </option>
          ))}
        </TextField>
        <Table className='table'>
          <TableHead>
            <TableRow>
              <TableCell onClick={() => dispatch({type:'SORT BY NUMBER', value:sortByNumber(!order)}) } align="center">
                <Tooltip title="Sort" placement="bottom-start">
                  <TableSortLabel># Jersey Number</TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell align="left" onClick={() => dispatch({type:'SORT BY NAME', value:sortByName(!order)}) }>
                <Tooltip title="Sort" placement="bottom-start">
                  <TableSortLabel>Player Name</TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell align="left">Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map(row => (
            <TableRow key={row.person.id} className='cursor' data-toggle="modal" data-target="#flagModal" onClick={() => getPlayerNationality(row.person.id)}>
              <TableCell component="th" scope="row" align="center">
                {row.jerseyNumber}
              </TableCell>
              <TableCell align="left">{row.person.fullName}</TableCell>
              <TableCell align="left">{row.position.name}</TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <ModalComponent nationality={nationality}></ModalComponent>
    </main>
  </React.Fragment>
  );
}

export default withStyles(styles)(ContentComponent);
