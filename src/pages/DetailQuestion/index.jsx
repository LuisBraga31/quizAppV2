/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { coresTema } from '../../data/coresTemas';
import questions from '../../data/questions';
import './detail.css';

export default function DetailQuestion() {

    const [perguntas, setPerguntas] = useState([]);
    const [indexAtual, setIndexAtual] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [url, setUrl] = useState('');
    const [finalizado, setFinalizado] = useState(false);
    const [feedback, setFeedback] = useState([]);

    const detail = useParams();
    const navigate = useNavigate();
    
    function getPerguntasList() {
        
        let listPerguntas = [];
        const temasUnicos = [...new Set(questions.map(question => question.tag))];

        for (let i = 0; i < questions.length; i++) {
            if(questions[i].tag === temasUnicos[detail.tag]) {
                listPerguntas.push(questions[i]);
            }      
        }

        setPerguntas(listPerguntas);
    }

    useEffect(() => {
        getPerguntasList();
    }, []) 
    
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
        if(perguntas.length === 10) {
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
        } else {
            if(acertos == 0 ) {
                setUrl('https://www.maxieduca.com.br/blog/wp-content/uploads/2017/10/Nota-Zero.jpg');
              } else if(acertos == 1) {
                setUrl('https://extra.globo.com/incoming/25209387-3f4-847/w640h360-PROP/meme-chloe.png');
              } else if(acertos == 2) {
                setUrl('https://pm1.aminoapps.com/6389/9c28e4faffa7fc8556b19863a3f2bbab507a1cab_hq.jpg');
              } else if(acertos == 3) {
                setUrl('https://ichef.bbci.co.uk/news/640/amz/worldservice/live/assets/images/2015/04/15/150415162940_success_kid_624x351_arquivopessoal.jpg');
              } else if(acertos == 4) {
                setUrl('https://media.tenor.com/53mmUaqb1b0AAAAC/copa-torcedor.gif');
              }
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

    return (
        <main className="detailMain">
            { finalizado ?  (
                
                <div className="finish">
                    <span> Você acertou {acertos} de {perguntas?.length} </span>
                    <div className="feedback"> 
                        {perguntas?.map((tema, index) => {
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
                        <span className="tag" style={{ backgroundColor: coresTema[perguntas[indexAtual]?.tag]}}> {perguntas[indexAtual]?.tag} </span>
                        
                        <span className="questionIndex"> {indexAtual+1} / {perguntas?.length} </span>
                    </div>
                    <span className="questionDescribe"> {indexAtual+1}. {perguntas[indexAtual]?.question} </span>
                    <div className="answers">
                        {perguntas[indexAtual]?.answers.slice().sort(() => Math.random() - 0.5).map((tema, index) => (
                            
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