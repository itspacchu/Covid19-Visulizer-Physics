function dcircle(x,y,r,txt,colval=color(255,125,125)){
    this.body = Bodies.circle(x,y,r);
    World.add(world,this.body);

    this.show = function(){
        let pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        fill(colval);
        ellipse(0,0,r*2);
        fill(255)
        
        textAlign(CENTER);
        if(r > 300){
            textSize(2*r/txt.length);
            text(txt, 0 , r/txt.length);
        }else{
            textSize(2*r/txt.length);
            text(txt, 0 , r/txt.length);
        }
        
        pop();
    }
}

function covidreqdata(country,totalcases){
    this.country = country;
    this.totalcases = totalcases;
}