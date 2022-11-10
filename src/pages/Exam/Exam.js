import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Baseurl } from '../../Config/Baseurl'
import moment from 'moment'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { Timer } from './Timer'

export const Exam = () => {
  const navigate = useNavigate()
  toast.configure()
  const userId = localStorage.getItem('userId')

  const [exam, setExam] = useState(false)
  const [data, setData] = useState([])
  const [ques, setQues] = useState([])
  const [i, setI] = useState(0)
  const [answer, setAnswer] = useState()

  const getExam = async () => {
    await axios
      .post(Baseurl.nodeLocal + 'studQue/fetchOngoingExams', {
        stud_id: userId,
      })
      .then((res) => {
        // console.log(res)
        setData(res.data.data[0])
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getQues = async () => {
    await axios
      .post(Baseurl.nodeLocal + 'question/fetchExamWiseQuestions', {
        exam_id: data.exam_id,
      })
      .then((res) => {
        // console.log(res)
        setQues(res.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getExam()
  }, [])

  const increment = async (e) => {
    e.preventDefault()
    if (ques[i].givenAns != '' && answer == '') {
      setAnswer(ques[i].givenAns)
    } else {
      ques[i].givenAns = answer
    }

    if (i + 1 < ques.length) {
      setI(i + 1)
    }
    setAnswer('')
  }

  const decrement = (e) => {
    e.preventDefault()
    if (i > 0) {
      setI(i - 1)
    }
    if (ques[i].givenAns != '' && answer == '') {
      console.log('has answer')
    }
  }

  const saveNext = async (e) => {
    e.preventDefault()
    await axios
      .post(Baseurl.nodeLocal + 'studQue/storeAns', {
        stud_id: userId,
        exam_id: data.exam_id,
        que_id: ques[i].que_id,
        given_ans: answer,
        correct_ans: ques[i].correct_ans,
      })
      .then((res) => {
        if (ques[i].givenAns != '' && answer == '') {
          setAnswer(ques[i].givenAns)
        } else {
          ques[i].givenAns = answer
        }
        if (res.status == 200) {
          if (i + 1 < ques.length) {
            setI(i + 1)
          }
        }
        setAnswer('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onChange = (e) => {
    setAnswer(e.target.value)
  }

  var d = moment.duration(data.duration, 'milliseconds')
  var hours = Math.floor(d.asHours())
  var mins = Math.floor(d.asMinutes()) - hours * 60
  return (
    <div className="examDiv">
      {exam ? (
        <div className="d-flex justify-content-center">
          {ques.length > 0 ? (
            <>
              <div
                className="card w-100 p-5 examCard"
                style={{ marginTop: '4%' }}
              >
                <div className="queAns mt-3">
                  <h6>{ques[i].que_text}</h6>
                  {/* <img alt="question" /> */}

                  <hr />
                  <div>
                    <div className="row">
                      <div className="col-md-12 d-flex">
                        <div className="form-check  col-md-12">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="answer"
                            value="a"
                            onChange={onChange}
                            checked={answer === 'a' || ques[i].givenAns === 'a'}
                            id="flexRadioDefault1"
                          />
                          <h6
                            className="form-check-label text-start"
                            htmlFor="flexRadioDefault1"
                          >
                            {ques[i].opt1}
                          </h6>
                        </div>
                      </div>
                    </div>

                    <div className="row mt-2">
                      <div className="col-md-12 d-flex">
                        <div className="form-check  col-md-12">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="answer"
                            value="b"
                            onChange={onChange}
                            checked={answer === 'b' || ques[i].givenAns === 'b'}
                            id="flexRadioDefault1"
                          />
                          <h6
                            className="form-check-label text-start"
                            htmlFor="flexRadioDefault1"
                          >
                            {ques[i].opt2}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12 d-flex">
                        <div className="form-check  col-md-12">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="answer"
                            value="c"
                            onChange={onChange}
                            checked={answer === 'c' || ques[i].givenAns === 'c'}
                            id="flexRadioDefault1"
                          />
                          <h6
                            className="form-check-label text-start"
                            htmlFor="flexRadioDefault1"
                          >
                            {ques[i].opt3}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-md-12 d-flex">
                        <div className="form-check  col-md-12">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="answer"
                            value="d"
                            onChange={onChange}
                            checked={answer === 'd' || ques[i].givenAns === 'd'}
                            id="flexRadioDefault1"
                          />
                          <h6
                            className="form-check-label text-start"
                            htmlFor="flexRadioDefault1"
                          >
                            {ques[i].opt4}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                  <button
                    className={
                      i === 0
                        ? 'btn btn-outline-secondary disabled btn-sm'
                        : 'btn btn-outline-secondary btn-sm'
                    }
                    type="submit"
                    onClick={decrement}
                  >
                    Previous
                  </button>
                  {i + 1 === ques.length ? (
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-primary btn-sm"
                        type="submit"
                        onClick={increment}
                      >
                        Next
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        type="submit"
                        onClick={saveNext}
                      >
                        Save & Next
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-3 text-start">
                  <span
                    className="mt-1 text-muted"
                    style={{ fontSize: '14px', fontWeight: 600 }}
                  >
                    Question {i + 1} of {ques.length}
                  </span>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div>
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
                        {data.exam_name}
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 d-flex justify-content-start">
                      <h6>Total Questions</h6>
                    </div>
                    <div className="col-md-6 d-flex justify-content-start">
                      <h6 className="text-primary"> {data.total_que}</h6>
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
          <div className="card col-md-8 p-4">
            <h6 className="text-primary text-start">Instructions</h6>
            <ul>
              <li className="text-start mt-4">Do not change the tab.</li>
              <li className="text-start mt-1">
                Do not refresh the page once you start the exam.
              </li>
              <li className="text-start mt-1">
                Make sure you have good internet connection.
              </li>
              <li className="text-start mt-1">
                The Time of the examination begins only when the ‘Start Test’
                button is pressed. So make sure to complete the exam within
                specified timing.
              </li>
              <li className="text-start mt-1">
                Please select the correct answer from the choices given.
              </li>
              <li className="text-start mt-1">
                All Questions are compulsory and each carries 1 mark.
              </li>
              <li className="text-start mt-1">
                Exam topics include Reasoning, SQL, and Python.
              </li>
              <li className="text-start mt-1">
                You are allowed to submit only once, make sure that you have
                correctly attempted all the questions before submission.
              </li>
              <li className="text-start mt-1">
                There will be NO NEGATIVE MARKING for the wrong answers.
              </li>
              <li className="text-start mt-1">
                Students are instructed to avoid mal-practices, and perform
                ethically during the exam.
              </li>
              <li className="text-start mt-1">
                No students would be entertained if found doing any unethical
                activities during the exam.
              </li>
              <li className="text-start mt-1">
                Wish you all the best for your examinations.
              </li>
            </ul>
          </div>
        </div>
      )}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Submit Exam
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to submit the exam ?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => navigate('/submit-exam')}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
