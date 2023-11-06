import { useParams } from "react-router-dom";

import questions from '../../data/questions';

export default function DetailQuestion() {

    const temasUnicos = [...new Set(questions.map(question => question.tag))];
    const detail = useParams();
    
    console.log(temasUnicos[detail.tag]);

    

    return (
        <main>
            <div className="content content-off">
                <span className="tag"> </span>
                <span className="spnQtd"> </span>
                <span className="question"> </span>
                <div className="answers"> </div>
            </div>  
        </main>
    )

}