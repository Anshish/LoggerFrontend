import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import {getGoals,reset} from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch=useDispatch()

  const {user}=useSelector(state=>state.auth)
  const {goals,isLoading,isError,message}=useSelector(state=>state.goals)

  useEffect(()=>{
    console.log(user);
    if(isError){
      console.log(message);
    }
    // if(!user){
    //   navigate('/login')
    // }
    // dispatch(getGoals())

    if (user && user.token) {
      dispatch(getGoals());
    } else {
      console.log('Redirecting to login');
      navigate('/login');
    }

    return ()=>{
      dispatch(reset())
    }
  },[user,navigate,isError,message,dispatch])

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Dashboard</p>
      </section>
      <GoalForm />
      <div className='content-container'>
        <section className='content'>
          {goals.length > 0 ? (
            <div className='goals'>
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
            </div>
          ) : (
            <h3>You have not set any goals</h3>
          )}
        </section>
      </div>
    </>
  )
}

export default Dashboard