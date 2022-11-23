import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import axios from 'axios'
import { Baseurl } from '../../Config/Baseurl'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Login = () => {
  toast.configure()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [values, setValues] = useState({ enroll: '', password: '' })

  let name, value
  const handleChange = (e) => {
    name = e.target.name
    value = e.target.value

    setValues({ ...values, [name]: value })
  }
  const onMouseDown = () => {
    setShowPassword(!showPassword)
  }

  const submit = async (e) => {
    e.preventDefault()
    await axios
      .post(Baseurl.nodeLocal + 'auth/login', {
        enrollment: values.enroll,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem('userId', res.data.userID)
        localStorage.setItem('user', true)
        navigate('/examination')
      })
      .catch((error) => {
        if (error.request.status === 0) {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 8000,
          })
        } else {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 8000,
          })
        }
      })
  }
  return (
    <div className="login">
      <div className="container mt-5   d-flex align-items-center">
        <div className="row d-flex justify-content-center align-items-center mt-5">
          <div className="col-md-9 col-lg-6 col-xl-5 mt-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="loginbanner"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 card p-4 border border-0">
            <form onSubmit={submit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <h4>Sign In</h4>
              </div>

              <div className="form-outline mb-4 mt-5">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control "
                  placeholder="UserId"
                  name="enroll"
                  value={values.enroll}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group form-outline mb-3">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="form3Example4"
                  className="form-control "
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="input-group-text"
                  style={{ cursor: 'pointer' }}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseDown}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-sm"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
