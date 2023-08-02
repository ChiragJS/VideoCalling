
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import MeetingPage from './components/MeetingPage';
import { LandingPage } from './components/LandingPage';
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/meeting/:roomId' element={<MeetingPage />} />
        <Route path="*" element={<LandingPage/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
