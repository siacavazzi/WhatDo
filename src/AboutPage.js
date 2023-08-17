
import React from 'react';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // full viewport height
});

const CenteredImage = styled('img')({
  width: "120vh", // set the width you want
  transform: 'translateY(-200px)',
 // set the height you want
});

export default function AboutPage() {
  return (
    <Container>
      <CenteredImage src="https://i.imgur.com/fWCt8kf.png" alt="description" />
    </Container>
  );
}
