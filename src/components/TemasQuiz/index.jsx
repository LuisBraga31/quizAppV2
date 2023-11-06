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
    }

    const temasCores = [];

    questions.forEach(question => {
      const temaExistente = temasCores.find(item => item.tag === question.tag);
    
      if (!temaExistente) {
        temasCores.push({ tag: question.tag, cor: coresTema[question.tag] });
      }
    });
    
    console.log(temasCores);

    return (
        <div className='temas'>
            {temasCores?.map( (tema, index) => (
                <span style={{ backgroundColor: tema.cor}} key={index}> {tema.tag} </span>
            ))}
        </div>
    )

}