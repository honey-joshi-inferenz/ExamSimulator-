import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

export const Finish = () => {
  const navigate = useNavigate()
  return (
    <div
      className="finish d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <div className="card w-50 h-50 d-flex justify-content-center align-items-center">
        <h5>Your exam time is finished.</h5>
        <h6 className="text-muted">Your answers are saved successfully.</h6>
        <h6
          className="mt-5 finishtext"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <AiOutlineArrowLeft className="mx-2" />
          Back To Home
        </h6>
      </div>
    </div>
  )
}
