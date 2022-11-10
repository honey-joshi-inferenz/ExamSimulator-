import React from 'react'
import { Header } from '../../components/Header/Header'
import data from '../../assets/data.jpg'
import ai from '../../assets/ai.jpg'
import './Home.css'

export const Home = () => {
  return (
    <>
      <Header />
      <div className="home" style={{ marginTop: '9rem' }}>
        <div className="container d-flex justify-content-start flex-column">
          <h4 className="d-flex justify-content-start ">Ongoing Exams..</h4>

          <div className="d-flex mt-5">
            <div className="card" style={{ width: '18rem' }}>
              <img src={data} className="card-img-top" alt="data" />
              <div className="card-body">
                <h5 className="card-title mb-3">Data Engineering</h5>
                <div className="d-flex justify-content-center mt-2">
                  <p className="card-text">Total Questions : </p>
                  <h6 className="mt-1 mx-2"> 70</h6>
                </div>

                <div className="d-flex justify-content-center">
                  <p className="card-text">Duration : </p>
                  <h6 className="mt-1 mx-2">30 mins</h6>
                </div>
              </div>
            </div>

            <div className="card mx-5" style={{ width: '18rem' }}>
              <img src={ai} className="card-img-top" alt="ai" />
              <div className="card-body">
                <h5 className="card-title mb-3">AI/ML</h5>
                <div className="d-flex justify-content-center mt-2">
                  <p className="card-text">Total Questions : </p>
                  <h6 className="mt-1 mx-2"> 70</h6>
                </div>

                <div className="d-flex justify-content-center">
                  <p className="card-text">Duration : </p>
                  <h6 className="mt-1 mx-2">30 mins</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
