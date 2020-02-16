const express = require('express');
const app = express();
const port = 3000;
const socket = require('socket.io')
var five = require("johnny-five");


const server = app.listen(port,function(){
  console.log(`listening to requests con port ${port} !`)
})

app.use(express.static('public'));

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}


//socket setup
const io = socket(server);
let x= 0.1;
 
const board = new five.Board({
    port: "COM5",
    repl: false
  });

board.on("ready", function() {
  const led = new five.Led(13);
  //led.blink(1000);
  //var sensor = new five.Sensor("A1");

  io.on('connection',function(socket){
   // console.log('made socket connection',socket.id) 
    
    socket.on('blink',function(data){
      //console.log(data);
      //led.brightness(data.pwm);
      led.blink(500);
    });

    socket.on('on',function(data){
      //console.log(data.pwm);
      led.stop();
      led.brightness(Number(data.pwm));
    });

    socket.on('off',function(data){
      led.stop();
      led.off();
    });
    setInterval(function() {
      socket.emit('Test',{
        sample : Math.random()*10
      });
    }, 100);
    
  });

});