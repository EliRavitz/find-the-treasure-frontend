import { Link } from 'react-router-dom'

import classes from './UserNavigation.module.css'

function MainNavigation() {
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
          <Link to={'/admin-dashboard/'}>Dashboard</Link>
        </li>
      </ul>
    </div>
  )
}

export default MainNavigation
