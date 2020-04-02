import React from 'react';
import ContentLoader from 'react-content-loader';
import { Grid, Hidden } from '@material-ui/core';

const ListItemLoader = () => {
  let loaderList = [];

  for (var i = 0; i < 6; i++) {
    loaderList.push(
      <Grid container style={{ height: 70, margin: '5px 0px' }} key={i}>
        <Grid item md={1} xs={2} sm={2}>
          <ContentLoader
            speed={2}
            width="100%"
            height="70px"
            backgroundColor="#e0e0e0"
            foregroundColor="#ddd"
          >
            <rect x="20" y="25" rx="0" ry="0" width="20" height="20" />
          </ContentLoader>
        </Grid>
        <Grid item md={5} xs={10} sm={9}>
          <Hidden smDown>
            <ContentLoader
              speed={2}
              width="100%"
              height="70px"
              backgroundColor="#e0e0e0"
              foregroundColor="#ddd"
            >
              <circle cx="35" cy="35" r="25" />
              <rect x="70" y="25" rx="0" ry="0" width="60%" height="20" />
            </ContentLoader>
          </Hidden>
          <Hidden mdUp>
            <ContentLoader
              speed={2}
              width="100%"
              height="70px"
              backgroundColor="#e0e0e0"
              foregroundColor="#ddd"
            >
              <circle cx="35" cy="35" r="25" />
              <rect x="70" y="15" rx="0" ry="0" width="60%" height="20" />
              <rect x="70" y="45" rx="0" ry="0" width="60%" height="10" />
            </ContentLoader>
          </Hidden>
        </Grid>
        <Hidden smDown>
          <Grid item md={6} zeroMinWidth>
            <ContentLoader
              speed={2}
              width="100%"
              height="70px"
              backgroundColor="#e0e0e0"
              foregroundColor="#ddd"
            >
              <rect x="0" y="30" rx="0" ry="0" width="90%" height="10" />
            </ContentLoader>
          </Grid>
        </Hidden>
      </Grid>
    );
  }

  return (
    loaderList
  )
};

export default ListItemLoader;