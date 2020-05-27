import React, { Component} from 'react';
import Navigation from'./components/Navigation/Navigation';
import './App.css';
import Logo from'./components/Logo/Logo';
import ImageLinkForm from'./components/ImageLinkForm/ImageLinkForm';

class App extends Component {
  render(){
   return (
    <div className="App">
      <Navigation/>
      <Logo/>
      <ImageLinkForm/>
    {/*

      <FaceRecognition/>*/}
    </div>
   );
  } 
}

export default App;
