import styled from 'styled-components';

const TodayContainer = styled.div`
  text-align: center;
  padding: 2rem;
  flex: 1;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

function Today() {
  return (
    <TodayContainer>
      <Title>Bienvenue sur Dayz</Title>
      <p>Ceci est la page Today de l'application Dayz.</p>
    </TodayContainer>
  );
}

export default Today;