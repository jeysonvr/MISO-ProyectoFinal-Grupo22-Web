"use client";

import { useState } from "react";

const QuestionForm = ({ questions, currentQuestionIndex, onNextQuestion, labels }: any) => {
    const currentQuestion = questions[currentQuestionIndex];
    const [answer, setAnswer] = useState(0);
    const handleChange = (event:any) => {
      setAnswer(event.target.value)
    }
  
    if (currentQuestionIndex >= questions.length ) {
      // fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/${mapUser[userType]}/`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(bodyObject),
      // });
      return (
        <div>
          <p>{labels.cta_finiched_test}</p>
        </div>
      );
    }
    const onClickButtonNext = () =>{
      // enviar rta be
      // llamar next test
      // fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/${mapUser[userType]}/`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(bodyObject),
      // });
      onNextQuestion();
      console.log(answer);
    }
  
    return (
        <div>
        <p>{currentQuestion.text}</p>
        <form className="m-5 my-10">
          {currentQuestion.options.map((option: any, index: number) => (
            <div key={index} className="m-2">
              <label >
                <input type="radio" name="answer" value={option} onChange={handleChange} />
                {option}
              </label>
            </div>
            
          ))}
        </form>
        <p className='text-[#9095A0] font-light'> {labels.label_question} {currentQuestionIndex + 1} {labels.label_of} {questions.length}</p>
        <button className="bg-teal-700 text-white focus:outline-none mr-2 my-2 rounded p-2 inline-flex align-bottom" onClick={onClickButtonNext}>{labels.cta_next}</button>
      </div>
    );
}

export default QuestionForm;
