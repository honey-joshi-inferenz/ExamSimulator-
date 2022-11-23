import React from 'react'

export const Instructions = () => {
  return (
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
          The Time of the examination begins only when the ‘Start Test’ button
          is pressed. So make sure to complete the exam within specified timing.
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
          You are allowed to submit only once, make sure that you have correctly
          attempted all the questions before submission.
        </li>
        <li className="text-start mt-1">
          There will be NO NEGATIVE MARKING for the wrong answers.
        </li>
        <li className="text-start mt-1">
          Students are instructed to avoid mal-practices, and perform ethically
          during the exam.
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
  )
}
