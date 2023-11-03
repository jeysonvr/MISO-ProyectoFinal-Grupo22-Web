"use client";
import { Suspense, useEffect, useState } from "react";

import QuestionForm from "./QuestionForm";

const TechTest = ({ labels }: any) => {
  const totalQuestions = 5;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [test, setTest] = useState(0);
  const [question, setQuestion] = useState({});
  const [error, setError]= useState(false);
  useEffect(() => {
    const testId = localStorage.getItem('testId') || '0';
    setTest(parseInt(testId));
    fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/evaluacion/pregunta/solicitar/${testId}`,{
        method: 'GET',
    })
    .then(res => res.json())
    .then(res => {
      setQuestion(res)
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
      <h1 className="my-5">{labels.title_test}</h1>
      <Suspense fallback={<p>{labels.label_loading}</p>}>
        {error && (
          <p>{labels.cta_finiched_test}</p>
        )}
        {!error && (
          <QuestionForm
            question={question}
            currentQuestionIndex={currentQuestionIndex}
            onNextQuestion={handleNextQuestion}
            labels={labels}
            testId={test}
          />
        )}       
      </Suspense>
    </div>
  );
}

export default TechTest;
