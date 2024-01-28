/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import questions from '../../data/questions';
import './detail.css';

export default function DetailQuestion() {

    const [indexAtual, setIndexAtual] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [url, setUrl] = useState('');
    const [finalizado, setFinalizado] = useState(false);
    const [feedback, setFeedback] = useState([]);
    const detail = useParams();
    const navigate = useNavigate();

    let perguntas= [];

    const temasUnicos = [...new Set(questions.map(question => question.tag))];
    const coresTema = {
        '0': '#ba6f43',
        '1': '#F7C942',
        '2': '#5cb8ff',
        '3': '#70ff63',
        '5': '#FF6633',
        '4': '#ff6961',
        '6': '#e9e9e9',
        '7': '#009000',
        '8': '#666666',
        '9': '#daa520',
        '10': '#9400D3',
        '11': '#ff7fff',
        '12': '#ff271a',
        '13': '#B0C4DE',
    }
    
    for (let i = 0; i < questions.length; i++) {
        if(questions[i].tag === temasUnicos[detail.tag]) {
          perguntas.push(questions[i]);
        }      
    }

    useEffect( () => {
        getCustomFeedback();
        
        if(finalizado) {
            Swal.fire({
                title: 'Jogo Finalizado!',
                text: `Você acertou ${acertos} de ${perguntas.length}`,
                imageUrl: `${url}`,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
                confirmButtonText: 'Ver feedback',
                confirmButtonColor: 'green'
              })
        }

    }, [acertos, url, finalizado])
    
    function nextQuestion(e) {
     
        if (e.target.getAttribute("data-correct") === "true") {
            setAcertos(acertos => acertos + 1);
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
    
    function reiniciar() {
        setFeedback([]);
        setAcertos(0);
        setIndexAtual(0);
        setFinalizado(false);
    }

    const getCustomFeedback = () => {
        console.log(acertos)
        if(acertos == 0 || acertos == 1) {
            setUrl('https://www.maxieduca.com.br/blog/wp-content/uploads/2017/10/Nota-Zero.jpg');
          } else if(acertos >= 2 && acertos <= 4) {
            setUrl('https://extra.globo.com/incoming/25209387-3f4-847/w640h360-PROP/meme-chloe.png');
          } else if(acertos >= 5 && acertos <= 7) {
            setUrl('https://pm1.aminoapps.com/6389/9c28e4faffa7fc8556b19863a3f2bbab507a1cab_hq.jpg');
          } else if(acertos == 8 || acertos == 9) {
            setUrl('https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2015/04/15/150415162940_success_kid_624x351_arquivopessoal.jpg');
          } else if(acertos == 10) {
            setUrl('https://media.tenor.com/53mmUaqb1b0AAAAC/copa-torcedor.gif');
          }
    }


    return (
        <main className="detailMain">
            { finalizado ?  (
                
                <div className="finish">
                    <span> Você acertou {acertos} de {perguntas.length} </span>
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
                    <button className="voltar" onClick={() => navigate('/')}> Voltar Menu </button>
                </div>

            ) : (
                
                <div className="questionContent">
                    <div className="questionTagAndIndex">
                        <span className="tag" style={{ backgroundColor: coresTema[detail.tag]}}> {perguntas[indexAtual].tag} </span>
                        
                        <span className="questionIndex"> {indexAtual+1} / {perguntas.length} </span>
                    </div>
                    <span className="questionDescribe"> {indexAtual+1}. {perguntas[indexAtual].question} </span>
                    <div className="answers">
                        {perguntas[indexAtual].answers.slice().sort(() => Math.random() - 0.5).map((tema, index) => (
                            
                            <button key={index} data-correct={`${tema.correct}`} onClick={(e) => nextQuestion(e)} > 
                                {tema.option} 
                            </button>

                        ))}
                    </div>
                </div>  

            )}

        </main>
    )

}