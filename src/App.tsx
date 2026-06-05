import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login/Login'

function App() {
  return (
    <main className="bg-[linear-gradient(135deg,_#09030f_0%,_#03060f_100%)] fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="max-h-[900px] max-w-[1200px] h-full w-full lg:rounded-[20px] shadow-lg bg-primary-bg flex items-center justify-center p-5 sm:p-10 gap-4">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/weather" element={<div>Weather Page</div>} />
        </Routes>
      </BrowserRouter>
      </div>
    </main>
  )
}

export default App
