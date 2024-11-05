import './App.css';
import { useCounter } from './common/hooks/useCounter';
import SimpleAccess from './components/SimpleAccess';
import { Provider } from './providers/Provider';
import DeepAccess from './components/DeepAccess';
import ArrayAccess from './components/ArrayAccess';

function App() {
  let [counter, inc] = useCounter()
  return (
    <div className="App" style={{ background: "red", height: 800 }}>
      {counter % 2 === 0 && <Provider>
        <SimpleAccess />
        <DeepAccess />
        <ArrayAccess />
      </Provider>}
      <button onClick={() => {
        inc();
        setTimeout(inc, 100);
      }}>reset</button>
    </div>
  );
}

export default App;
