import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Box, Typography, Link as MuiLink, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import logo from '../logo.svg'
const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  navItem: {
    marginLeft: '3rem'
  }
}));

const NavBar = ({
  user,
  onLogout,
  loginRoute
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    onLogout();
    setAnchorEl(null);
  };
  const classes = useStyles();
  const routes = [
    { to: '/', title: 'HOME' },
    { to: '/favorite', title: 'FAVORITE' },
    { to: '/rated', title: 'RATED' },
  ]
  return (
    <AppBar position="static">
      <Toolbar>
        <Box width="100px" p={1} mr={3}>
          <img src={logo} alt={'logo'} />
        </Box>
        <Box className={classes.title} display="flex">
          {routes.map(route => (
            <Box mr={5} key={route.title}>
              <Typography variant="h5" >
                <MuiLink color="inherit" underline="none" to={route.to} component={Link}>{route.title}</MuiLink>
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="h6" >
          {user
            ? (
              <>
                <Box onClick={handleClick}>{user.userName}</Box>
                <Menu
                  id="user-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>)
            : <MuiLink color="inherit" underline="none" to={loginRoute} component={Link}>{"Login"}</MuiLink>}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
