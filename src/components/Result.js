import React, { useLayoutEffect, useState } from 'react'
import {Link, useLocation } from "react-router-dom";
import './css/result.css'
import sound from './audio/result.wav'

function Result() {


    useLayoutEffect(() => {
        const audio = new Audio(sound);
            audio.play();
    },[])

    const location = useLocation();
    const score = location.state;

  return (
    <div className='result_sec'>
      <h1>Score: {score}</h1>
      <Link to='/'><h2>Home</h2></Link>
    </div>
  )
}

export default Result
