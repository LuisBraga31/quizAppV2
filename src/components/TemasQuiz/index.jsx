import { Link } from "react-router-dom";

import questions from '../../data/questions';
import './temaQuiz.css';

export default function TemasQuiz() {

    const coresTema = {
        'Geografia': '#9a5833',
        'História': '#F7C942',
        'Matemática': '#5cb8ff',
        'Biologia': '#70ff63',
        'Química': '#FF6633',
        'Literatura': '#ff6961',
        'Religião': '#e9e9e9',
        'Esportes': '#009000',
        'Games': '#666666',
        'Oscar': '#daa520',
        'Filosofia': '#820ad1',
        'Inglês': '#ff7fff',
    }

    const temasCores = [];

    questions.forEach(question => {
      const temaExistente = temasCores.find(item => item.tag === question.tag);
    
      if (!temaExistente) {
        temasCores.push({ tag: question.tag, cor: coresTema[question.tag] });
      }
    });

    return (
        <div className='temas'>
            {temasCores?.map( (tema, index) => (
               <Link key={index} to={`/${index}`} style={{ backgroundColor: tema.cor}} className="link" > 
                <span> {tema.tag} </span> 
               </Link> 
            ))}
        </div>
    )

}