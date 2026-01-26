import './App.css'

function App() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center overflow-hidden fixed top-0 left-0">
        <video 
          src="/bask.mp4"
          loop 
          muted 
          autoPlay 
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </>
  )
}

export default App
