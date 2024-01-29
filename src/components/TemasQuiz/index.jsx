/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { coresTema } from '../../data/coresTemas';
import questions from '../../data/questions';
import './temaQuiz.css';

export default function TemasQuiz() {

    const [temas, setTemas] = useState([]);
    
    function getTemas() {
      const temasCores = [];

      questions.forEach(question => {
        const temaExistente = temasCores.find(item => item.tag === question.tag);
      
        if (!temaExistente) {
          temasCores.push({ tag: question.tag, cor: coresTema[question.tag] });
        }
      });

      setTemas(temasCores);
      
    }

    useEffect(() => {
      getTemas();
    }, [])

    return (
        <div className = "temas">
            
            {temas?.map( (tema, index) => (
              <Link key={index} to={`/${index}`} style={{ backgroundColor: tema.cor}} className="link" > 
                <span> {tema.tag} </span> 
              </Link> 
            ))}
            
        </div>
    )

}