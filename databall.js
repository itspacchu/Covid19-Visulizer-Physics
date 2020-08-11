function dcircle(x,y,r,txt,indexval=0){
    this.body = Bodies.circle(x,y,r);
    World.add(world,this.body);
    var m1 = color(255,125,125);
    var m2 = color(125,255,125);

    this.show = function(){
        let pos = this.body.position;
        push();
        translate(pos.x, pos.y);
        c = map(indexval,0,184,125,255);
        cd = map(indexval,0,184,255,125);
        fill(color(cd,c,125));
        ellipse(0,0,r*2);
        fill(42)
        
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