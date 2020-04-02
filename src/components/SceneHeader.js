import React from 'react';
import {
  makeStyles,
  IconButton,
  Hidden,
  Grid,
  Box
} from '@material-ui/core';
import {
  Menu
} from '@material-ui/icons';

const useStyle = makeStyles(theme => ({
  header: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    boxShadow: '0px 0px 4px silver',
  },
  headerIcon: {
    marginLeft: 10,
    background: 'linear-gradient(#fa8569, #ff4b6e)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: '#ffffffbf',
    fontSize: 34
  },
  headerTitle: {
    padding: '0px 15px'
  }
}));

const SceneHeader = ({ handleFullDrawerToggle, icon, heading, subHeading }) => {
  const classes = useStyle();

  return (
    <Grid item xs={12} className={classes.header}>
      <Hidden smUp>
        <IconButton onClick={handleFullDrawerToggle}>
          <Menu />
        </IconButton>
      </Hidden>
      <Box className={`${icon} ${classes.headerIcon}`} />
      <Box className={classes.headerTitle}>
        <Box fontWeight={500} fontSize={28}>{heading}</Box>
        <Box fontSize={12}>{subHeading}</Box>
      </Box>
    </Grid>
  );
};

export default SceneHeader;