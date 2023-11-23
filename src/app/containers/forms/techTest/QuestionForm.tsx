"use client";

import { useEffect, useState } from "react";

const QuestionForm = ({ testId, question, currentQuestionIndex, onNextQuestion, labels }: any) => { 

    const [answer, setAnswer] = useState(0);
    const [options, setOptions] = useState();
    useEffect(() => {
      const radioButtons = question?.posibles_respuestas?.map((respuesta:any, index:any) => (
        <div key={index} className="m-2">
          <label>
            <input
              id={respuesta.id_respuesta}
              type="radio"
              name="answer"
              value={respuesta.id_respuesta}
              onChange={handleChange}
              className="mx-2"
            />
            {respuesta.respuesta}
          </label>
        </div>            
      ))
      setOptions(radioButtons);
    }, [question])

    const handleChange = (event:any) => {
      setAnswer(parseInt(event.target.value))
    }
    const endTest = () => {
      fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/evaluacion/finalizar/${testId}`,{
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

    if (currentQuestionIndex >= 5 ) {
      let finalLabel = labels.cta_finished_test;
      endTest();
      return (
        <div>
          <p id='idFinal'>{finalLabel}</p>
        </div>
      );
    }

    const onClickButtonNext = () =>{ 
      const body = {
        "idEvaluacion": testId,
        "idPregunta":question.id_pregunta,
        "idRespuesta": answer
      }
      fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/evaluacion/pregunta/responder`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      .then(res => res.status)
      .then(res => {
        if(res === 409){
          endTest();
          onNextQuestion(true)
        }
        else if(res === 400){
          alert('Error enviando respuesta')
        }
        else {
         onNextQuestion();
        }
      })   
      .catch((error) => {
        console.error('Request failed', error);
      });
    }
       

    return (
      <div>
        <p id='question'>{question?.pregunta}</p>
        <form className="m-5 my-10">
          {options}
        </form>
        <p className='text-[#9095A0] font-light'> {labels.label_question} {currentQuestionIndex + 1} {labels.label_of} 5</p>
        <button
          className="bg-teal-700 text-white focus:outline-none mr-2 my-2 rounded p-2 inline-flex align-bottom"
          onClick={onClickButtonNext}
        >
          {labels.cta_next}
        </button>
      </div>
    );
}

export default QuestionForm;
