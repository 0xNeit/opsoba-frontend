import Link, { LinkProps } from 'next/link'
import styled from 'styled-components'
import React from 'react'

// An internal link from the react-router-dom library that is correctly styled
const StyledInternalLink = styled('a')`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

const InternalLink: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link {...props}>
      <StyledInternalLink>{children}</StyledInternalLink>
    </Link>
  )
}

export default InternalLink
