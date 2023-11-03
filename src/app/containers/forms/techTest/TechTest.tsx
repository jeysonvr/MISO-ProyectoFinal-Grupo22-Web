"use client";
import { Suspense, useState } from "react";

import QuestionForm from "./QuestionForm";

const TechTest = ({ questions, labels }: any) => {
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);


  const handleNextQuestion = () => {
    if (currentQuestionIndex <= questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="m-5">
      <h1 className="my-5">{labels.title_test}</h1>
      <Suspense fallback={<p>{labels.label_loading}</p>}>
        <QuestionForm
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onNextQuestion={handleNextQuestion}
          labels={labels}
        />
      </Suspense>
    </div>
  );
}

export default TechTest;
