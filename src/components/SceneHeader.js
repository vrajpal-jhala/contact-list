import React from 'react';
import {
  Grid,
  Box
} from '@material-ui/core';

const SceneHeader = () => {
  return (
    <Grid item md={12}>
      <Box style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <Box className={'fas fa-address-book fa-flip-horizontal'} style={{
          background: 'linear-gradient(#fa8569, #ff4b6e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: '#ffffffbf',
          fontSize: 34
        }} />
        <Box style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 15px'
        }}>
          <Box fontWeight={500} fontSize={28}>Contacts</Box>
          <Box style={{ color: 'darkgray' }} fontSize={12}>Welcome to FirstCRM Contact page</Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default SceneHeader;