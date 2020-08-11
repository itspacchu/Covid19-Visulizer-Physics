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

world.gravity.scale = 0;



let coviddata;
let covdata = [];
let jsonfile;
let maxdata = 0;
normlizeMultiplier = screen.width/10;

function preload() {
  americanCaptain = loadFont('fonts/ac.ttf');
  VCR = loadFont('fonts/vcr.ttf');
  //let url = 'https://api.covid19api.com/summary'
  //let url = 'https://earthquake.usgs.gov/fdsnws/event/1/application.json'
  /**
 
   
  let url = ' ';
  httpGet(url,'jsonp',false , function(response){
    coviddata = response;
  });
  */
 jsonfile = loadJSON("debugdataset.json");
}

function setup() {
  width = windowWidth;
  height = windowHeight;
  Engine.run(engine);
  
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    normlizeMultiplier = 100;
    console.log("User on Mobile device");
}


  upperbox = Bodies.rectangle(width/2 ,0,width,10, {isStatic : true});
  lowerbox = Bodies.rectangle(width/2 ,height ,width,10, {isStatic : true});
  leftbox = Bodies.rectangle(0 , height/2 ,10,height, {isStatic : true});
  rightbox = Bodies.rectangle(2*height - 25,height/2,10,height, {isStatic : true});
  World.add(world,[upperbox,lowerbox,leftbox,rightbox]);
  createCanvas(width, height);

  for(let i=0;i<jsonfile.Countries.length;i++){
      if(jsonfile.Countries[i].TotalConfirmed > maxdata){
        maxdata = jsonfile.Countries[i].TotalConfirmed;
      }else{
      }
      covdata.push(new covidreqdata(jsonfile.Countries[i].Country,jsonfile.Countries[i].TotalConfirmed));
  }

  sort(covdata)

  databalls = [];
  let maxi = covdata.length;
  //let maxi = 150;
  for(let i=0;i<maxi;i++){
    let normalizedRad = normlizeMultiplier*covdata[i].totalcases/maxdata;
    if(normalizedRad < 5){
      continue;
    }
    console.log("fetching " + covdata[i].country + "index :", + i);
    databalls.push(new dcircle(map(i,0,maxi,maxi,width-maxi),map(i,0,maxi,maxi,height-maxi),normalizedRad,covdata[i].country));
  }
  


}

function draw() {
  // Redrawing again for live window scaling
  width = windowWidth;
  height = windowHeight;

  MouseManip();
  
  background(42);
  
  /** 
  if(!coviddata){
    text('API is Unresponsive?!', width/2 , height/2);
  }
  */
 for(let i=0;i<databalls.length;i++){
  databalls[i].show();
 }




  // Text after Balls
  fill(255);
  textSize(32);
  //textFont(americanCaptain);
  textFont(VCR);
  textAlign(CENTER);
  text('COVID19  Stats', width/2 , 50);
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
