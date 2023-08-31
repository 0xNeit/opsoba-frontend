import styled from 'styled-components'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.gradientVioletAlt};
  height: calc(100vh - 100px);
  overflow: hidden;
  position: relative;
`

export default Container
