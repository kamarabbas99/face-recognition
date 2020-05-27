import React, { Component} from 'react';
import Navigation from'./components/Navigation/Navigation';
import './App.css';
import Logo from'./components/Logo/Logo';
import ImageLinkForm from'./components/ImageLinkForm/ImageLinkForm';
import Rank from'./components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from'clarifai';

const particlesOptions={
particles: {
 number: {
  value:90,
  density: {
    enable: true,
    value_area: 800
  }
 }
}

}

const app = new Clarifai.App({
 apiKey: '7294288680b04e88b6ac0f54a76d863c'
});

class App extends Component {
  constructor(){
    super();
    this.state= {
       input:'',
    }
  }
  OnInputChange = (event)=> {
    console.log(event.target.value);
    
  }

  onButtonSubmit = () => {
    console.log('click');
    app.models.predict("a403429f2ddf4b49b307e318f00e528b", "https://samples.clarifai.com/face-det.jpg").then(
    function(response) {
     console.log(response); 
    },
    function(err) {
      // there was an error
    }
  );
  }
  render(){
   return (
    <div className="App">
      <Particles className='particles' 
        params={particlesOptions} 
      />
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm OnInputChange={this.OnInputChange} onButtonSubmit={this.onButtonSubmit}/>
      
    {/*

      <FaceRecognition/>*/}
    </div>
   );
  } 
}

export default App;
