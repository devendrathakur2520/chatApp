import './App.css';
import ChatWidget from './component/ChatWidget';

function App() {
  return (
    <div className="App">
     <h1>chat App</h1>
     <div className='w-full justify-center flex'><ChatWidget /></div>
    </div>
  );
}

export default App;
