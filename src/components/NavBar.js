import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () =>{
  console.log(this);
  return (
    <div>
      <div><Link to="/">Home</Link></div>
    </div>
  )
};

export default NavBar
