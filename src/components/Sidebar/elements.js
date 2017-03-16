import styled from 'styled-components';

export const SidebarDiv = styled.div`
  background-color: gray;
  display: inline-block;
  height: 100%;
`;

export const MainItems = styled.div`
  background-color: red;
  width: 100px;
  border: 1px solid black;
  display: inline-block;
`;

export const SubItems = styled.div`
  border: 1px solid black;
  background-color: green;
  width: 500px;
  display: inline-block;
`;

export const MainItemButton = styled.a`
  font-weight: ${(props) => props.active ? '800' : '300'}
  border: 1px solid black;
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

export const MainHeaderItemButton = styled.a`
  font-weight: 300;
  border: 1px solid black;
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

export const SubItemButton = styled.a`
  font-weight: ${(props) => props.active ? '800' : '300'}
  border: 1px solid black;
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

export const HeaderSubItemButton = styled.a`
  border: 1px solid black;
  font-size: 30px;
  display: block;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;
