import React, { useEffect } from 'react'
import './History.css'

export const History = () => {
  useEffect(() => {
    var nav_item = document.getElementById('history')
    nav_item.classList.add('navlinkactive')
  }, [])
  return (
    <div className="history" style={{ marginTop: '9rem' }}>
      <div className="container d-flex justify-content-start flex-column">
        <h5 className="d-flex justify-content-start ">
          History Of Your Previous Exams
        </h5>
      </div>
    </div>
  )
}
