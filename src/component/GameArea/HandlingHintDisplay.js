import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function HandlingHintDisplay(props) {
  const playerInfo = useSelector((state) => state.playerDetails.player)
  const locationInfo = useSelector((state) => state.currentGame.game)

  let playerStatus = ''
  if (locationInfo.stations) {
    playerStatus = playerInfo.status
  }

  // Updates if the game has started and the player has not reached the location of the first hint
  useEffect(() => {
    if (locationInfo.stations) {
      if (playerStatus === 0) {
        props.getInfo(null, null, 0)
      }
    }
  }, [playerStatus])

  // Updates the first hint
  useEffect(() => {
    if (locationInfo.stations) {
      locationInfo.stations.forEach((location, i) => {
        if (playerStatus === i + 1) {
          props.getInfo(
            location.hint1,
            i + 1,
            1,
            location.hint2,
            location.hint3
          )
        }
      })
    }
  }, [playerStatus])

  // Updates the second hint
  useEffect(() => {
    if (props.needSecondHint) {
      locationInfo.stations.forEach((location, i) => {
        if (playerStatus === i + 1) {
          props.getInfo(location.hint2, i + 1, 2)
        }
      })
    }
  }, [props.needSecondHint])

  // Updates the third hint
  useEffect(() => {
    if (props.needThirdHint) {
      locationInfo.stations.forEach((location, i) => {
        if (playerStatus === i + 1) {
          props.getInfo(location.hint3, i + 1, 3)
        }
      })
    }
  }, [props.needThirdHint])

  return
}

export default HandlingHintDisplay
