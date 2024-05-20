import './App.css';
import { Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import Chatpage from './Pages/Chatpage';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Homepage} exact />
      {/* <Route path="/chats" component={Home} /> */}
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

const Home = () => {
  return (
    <>
      {/* <img
        src='https://i.ibb.co/h7W9LmW/CONVOVERs-E-1.jpg'
      /> */}
      Chat Application Home Page
    </>
  )
}

export default App;