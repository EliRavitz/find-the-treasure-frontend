import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../axios'

import UserNavigation from './layout/UserNavigation'
import UserNavigationMobile from './layout/UserNavigationMobile'
import GameListItem from './GameListItem'
import ErrorPopup from '../component/layout/ErrorPopup'

import classes from './GameList.module.css'

function GameList() {
  const [ListGames, setListGames] = useState([])
  const [receivedResponse, setReceivedResponse] = useState(false)
  const [error, setError] = useState('')
  const params = useParams()

  const handleNewLocation = async () => {
    let timeoutId = null
    let timeoutId2 = null
    try {
      const response1 = await axiosInstance

        .get('/api/v1/users/me', {
          withCredentials: true,
        })
        .catch(function (error) {
          console.log(error)
          setError(error)
          timeoutId = setTimeout(() => {
            setError('')
          }, 7000)
        })

      const games = response1.data.data.data.games
      for (let i = 0; i < games.length; i++) {
        const response2 = await axiosInstance.get(
          `/api/v1/games/${games[i]._id}`
        )

        setReceivedResponse(true)
        setListGames((ListGames) => [...ListGames, response2.data.data.data])
      }
    } catch (error) {
      console.log(error)
      setError(error)
      timeoutId2 = setTimeout(() => {
        setError('')
      }, 7000)
    }
    return () => {
      clearTimeout(timeoutId)
      clearTimeout(timeoutId2)
    }
  }
  useEffect(() => {
    handleNewLocation()
  }, [params.id])

  const gameDeletedHandler = (id) => {
    setListGames((prevGames) => prevGames.filter((game) => game._id !== id))
  }

  return (
    <>
      {error && (
        <ErrorPopup
          title={error.message}
          message={error.response.data.message}
        />
      )}
      {window.innerWidth < 500 ? <UserNavigationMobile /> : <UserNavigation />}
      <div className={classes.main}>
        {!receivedResponse && (
          <iframe
            src="https://embed.lottiefiles.com/animation/76799"
            className={classes.spiner}
          ></iframe>
        )}
        {!ListGames[0] && receivedResponse && (
          <div className={classes.noGames}>
            You haven't created any games yet
          </div>
        )}
        {ListGames[0] && (
          <ul className={classes.ul}>
            {ListGames.map((item) => (
              <GameListItem
                gameDeleted={gameDeletedHandler}
                key={item._id}
                name={item.name}
                station={item.stations.length}
                _id={item._id}
                user_id={params.id}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default GameList
