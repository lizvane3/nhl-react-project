import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import HeaderComponent from './HeaderComponent';
import ContentComponent from './ContentComponent';
import HomeComponent from './HomeComponent';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

const drawerWidth = 300;

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  }
});


function MainComponent(props) {
  const { classes, theme } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [teams, setTeams] = useState({ teams: [] });
  const [playerList, setPlayerList] = useState({ roster: [] });
  const [teamName, setTeamName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://statsapi.web.nhl.com/api/v1/teams/'
      );
      setTeams(result.data);
    };
    fetchData();
  }, []);

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
      <HeaderComponent onclick={setMobileOpen} isOpen={mobileOpen} />
      <nav className={classes.drawer}>
        <Hidden smUp={mobileOpen} xsDown={!mobileOpen} implementation="css">
          <Drawer
            container={mobileOpen ? props.container : ''}
            variant={mobileOpen ? "temporary" : "permanent"}
            anchor={mobileOpen ? theme.direction === 'rtl' ? 'right' : 'left' : 'left'}
            open={mobileOpen}
            onClose={mobileOpen ? () => setMobileOpen(!mobileOpen) : null}
            classes={{ paper: classes.drawerPaper, }}>
            <div className={classes.toolbar} />
            <Divider />
            <List>
              {teams.teams.map((data) => (
                <ListItem button key={data.id} onClick={() => getPlayerList(data.id, data.name)}>
                  <ListItemIcon>
                    <Avatar alt="Remy Sharp" src={urlImg(data.id)} />
                  </ListItemIcon>
                  <ListItemText primary={data.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Hidden>
      </nav>
      {playerList.roster.length > 0 ? <ContentComponent list={playerList.roster} teamName={teamName} /> : <HomeComponent />}
    </React.Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(MainComponent);
