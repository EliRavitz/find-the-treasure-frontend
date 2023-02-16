import { useState } from 'react'
import { Link } from 'react-router-dom'

import iconList from '../../img/iconList.png'
import arrow from '../../img/arrow.png'
import classes from './MainNavigationMobile.module.css'

function UserNavigationMobile(props) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className={classes.main}>
      {!isOpen && (
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={iconList} alt="f" />
        </button>
      )}

      {isOpen && (
        <div className={classes.navbar_menu}>
          <button onClick={() => setIsOpen(!isOpen)}>
            <img src={arrow} alt="f" />
          </button>
          <Link to="/">Home</Link>
          <Link to="/game-instructions"> Game Instructions</Link>
          <Link to="/about">about</Link>
          <Link to={'/admin-dashboard/'}>Dashboard</Link>
        </div>
      )}
    </div>
  )
}

export default UserNavigationMobile
