"use client";
import { Suspense, useEffect, useState } from "react";

import QuestionForm from "./QuestionForm";

const TechTest = ({ labels }: any) => {
  const totalQuestions = 5;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [test, setTest] = useState(0);
  const [question, setQuestion] = useState({});
  const [error, setError]= useState(false);

  const endTest = () => {
    setError(true)
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/evaluacion/finalizar/${test}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.status)
    .then(res => {
      if(res === 200){
        localStorage.removeItem('testId');
      }
    })   
    .catch((error) => {
      console.error('Request failed', error);
    });
  }


  useEffect(() => {
    const testId = localStorage.getItem('testId') || '0';
    setTest(parseInt(testId));
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/evaluacion/pregunta/solicitar/${testId}`,{
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      if(res.codigoError === 409){
        endTest()
      }
      else setQuestion(res)
    })   
    .catch((error) => {
      console.error('Request failed', error);
    });
  }, [currentQuestionIndex])

  const handleNextQuestion = (error:boolean) => {
    if(error) return setError(true);
    if (currentQuestionIndex <= totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="m-5">
      
      <Suspense fallback={<p>{labels.label_loading}</p>}>
        {error && (
          <p id='endTest'>{labels.cta_finished_test}</p>
        )}
        {!error && (
          <div>
            <h1 className="my-5">{labels.title_test}</h1>
            <QuestionForm
              question={question}
              currentQuestionIndex={currentQuestionIndex}
              onNextQuestion={handleNextQuestion}
              labels={labels}
              testId={test}
            />
          </div>
        )}       
      </Suspense>
    </div>
  );
}

export default TechTest;
