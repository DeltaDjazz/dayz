import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  text-align: center;
`;

function Upcoming() {
  return (
    <Container>
      <h1>Upcoming</h1>
      <p>Voici la page Upcoming.</p>
    </Container>
  );
}

export default Upcoming;