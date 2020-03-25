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
  headerTitle: {
    padding: '0px 15px'
  }
}));

const SceneHeader = ({ icon, heading, subHeading }) => {
  const classes = useStyle();

  return (
    <Grid item md={12} className={classes.header}>
      {icon}
      <Box className={classes.headerTitle}>
        <Box fontWeight={500} fontSize={28}>{heading}</Box>
        <Box fontSize={12}>{subHeading}</Box>
      </Box>
    </Grid>
  );
};

export default SceneHeader;