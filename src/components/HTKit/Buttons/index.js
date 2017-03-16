import styled from 'styled-components';

const SCHEMES = {
  tealGreen: {
    normal: {
      background: '#00C9BC',
      color: 'white',
    },
    highlighted: {
      background: '#4EAEEB',
    },
  },
  htBlue: {
    normal: {
      background: '#4EAEEB',
      color: 'white',
    },
    highlighted: {
      background: '#4EAEEB',
    },
  },
  default: {
    normal: {
      background: 'transparent',
      color: 'black',
    },
    highlighted: {
      background: 'transparent',
      color: 'black',
    },
  },
};

const baseStyles = `
  padding: 10px 35px;
  border-radius: 5px;
  font-size: 20px;
  outline: none;
  cursor: pointer;
  text-transform: uppercase;
`;

export const HTButton = styled.button`
  ${baseStyles}
  color: ${(props) => (SCHEMES[props.scheme] || SCHEMES.default).normal.color};
  background: ${(props) => (SCHEMES[props.scheme] || SCHEMES.default).normal.background};
  &:hover {
    color: ${(props) => (SCHEMES[props.scheme] || SCHEMES.default).highlighted.color};
    background: ${(props) => (SCHEMES[props.scheme] || SCHEMES.default).highlighted.background};
  }
  & + button {
    margin-left: 10px;
  }
`;
