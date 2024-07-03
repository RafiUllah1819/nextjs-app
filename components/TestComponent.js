// components/TestComponent.js
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  background: papayawhip;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: palevioletred;
`;

const TestComponent = () => (
  <Wrapper>
    <Title>Hello</Title>
  </Wrapper>
);

export default TestComponent;
