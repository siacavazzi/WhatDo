import React from 'react';
import Button from '@mui/material/Button';
import { Box, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';

function Header(){
    return (
        <Grid container spacing={3}>
          {/* Left Component */}
          <Grid item xs={6}>
            <Paper>
              <Typography variant="h2">WhatDo</Typography>
            </Paper>
          </Grid>
    
          {/* Right Component */}
          <Grid item xs={6}>
            <Paper>
              This is the right component.
            </Paper>
          </Grid>
        </Grid>
      );
}

export default Header;