import Navbar from './components/Navbar'
// import Wandercards from './components/Wandercards'
import Write from './components/Write'


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="card-container">
        {/* <Wandercards/> */}
        <Write />
        
      </div>
    </div>
  );
}

export default App;
