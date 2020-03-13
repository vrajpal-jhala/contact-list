import React from 'react';
import {
  Grid,
  Paper,
  InputBase,
  Button,
} from '@material-ui/core';
import {
  Search,
} from '@material-ui/icons';

const ActionBar = () => {
  return (
    <Grid container spacing={3} style={{ padding: '15px' }}>
      <Grid item md={3}>
        <Paper style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f1f1', borderRadius: 50, padding: '6px 16px' }} elevation={0}>
          <InputBase style={{ flex: 1, fontSize: 14 }}
            placeholder="Search contacts"
          />
          <Search />
        </Paper>
      </Grid>
      <Grid item md={9}>
        <Button variant="contained" style={{ background: 'linear-gradient(to right, #fa8569, #ff4b6e)', color: '#ffffffbf', textTransform: 'none', height: '100%' }}>+ Add Contact</Button>
      </Grid>
    </Grid>
  );
};

export default ActionBar;