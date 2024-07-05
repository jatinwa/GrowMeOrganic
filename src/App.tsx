import { Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';

function App() {
  return (

      <Routes>
        <Route path="/" element={<UserForm/>} />
        <Route path="/second-page" element={<SecondPage/>} />
      </Routes>
  );
};

export default App
