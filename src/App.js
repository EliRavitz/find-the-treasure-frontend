import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from './component/HomePage'
import GameInstructions from './pages/GameInstructions'
import About from './pages/About'
import AdminDashboard from './component/AdminDashboard'
import NewGame from './pages/NewGame'
import PlayerLogin from './pages/PlayerLogin'
import ActiveGameManagement from './pages/ActiveGameManagement'
import GamePage from './pages/GamePage'
import GameList from './component/GameList'
import LoginPage from './component/LoginPage'
import SigninPage from './component/SigninPage'
import BlackBackground from './component/layout/BlackBackground'
import Settings from './component/Settings/Settings'
import ResetPassword from './pages/ResetPassword'

function App() {
  const [clickeBtnLogin, setClickeBtnLogin] = useState(false)
  const [clickeBtnSingin, setClickeBtnSignin] = useState(false)
  const [blackCBG, setBlackCBG] = useState(false)
  console.log(process.env.REACT_APP_API_URL_PROD)
  const clickLoginHandler = () => {
    setClickeBtnLogin(!clickeBtnLogin)
    setBlackCBG(!blackCBG)
  }
  const clickSigninHandler = () => {
    setClickeBtnSignin(!clickeBtnSingin)
    setBlackCBG(!blackCBG)
  }

  const closeBG = () => {
    setBlackCBG(false)
    setClickeBtnSignin(false)
    setClickeBtnLogin(false)
  }
  return (
    <>
      {clickeBtnLogin && <LoginPage isClicked={clickLoginHandler} />}
      {blackCBG && <BlackBackground isClicked={clickLoginHandler} />}

      {clickeBtnSingin && <SigninPage isClicked={clickSigninHandler} />}
      {blackCBG && <BlackBackground isClicked={closeBG} />}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              isClickedLogin={clickLoginHandler}
              isClickedSignin={clickSigninHandler}
            />
          }
        />
        <Route
          path="/game-instructions"
          element={
            <GameInstructions
              isClickedLogin={clickLoginHandler}
              isClickedSignin={clickSigninHandler}
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              isClickedLogin={clickLoginHandler}
              isClickedSignin={clickSigninHandler}
            />
          }
        />

        <Route path="/admin-dashboard/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/settings" element={<Settings />} />
        <Route
          path="/active-admin-dashboard/game/:gameId"
          element={<ActiveGameManagement />}
        />
        <Route path="/game-list/" element={<GameList />} />

        <Route path="/new-game" element={<NewGame />} />
        <Route path="/new-game/game/:gameId" element={<NewGame />} />

        <Route path="/player-login/:gameId" element={<PlayerLogin />} />
        <Route
          path="/game-page/:gameId/player/:playerId"
          element={<GamePage />}
        />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
