import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import questions from '../../data/questions';
import './detail.css';

export default function DetailQuestion() {

    const [indexAtual, setIndexAtual] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const navigate = useNavigate();
    let perguntas= [];

    const temasUnicos = [...new Set(questions.map(question => question.tag))];
    const detail = useParams();

    for (let i = 0; i < questions.length; i++) {
        if(questions[i].tag === temasUnicos[detail.tag]) {
          perguntas.push(questions[i]);
        }
    }

    function nextQuestion(e) {
     
        if (e.target.getAttribute("data-correct") === "true") {
            setAcertos(acertos + 1);
        }
        
        if (indexAtual < perguntas.length - 1) {
            setIndexAtual(indexAtual + 1); 
        } else {
            navigate('/');
        }


    }


    return (
        <main>
            <div className="content">
                <span className="tag"> {perguntas[indexAtual].tag} </span>
                <span className="spnQtd"> {indexAtual+1}/{perguntas.length} </span>
                <span className="question"> {perguntas[indexAtual].question} </span>
                <div className="answers">
                    {perguntas[indexAtual].answers.map((tema, index) => (
                        <button key={index} data-correct={`${tema.correct}`} onClick={(e) => nextQuestion(e)} > 
                            {tema.option} 
                        </button>
                    ))}
                </div>
            </div>  
        </main>
    )

}