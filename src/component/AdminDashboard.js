import { Link } from 'react-router-dom'

import UserNavigation from './layout/UserNavigation'
import UserNavigationMobile from './layout/UserNavigationMobile'

import classes from './AdminDashboard.module.css'

function AdminDashboard() {
  return (
    <>
      {window.innerWidth < 500 ? <UserNavigationMobile /> : <UserNavigation />}
      <div className={classes.main_page}>
        <Link to={'/new-game'}> New Game </Link>
        <Link to={'/game-list'}> Your Games </Link>
        <Link to={'/admin-dashboard/settings'}> Settings </Link>
      </div>
    </>
  )
}

export default AdminDashboard
