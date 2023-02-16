import MainNavigation from '../component/layout/MainNavigation'
import MainNavigationMobile from '../component/layout/MainNavigationMobile'

import classes from './about.module.css'

function About(props) {
  return (
    <>
      {window.innerWidth < 500 ? (
        <MainNavigationMobile
          isClickedLogin={props.isClickedLogin}
          isClickedSignin={props.isClickedSignin}
        />
      ) : (
        <MainNavigation
          isClickedLogin={props.isClickedLogin}
          isClickedSignin={props.isClickedSignin}
        />
      )}
      <div className={classes.main_page}>
        <div className={classes.text}>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur, adipisci deserunt in ipsam ipsa beatae eius Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Laboriosam nulla
            aspernatur voluptatem, adipisci sapiente modi perferendis aut,
            suscipit culpa consectetur illo inventore aperiam pariatur possimus.
            Eaque doloremque assumenda vero molestias expedita omnis dolore est
            ducimus libero consequatur! Esse excepturi vero consequuntur magni
            vel quibusdam nemo laboriosam dignissimos molestiae cum odit
            corporis eveniet, soluta dolorum enim sequi, officiis magnam ullam
            reprehenderit!
          </p>
        </div>
      </div>
    </>
  )
}

export default About
