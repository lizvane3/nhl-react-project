import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import ContentComponent from './ContentComponent';
import HomeComponent from './HomeComponent'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
});

function DrawerComponet(props) {
  const [teams, setTeams] = useState({teams: []});
  const [playerList, setPlayerList] = useState({roster: []});
  const [teamName, setTeamName] = useState('');
  const { classes } = props;

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://statsapi.web.nhl.com/api/v1/teams/'
      );
      setTeams(result.data);
    };
    fetchData();
  },[]);
  
  function urlImg(id) {
    return `https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/${id}.svg`;
  }

  function getPlayerList(idTeam, name) {
    fetch(`https://statsapi.web.nhl.com/api/v1/teams/${idTeam}/roster`)
    .then(response => response.json())
    .then(data => {
      setPlayerList(data);
      setTeamName(name);
    });      
  }
  
  return (
  <React.Fragment>
    <Drawer className='drawer' variant="permanent">
      <div className={classes.toolbar} />
      <List>
        {teams.teams.map((data) => (
        <ListItem button key={data.id} onClick={() => getPlayerList(data.id, data.name)}>
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src={urlImg(data.id)} />
          </ListItemIcon>
          <ListItemText primary={data.name}  />
        </ListItem>
        ))}
      </List>
    </Drawer>
    {playerList.roster.length > 0 ? <ContentComponent list={playerList.roster} teamName={teamName}/> : <HomeComponent />}
  </React.Fragment>
  );
}

export default withStyles(styles)(DrawerComponet);