import React, { useEffect, useState } from 'react'
import './Examination.css'
import logo from '../../assets/inferenz-logo.png'
import { Exam } from './Exam'
import moment from 'moment'
import axios from 'axios'
import { Baseurl } from '../../Config/Baseurl'
import icon from '../../assets/i.png'
import { MdSchool, MdEmail, MdPhoneInTalk } from 'react-icons/md'
import { RiFileEditFill } from 'react-icons/ri'
import { Instructions } from './Instructions'
import Countdown from 'react-countdown'
import { useNavigate } from 'react-router-dom'

export const Examination = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event
    // Cancel the event
    e.preventDefault()
    if (e) {
      e.returnValue = '' // Legacy method for cross browser support
    }
    return '' // Legacy method for cross browser support
  }

  window.addEventListener('beforeunload', (ev) => {
    ev.preventDefault()
    return (ev.returnValue = 'Are you sure you want to close?')
  })

  document.oncontextmenu = function (e) {
    console.log(e.button)
    if (e.button == 2) {
      e.preventDefault()
      return false
    }
  }

  const userId = localStorage.getItem('userId')
  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [exam, setExam] = useState(false)
  const [values, setValues] = useState([])
  const [ques, setQues] = useState([])

  const getProfile = async () => {
    await axios
      .post(Baseurl.nodeLocal + 'auth/fetchProfile', {
        stud_id: userId,
      })
      .then((res) => {
        setData(res.data.data[0])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getQues = async () => {
    await axios
      .post(Baseurl.nodeLocal + 'question/fetchExamWiseQuestions', {
        exam_id: values.exam_id,
      })
      .then((res) => {
        setQues(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getExam = async () => {
    await axios
      .post(Baseurl.nodeLocal + 'studQue/fetchOngoingExams', {
        stud_id: userId,
      })
      .then((res) => {
        setValues(res.data.data[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getProfile()
    getExam()
  }, [])

  var d = moment.duration(values.duration, 'milliseconds')
  var hours = Math.floor(d.asHours())
  var mins = Math.floor(d.asMinutes()) - hours * 60

  global.total = 0

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      navigate('/exam-finished')
    } else {
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      )
    }
  }
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
                  {exam ? (
                    <li>
                      <h5 className="mt-2">
                        <Countdown
                          date={Date.now() + parseInt(values.duration)}
                          renderer={renderer}
                          onTick={(time) => {
                            global.total = values.duration - time.total
                          }}
                        />
                      </h5>
                    </li>
                  ) : (
                    ''
                  )}
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
              {exam ? (
                <Exam data={ques} examId={values.exam_id} />
              ) : (
                <>
                  <div className="card col-md-8">
                    <div className="row mt-1 p-4">
                      <div className="tab-content profile-tab">
                        <div
                          className="tab-pane fade show active"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <div className="row">
                            <div className="col-md-6 d-flex justify-content-start">
                              <h6>Exam</h6>
                            </div>
                            <div className="col-md-6">
                              <h6 className="text-primary d-flex justify-content-start">
                                {values.exam_name}
                              </h6>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 d-flex justify-content-start">
                              <h6>Total Questions</h6>
                            </div>
                            <div className="col-md-6 d-flex justify-content-start">
                              <h6 className="text-primary">
                                {' '}
                                {values.total_que}
                              </h6>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 d-flex justify-content-start">
                              <h6>Duration</h6>
                            </div>
                            <div className="col-md-6 d-flex justify-content-start">
                              <h6 className="text-primary d-flex justify-content-start">
                                {hours
                                  ? (hours = 1
                                      ? hours + ' ' + 'hour'
                                      : hours > 1
                                      ? hours + ' ' + 'hours'
                                      : '')
                                  : ''}{' '}
                                {mins} minutes
                              </h6>
                            </div>
                            <div className="col-md-8 d-flex justify-content-start mt-3">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => {
                                  setExam(true)
                                  getQues()
                                }}
                              >
                                Start Exam
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Instructions />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
