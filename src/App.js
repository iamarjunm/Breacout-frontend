import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight, FaKey } from 'react-icons/fa';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #0b002c;
`;

const Heading = styled.div`
  color: white;
  text-align: center;
  margin-bottom: 2rem;

  .welcome {
    font-size: 3rem;
    font-weight: 400;
    text-transform: uppercase;
  }

  .breacout {
    font-size: 5rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  @media (max-width: 480px) {
    .welcome {
      font-size: 2rem;
    }
    .breacout {
      font-size: 3rem;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #e0dedb;
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 1.5rem;
  width: 100%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 10px;
  font-size: 1rem;
  width: 100%;
`;

const IconWrapper = styled.div`
  margin-right: 10px;
  color: #757575;
`;

const ProceedButton = styled.button`
  background-color: #3a3440;
  border: none;
  padding: 15px;
  border-radius: 50px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #514a57;
  }

  svg {
    margin-left: 5px;
  }
`;

function App() {
  const [credentials, setCredentials] = useState('');

  const handleProceed = () => {
    alert(`Credentials: ${credentials}`);
    // Implement navigation or logic for next page
  };

  return (
    <Container>
      <Heading>
        <div className="welcome">Welcome to</div>
        <div className="breacout">BREACOUT</div>
      </Heading>
      <InputContainer>
        <InputWrapper>
          <IconWrapper>
            <FaKey />
          </IconWrapper>
          <Input 
            type="text" 
            placeholder="credentials"
            value={credentials}
            onChange={(e) => setCredentials(e.target.value)} 
          />
        </InputWrapper>
      </InputContainer>

      <ProceedButton onClick={handleProceed}>
        <FaArrowRight />
      </ProceedButton>
    </Container>
  );
}

export default App;
