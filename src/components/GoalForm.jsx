import React,{useState} from 'react'
import {useDispatch } from 'react-redux'
import {createGoal, getGoals} from '../features/goals/goalSlice'

function GoalForm() {
    const [text,setText]=useState('')
    const dispatch=useDispatch()

    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(createGoal({text}))
        dispatch(getGoals())
        setText('')
    }
  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                    type="text" 
                    name='text'
                    id='text'
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
                    placeholder='Add Goal'
                />
            </div>
            <div className="form-group">
                <button  className="btn btn-block">Add Goal</button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm