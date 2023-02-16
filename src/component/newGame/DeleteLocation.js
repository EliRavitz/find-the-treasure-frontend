import { useDispatch } from 'react-redux'
import { currentGameActions } from '../../store/currentGame-slice'

function DeleteLocation(props) {
  const dispatch = useDispatch()

  const deleteHandler = () => {
    dispatch(
      currentGameActions.removeStation({
        id,
      })
    )
  }
  const id = props.id
  return <button onClick={deleteHandler}>Delete</button>
}

export default DeleteLocation
