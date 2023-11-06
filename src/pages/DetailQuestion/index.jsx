import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import questions from '../../data/questions';
import './detail.css';

export default function DetailQuestion() {

    const [indexAtual, setIndexAtual] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [finalizado, setFinalizado] = useState(false);
    const [feedback, setFeedback] = useState([]);
    const navigate = useNavigate();
    let perguntas= [];

    const coresTema = {
        '0': '#9a5833',
        '1': '#F7C942',
        '2': '#5cb8ff',
        '3': '#70ff63',
        '5': '#FF6633',
        '4': '#ff6961',
        '6': '#e9e9e9',
        '7': '#009000',
        '8': '#666666',
        '9': '#daa520',
        '10': '#800080',
        '11': '#ff7fff',
    }
    
    

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
            setFeedback([...feedback, true]);
        } else {
            setFeedback([...feedback, false]);
        }
        
        if (indexAtual < perguntas.length - 1) {
            setIndexAtual(indexAtual + 1); 
        } else {
            setFinalizado(true);

        }
    }

    function voltar() {
        navigate('/')
    }

    function reiniciar() {
        setFeedback([]);
        setAcertos(0);
        setIndexAtual(0);
        setFinalizado(false);
    }

    return (
        <main className="detailMain">
            { finalizado ?  (
                <div className="finish">
                    <span> Você acertou {acertos} de 4 </span>
                    <div className="feedback"> 
                        {perguntas.map((tema, index) => {
                            if(feedback[index] === true) {
                                return (
                                    <p key={index} className="green"> {index + 1}. {tema.question} </p>
                                );
                            } else {
                                return (
                                    <p key={index} className="red"> {index + 1}. {tema.question} </p>
                                );
                            }
                            
                        })}
                    </div>
                    <button onClick={reiniciar}>Reiniciar</button>
                    <button className="voltar" onClick={voltar}> Voltar Menu </button>
                </div>
            ) : (
                <div className="questionContent">
                    <div className="questionTagAndIndex">
                        <span className="tag" style={{ backgroundColor: coresTema[detail.tag]}}> {perguntas[indexAtual].tag} </span>
                        <span>  </span>
                        <span className="questionIndex"> {indexAtual+1} / {perguntas.length} </span>
                    </div>
                    <span className="questionDescribe"> {indexAtual+1}. {perguntas[indexAtual].question} </span>
                    <div className="answers">
                        {perguntas[indexAtual].answers.map((tema, index) => (
                        <button key={index} data-correct={`${tema.correct}`} onClick={(e) => nextQuestion(e)} style={{ backgroundColor: coresTema[detail.tag]}} > 
                            {tema.option} 
                        </button>
                        ))}
                    </div>
                </div>     
            )}

        </main>
    )

}