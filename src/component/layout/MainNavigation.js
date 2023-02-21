import { useState } from 'react'
import { Link } from 'react-router-dom'

import GoButtonForVisitors from './GoButtonForVisitors'

import classes from './MainNavigation.module.css'

function MainNavigation(props) {
  const [clicedGo, setClicedGo] = useState(false)

  const isClickedGo = () => {
    setClicedGo(!clicedGo)
  }

  return (
    <div className={classes.main}>
      <ul>
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/game-instructions"> Game Instructions </Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link onClick={props.isClickedLogin}>Log in</Link>
        </li>
        <li>
          <Link onClick={props.isClickedSignin}>Sign up</Link>
        </li>
        <li>
          <Link onClick={isClickedGo}>Free passage for visitors</Link>
        </li>
        {clicedGo && <GoButtonForVisitors />}
      </ul>
    </div>
  )
}

export default MainNavigation
