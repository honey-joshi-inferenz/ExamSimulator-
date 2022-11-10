import React from 'react'
import './Signup.css'
import Logo from '../../assets/inferenz-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

export const Signup = () => {
  const navigate = useNavigate()
  return (
    <div className="signup">
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link className="navbar-brand mt-2 mt-lg-0" to="/home">
              <img src={Logo} height="30" alt="Logo" loading="lazy" />
            </Link>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          </div>
        </div>
      </nav>

      <div
        className="container d-flex justify-content-start flex-column"
        style={{ marginTop: '8rem' }}
      >
        <Link to="/" className="nav-link d-flex text-muted">
          <BiArrowBack style={{ marginTop: '0.2rem' }} /> &nbsp;
          <h6>Back to home</h6>
        </Link>

        <div
          className="card d-flex justify-content-center align-items-start p-3"
          style={{ marginTop: '10rem', height: '40px' }}
        >
          <h6 className="d-flex mt-3">
            Please &nbsp;
            <h6
              className="text-primary"
              onClick={() => navigate('/login')}
              style={{ cursor: 'pointer' }}
            >
              sign
            </h6>{' '}
            &nbsp; in before accessing exam.
          </h6>
        </div>
      </div>
    </div>
  )
}
