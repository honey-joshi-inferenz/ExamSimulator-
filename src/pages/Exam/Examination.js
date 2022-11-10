import React, { useEffect, useState } from 'react'
import './Examination.css'
import logo from '../../assets/inferenz-logo.png'
import { Exam } from './Exam'

import axios from 'axios'
import { Baseurl } from '../../Config/Baseurl'
import icon from '../../assets/i.png'
import { MdSchool, MdEmail, MdPhoneInTalk } from 'react-icons/md'
import { RiFileEditFill } from 'react-icons/ri'
import { Timer } from './Timer'

export const Examination = () => {
  const userId = localStorage.getItem('userId')

  const [data, setData] = useState([])

  const getProfile = async () => {
    await axios
      .post(Baseurl.nodeLocal + 'auth/fetchProfile', {
        stud_id: userId,
      })
      .then((res) => {
        console.log(res)
        setData(res.data.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <>
      <div className="examination" style={{ height: '100vh' }}>
        <div className="container py-4">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-2 shadow"
              >
                <ul className="breadcrumb mb-0 d-flex justify-content-between">
                  <li
                    className="breadcrumb-item active"
                    style={{ fontSize: '1.5rem' }}
                    aria-current="page"
                  >
                    <img src={logo} alt="logo" height={30} />
                  </li>
                  <li>
                    <Timer />
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body text-center">
                  <img
                    src={icon}
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: '150px' }}
                  />
                  <h5 className="my-3">{data.name}</h5>
                  <div className="row mb-1">
                    <div className="text-primary">
                      <MdSchool />
                    </div>
                    <h6 className="text-muted mb-1">{data.institute}</h6>
                  </div>

                  <div className="row mb-1">
                    <div className="text-primary">
                      <RiFileEditFill />
                    </div>
                    <h6 className="text-muted mb-1">{data.enrollment}</h6>
                  </div>

                  <div className="row mb-1">
                    <div className="text-primary">
                      <MdEmail />
                    </div>
                    <h6 className="text-muted mb-1">{data.email}</h6>
                  </div>

                  <div className="row mb-1">
                    <div className="text-primary">
                      <MdPhoneInTalk />
                    </div>
                    <h6 className="text-muted mb-1">{data.contact}</h6>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <Exam />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
