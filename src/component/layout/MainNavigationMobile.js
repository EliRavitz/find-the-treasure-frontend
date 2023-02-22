import { useState } from 'react'
import { Link } from 'react-router-dom'

import GoButtonForVisitors from './GoButtonForVisitors'
import iconList from '../../img/iconList.png'
import arrow from '../../img/arrow.png'
import classes from './MainNavigationMobile.module.css'

function MainNavigationMobile(props) {
  const [isOpen, setIsOpen] = useState(false)

  const [clicedGo, setClicedGo] = useState(false)

  const isClickedGo = () => {
    const timeId = setClicedGo(!clicedGo)
    setTimeout(() => {
      setClicedGo(!clicedGo)
    }, 1000)
    return () => clearTimeout(timeId)
  }

  return (
    <div className={classes.main}>
      {!isOpen && (
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={iconList} alt="icon" />
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
          <Link onClick={props.isClickedLogin}>Log in</Link>
          <Link onClick={props.isClickedSignin}>Sign up</Link>
          <Link onClick={isClickedGo}>Free passage for visitors</Link>
          {clicedGo && <GoButtonForVisitors />}
        </div>
      )}
    </div>
  )
}

export default MainNavigationMobile
