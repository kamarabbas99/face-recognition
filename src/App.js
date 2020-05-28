import React, { Component} from 'react';
import Navigation from'./components/Navigation/Navigation';
import './App.css';
import Logo from'./components/Logo/Logo';
import ImageLinkForm from'./components/ImageLinkForm/ImageLinkForm';
import Rank from'./components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from'clarifai';
import FaceRecognition from'./components/FaceRecognition/FaceRecognition';
import Signin from'./components/Signin/Signin';
import Register from'./components/Register/Register';

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
       imageUrl:'',
       box: {},
       route: 'signin',
       isSignedIn: false
    }
  }
  calculateFacelocation = (data) => {
       // console.log(data)
        const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
        
        const image= document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return{
          leftCol: clarifaiFace.left_col*width,
          topRow: clarifaiFace.top_row*height,
           rightCol: width-(clarifaiFace.right_col*width),
          bottomRow: height-(clarifaiFace.bottom_row*height)
        }
  }

  displayFaceBox = (box) => {
   this.setState({box: box})
   console.log(this.state.box);

  }

  OnInputChange = (event)=> {
    this.setState({input: event.target.value});
    
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).
    then(response => this.displayFaceBox(this.calculateFacelocation(response)))
    .catch(err => console.log(err));
  
  
  }
  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }
    else if(route === 'home'  ){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
  render(){
   return (
    <div className="App">
      <Particles className='particles' 
        params={particlesOptions} 
      />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route ==='home'
        ? <div>
        <Logo/>
       <Rank/>
       <ImageLinkForm OnInputChange={this.OnInputChange} onButtonSubmit={this.onButtonSubmit}/>
       <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
       </div>
        : (
        this.state.route ==='signin'
         ?<Signin onRouteChange={this.onRouteChange}/>
         : <Register onRouteChange={this.onRouteChange}/>
        )
      }
    </div>
   );
  } 
}

export default App;
