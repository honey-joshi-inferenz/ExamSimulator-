import React, { useState, useEffect } from 'react'
import Countdown from 'react-countdown'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Baseurl } from '../../Config/Baseurl'

export const Timer = () => {
  const navigate = useNavigate()
  const userId = localStorage.getItem('userId')
  const [data, setData] = useState([])
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      navigate('/exam-finished')
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      )
    }
  }

  const getData = async () => {
    await axios
      .post(Baseurl.nodeLocal + 'studQue/fetchOngoingExams', {
        stud_id: userId,
      })
      .then((res) => {
        console.log(res)
        setData(res.data.data[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getData()
  }, [])
  console.log(data)
  return (
    <div>
      {data ? (
        <Countdown
          date={Date.now() + parseInt(data.duration)}
          // date={Date.now() + 10000000}
          renderer={renderer}
        />
      ) : (
        ''
      )}
    </div>
  )
}
