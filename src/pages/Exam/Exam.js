import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Baseurl } from '../../Config/Baseurl'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

export const Exam = (props) => {
  const navigate = useNavigate()
  toast.configure()
  const userId = localStorage.getItem('userId')

  const [i, setI] = useState(0)
  const [answer, setAnswer] = useState()
  const [activeQuestion, setActiveQuestion] = useState()

  const onChange = (e) => {
    setAnswer(e.target.value)
  }

  const decrement = (e) => {
    e.preventDefault()

    setActiveQuestion(props.data[i - 1])
    setI(i - 1)

    if (props.data[i - 1].givenAns != '') {
      setAnswer(props.data[i - 1].givenAns)
    }
  }

  const saveNext = async (e) => {
    e.preventDefault()

    await axios
      .post(Baseurl.nodeLocal + 'studQue/storeAns', {
        stud_id: userId,
        exam_id: props.examId,
        que_id: props.data[i].que_id,
        given_ans: answer,
        correct_ans: props.data[i].correct_ans,
      })
      .then((res) => {
        if (res.status == 200) {
          if (props.data[i + 1].givenAns != '') {
            setAnswer(props.data[i + 1].givenAns)
          } else {
            props.data[i].givenAns = answer
            setAnswer('')
          }
          setActiveQuestion(props.data[i + 1])
          setI(i + 1)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const save = async (e) => {
    e.preventDefault()
    await axios
      .post(Baseurl.nodeLocal + 'studQue/storeAns', {
        stud_id: userId,
        exam_id: props.examId,
        que_id: props.data[i].que_id,
        given_ans: answer,
        correct_ans: props.data[i].correct_ans,
      })
      .then((res) => {
        props.data[i].givenAns = answer
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const submit = async (e) => {
    console.log(Date.now(), 'after submit')
    e.preventDefault()
    await axios
      .post(Baseurl.nodeLocal + 'result/storeResult', {
        stud_id: userId,
        exam_id: props.examId,
        time_taken: global.total,
      })
      .then((res) => {
        console.log(res)
        navigate('/submit-exam')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="examDiv">
      <div className="d-flex justify-content-center">
        {props.data.length > 0 ? (
          <>
            <div
              className="card w-100 p-5 examCard"
              style={{ marginTop: '4%' }}
            >
              <div className="queAns mt-3">
                <h6>{props.data[i].que_text}</h6>
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
                          checked={
                            answer === 'a' || props.data[i].givenAns === 'a'
                          }
                          id="flexRadioDefault1"
                        />
                        <h6
                          className="form-check-label text-start"
                          htmlFor="flexRadioDefault1"
                        >
                          {props.data[i].opt1}
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
                          checked={
                            answer === 'b' || props.data[i].givenAns === 'b'
                          }
                          id="flexRadioDefault1"
                        />
                        <h6
                          className="form-check-label text-start"
                          htmlFor="flexRadioDefault1"
                        >
                          {props.data[i].opt2}
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
                          checked={
                            answer === 'c' || props.data[i].givenAns === 'c'
                          }
                          id="flexRadioDefault1"
                        />
                        <h6
                          className="form-check-label text-start"
                          htmlFor="flexRadioDefault1"
                        >
                          {props.data[i].opt3}
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
                          checked={
                            answer === 'd' || props.data[i].givenAns === 'd'
                          }
                          id="flexRadioDefault1"
                        />
                        <h6
                          className="form-check-label text-start"
                          htmlFor="flexRadioDefault1"
                        >
                          {props.data[i].opt4}
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
                {i + 1 === props.data.length ? (
                  <>
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      onClick={save}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Submit Exam
                    </button>
                  </>
                ) : (
                  <>
                    {/* <button
                      className="btn btn-outline-primary btn-sm"
                      type="submit"
                      onClick={increment}
                    >
                      Next
                    </button> */}
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
                  Question {i + 1} of {props.data.length}
                </span>
              </div>
            </div>
          </>
        ) : (
          ''
        )}
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
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
                onClick={submit}
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
