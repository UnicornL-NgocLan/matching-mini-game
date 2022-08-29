import logo from './logo.svg';
import styled from 'styled-components'

import Board from './components/Board'

function App() {
  return (
    <Wrapper>
      <Board/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;
  width:100vw;
  height:100vh;
`

export default App;
