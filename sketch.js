var Engine = Matter.Engine,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

var engine = Engine.create(),
        world = engine.world;

world.gravity.scale = 0.0001;




let coviddata;
let covdata = [];
let jsonfile;
let maxdata = 0;
normlizeMultiplier = window.innerWidth/5;



function preload() {
  americanCaptain = loadFont('fonts/ac.ttf');
  VCR = loadFont('fonts/vcr.ttf');
  um = loadFont('fonts/um.ttf');
  let url = 'https://api.covid19api.com/summary'
  httpGet(url,'jsonp',false , function(response){
    coviddata = response;
  });

  if(coviddata){
    jsonfile = coviddata;
  }else{
    jsonfile = loadJSON("debugdataset.json");
  }
 
}

function setup() {
  width = window.innerWidth;
  height = windowHeight;
  thecanvas = createCanvas(width, height);
  thecanvas.position(0,0);
  thecanvas.style('z-index','-1');

  Engine.run(engine);
  
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    normlizeMultiplier = 100;
    console.log("User on Mobile device");
}


  upperbox = Bodies.rectangle(width/2 ,0,width,10, {isStatic : true});
  lowerbox = Bodies.rectangle(width/2 ,height ,width,10, {isStatic : true});
  leftbox = Bodies.rectangle(0 , height/2 ,10,height, {isStatic : true});
  rightbox = Bodies.rectangle(width ,height/2,10,height, {isStatic : true});
  World.add(world,[upperbox,lowerbox,leftbox,rightbox]);
  

  for(let i=0;i<jsonfile.Countries.length;i++){
      if(jsonfile.Countries[i].TotalConfirmed > maxdata){
        maxdata = jsonfile.Countries[i].TotalConfirmed;
      }else{
      }
      covdata.push(new covidreqdata(jsonfile.Countries[i].Country,jsonfile.Countries[i].TotalConfirmed));
  }


  databalls = [];
  let maxi = covdata.length;
  //let maxi = 150;
  for(let i=0;i<maxi;i++){
    let normalizedRad = normlizeMultiplier*covdata[i].totalcases/maxdata;
    if(normalizedRad < 1){
      continue;
    }
    console.log("fetching " + covdata[i].country + "index :", + i);
    databalls.push(new dcircle(map(i,0,maxi,maxi,width-maxi),map(i,0,maxi,maxi,height-maxi),normalizedRad,covdata[i].country,i));
  }
  


}

function draw() {

  // Redrawing again for live window scaling
  width = windowWidth;
  height = windowHeight;

  MouseManip();
  
  background(42);
  noStroke();

 for(let i=0;i<databalls.length;i++){
  databalls[i].show();
 }



  world.gravity.x = (sin(frameCount/100) + sin(frameCount/1000) + sin(frameCount/500))/10;
  world.gravity.y = 0.01*(cos(frameCount/100) + cos(frameCount/400)  + cos(frameCount/1000) )   ;
  //textFont(americanCaptain);
  textFont(um);
  fill(255);
  textSize(12);
    if(!coviddata){
      text('API Unresponsive - using debugdataset.json', 10 , height - 25);
      text('This data is collected on 11:AUG:2020', 10 , height - 10);

  }


}


function MouseManip(){
  var mouse = Mouse.create(document.body),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2
            }
        });
        World.add(world, mouseConstraint);
}

function windowResized(){
  
  width = window.innerWidth;
  height = windowHeight;
  normlizeMultiplier = width/5;
  thecanvas = createCanvas(width, height);
  thecanvas.position(0,0);
  thecanvas.style('z-index','-1');
  World.remove(world,[upperbox,lowerbox,leftbox,rightbox])
  upperbox = Bodies.rectangle(width/2 ,0,width,10, {isStatic : true});
  lowerbox = Bodies.rectangle(width/2 ,height ,width,10, {isStatic : true});
  leftbox = Bodies.rectangle(0 , height/2 ,10,height, {isStatic : true});
  rightbox = Bodies.rectangle(width ,height/2,10,height, {isStatic : true});
  World.add(world,[upperbox,lowerbox,leftbox,rightbox]);
}