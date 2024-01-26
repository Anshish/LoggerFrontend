import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {deleteGoal,updateGoal,getGoals} from '../features/goals/goalSlice'

function GoalItem({goal}) {
    const dispatch=useDispatch()
    const [isEditing,setEditing]=useState(false)
    const [updatedText,setUpdatedText]=useState(goal.text)
    
    const handleUpdate = () => {
      // Dispatch the updateGoal action with the updated text
      dispatch(updateGoal({ id: goal._id, data: {text:updatedText}  }));
      dispatch(getGoals());
      setEditing(false);
      setUpdatedText(goal.text)
    };
  
    const handleCancelUpdate = () => {
      // Cancel editing and reset the updatedText
      setEditing(false);
      setUpdatedText(goal.text);
    };

  return (
    <div className='goal'>
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        {isEditing ? (
        // Render input field for editing
        <>
          <input
            type="text"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
            className='edit-input'
          />
          <div className='edit-container'>
            <button onClick={handleUpdate} className='update-btn'>Update</button>
            <button onClick={handleCancelUpdate} className='cancel-btn'>Cancel</button>
          </div>
        </>
      ) : (
        // Render goal text and buttons
        <>
          <h2>{goal.text}</h2>
          <button onClick={() => setEditing(true)} className='edit-btn'>Edit</button>
          <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
            X
          </button>
        </>
      )}
    </div>
  )
}

export default GoalItem