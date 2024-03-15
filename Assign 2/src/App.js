// App.js
import React from 'react';
import Card from './Components/Card';
import './App.css';



const App = () => {
  return (
   
    <div className="app">
      <Card
        title="Yellow Macaw"
       imageUrl="https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        buttonText="Show More"
      />
       <Card
        title="Perched Kingfisher"
       imageUrl="https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        buttonText="Show More"
      />
       <Card
        title="Parakeet"
       imageUrl="https://images.pexels.com/photos/1059823/pexels-photo-1059823.jpeg?auto=compress&cs=tinysrgb&w=800"
        buttonText="Show More"
      />
       <Card
        title="Humming Bird"
       imageUrl="https://media.istockphoto.com/id/1368240023/photo/hummingbird-in-flight.jpg?s=1024x1024&w=is&k=20&c=4pLw2_bhPmUSyRiA4YYRPsA8skkGTkYzBJ2F2lYuEPg="
        buttonText="Show More"
      />
      <Card
        title="Orange Bird"
       imageUrl="
       https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        buttonText="Show More"
      />
       <Card
        title="Blue Bird"
       imageUrl="https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        buttonText="Show More"
      />
       <Card
        title="Peacock"
       imageUrl="https://images.pexels.com/photos/54108/peacock-bird-spring-animal-54108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        buttonText="Show More"
      />
       <Card
        title="Eagle"
       imageUrl="https://images.pexels.com/photos/36846/bald-eagle-adler-bird-of-prey-raptor.jpg"
        buttonText="Show More"
      />
      
     
    </div>
  ); 
}


export default App;



