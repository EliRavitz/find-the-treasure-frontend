import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import axiosInstance from '../axios'

import ErrorPopup from '../component/layout/ErrorPopup'

import face_1 from '../img/face_1.png'
import face_2 from '../img/face_2.png'
import face_3 from '../img/face_3.png'
import face_4 from '../img/face_4.png'
import face_5 from '../img/face_5.png'
import face_6 from '../img/face_6.png'

import classes from './PlayerLogin.module.css'

function PlayerLogin() {
  const userNameRef = useRef()
  const params = useParams()

  const [character, setCharacter] = useState('')
  const [fileName, setFileName] = useState('')
  const [file, setFile] = useState('')
  const [idUser, setIdUser] = useState('')
  const [isInputUserName, setIsInputUserName] = useState(false)

  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const files = event.target.files

    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith('image/')) {
        setCharacter(event.target.id)
        setFileName(file.name)
        setFile(file)
      } else {
        alert('Only an image file must be selected')
      }
    }
  }

  const selectedCharacter = (e) => {
    setCharacter(e.target.id)
  }

  const userNameChecker = () => {
    const userNameToCheck = userNameRef.current.value
    if (userNameToCheck.trim().length > 0) {
      setIsInputUserName(true)
    }
    if (userNameToCheck.trim().length === 0) {
      setIsInputUserName(false)
    }
  }

  const info = () => {
    const userName = userNameRef.current.value

    let photo = ''
    if (character === '0') {
      photo = file
    }
    if (character === '') {
      photo = 'face_6.png'
    }
    if (character !== '0' && character !== '') {
      photo = character
    }

    const formData = new FormData()
    formData.append('photo', photo)
    formData.append('userName', userName)
    formData.append('status', 0)
    formData.append('gameId', params.gameId)

    let timeoutId = null
    axiosInstance
      .post('/api/v1/players', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(function (response) {
        setIdUser(response.data.data.data._id)
      })
      .catch(function (error) {
        setError(error)
        timeoutId = setTimeout(() => {
          setError('')
        }, 7000)
      })
    return () => clearTimeout(timeoutId)
  }

  return (
    <>
      {error && (
        <ErrorPopup
          title={error.message}
          message={error.response.data.message}
        />
      )}
      <div className={classes.main}>
        <div className={classes.main_1}>
          <h2>
            Before we can start the game please choose a username and image
          </h2>

          <input
            type="text"
            placeholder="User name"
            ref={userNameRef}
            onChange={userNameChecker}
            className={classes.userName}
            maxLength={20}
          />

          <div className={classes.image_area}>
            <div className={classes.uploadPictureDiv}>
              <div className={classes.middle}>
                Choose a picture from your computer:
              </div>
              <div
                className={
                  character === '0' ? classes.frame : classes.normal_frame
                }
              >
                <input
                  className={classes.uploadPicture}
                  type="file"
                  accept="image/*"
                  name="photo"
                  onChange={handleFileChange}
                  id={0}
                />
                <div>{character === '0' && fileName}</div>
              </div>
              <p>
                The best is a headshot😁
                <br /> If you are a group a common headshot is great😜😁👧👦👩‍🦰
              </p>
            </div>
            <div
              className={classes.existPictureDiv}
              onClick={selectedCharacter}
            >
              <div className={classes.middle}> or: </div>
              <div className={classes.character}>
                <button
                  id={'face_1.png'}
                  className={
                    character === 'face_1.png' ? classes.selected_button : ''
                  }
                >
                  <img id={'face_1.png'} src={face_1} />
                </button>
                <button
                  id={'face_2.png'}
                  className={
                    character === 'face_2.png' ? classes.selected_button : ''
                  }
                >
                  <img id={'face_2.png'} src={face_2} />
                </button>
                <button
                  id={'face_3.png'}
                  className={
                    character === 'face_3.png' ? classes.selected_button : ''
                  }
                >
                  <img id={'face_3.png'} src={face_3} />
                </button>
                <button
                  id={'face_4.png'}
                  className={
                    character === 'face_4.png' ? classes.selected_button : ''
                  }
                >
                  <img id={'face_4.png'} src={face_4} />
                </button>
                <button
                  id={'face_5.png'}
                  className={
                    character === 'face_5.png' ? classes.selected_button : ''
                  }
                >
                  <img id={'face_5.png'} src={face_5} />
                </button>
                <button
                  id={'face_6.png'}
                  className={
                    character === 'face_6.png' ? classes.selected_button : ''
                  }
                >
                  <img id={'face_6.png'} src={face_6} />
                </button>
              </div>
            </div>
          </div>
        </div>
        {isInputUserName && (
          <div className={classes.link} onClick={info}>
            <button className={classes.btn}>GO</button>
            {idUser && (
              <Navigate
                to={`/game-page/${params.gameId}/player/${idUser}`}
                replace={true}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default PlayerLogin
