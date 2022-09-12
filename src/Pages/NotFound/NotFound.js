import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImg from '../../Assets/Images/not-found.gif'
const NotFound = () => {
  return (
    <section className='NotFound flex justify-center items-center bg-black h-screen w-screen flex-col'>
        <img src={NotFoundImg} alt="" className='w-[300px] md:w-[500px]' />
        <Link to='/home' className='btn btn-secondary'>Back To Home</Link>
    </section>
  )
}

export default NotFound