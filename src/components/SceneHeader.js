import React from 'react';
import {
  makeStyles,
  Grid,
  Box
} from '@material-ui/core';

const useStyle = makeStyles(theme => ({
  header: {
    display: "flex",
    alignItems: "center",
  },
  headerIcon: {
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

const SceneHeader = () => {
  const classes = useStyle();

  return (
    <Grid item md={12} className={classes.header}>
      <Box className={`fas fa-address-book fa-flip-horizontal ${classes.headerIcon}`} />
      <Box className={classes.headerTitle}>
        <Box fontWeight={500} fontSize={28}>Contacts</Box>
        <Box fontSize={12}>Welcome to FirstCRM Contact page</Box>
      </Box>
    </Grid>
  );
};

export default SceneHeader;