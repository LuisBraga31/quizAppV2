import questions from '../../data/questions';
import './temaQuiz.css';

export default function TemasQuiz() {

    const temas = [...new Set(questions.map(question => question.tag))];
    console.log(temas);

    return (
        <div className='temas'>
            {temas?.map( (tema, index) => (
                <span className={tema} key={index}> {tema} </span>
            ))}
        </div>
    )

}