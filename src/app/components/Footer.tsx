'use client';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding: 40px 8%;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  p { color: var(--color-text-dark); }
`;

const Footer = () => (
    <StyledFooter>
        <p>© {new Date().getFullYear()} Saiganeshwaran Thillainathan. All Rights Reserved.</p>
    </StyledFooter>
);

export default Footer;