import  Header  from './components/Header';
import questions from './data/questions';
import { RouteList } from './routes';
function App() {

  console.log(questions)
  return (
    <>
      <Header/>
      <RouteList/>
    </>
  )
}

export default App
