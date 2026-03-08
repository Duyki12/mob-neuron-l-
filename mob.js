elements.neuron_mob = {
    color: "#33ffaa",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
    density: 900,

    tick: function(pixel) {

        if(pixel.weight === undefined){
            pixel.weight = Math.random()*2-1;
        }

        if(pixel.memory === undefined){
            pixel.memory = 0;
        }

        let stimulus = 0;

        if (!isEmpty(pixel.x+1,pixel.y,true)) stimulus += 1;
        if (!isEmpty(pixel.x-1,pixel.y,true)) stimulus -= 1;

        let output = stimulus * pixel.weight + pixel.memory;

        if(output > 0){
            tryMove(pixel,pixel.x+1,pixel.y);
        } else {
            tryMove(pixel,pixel.x-1,pixel.y);
        }

        if(Math.random() < 0.05){
            tryMove(pixel,pixel.x,pixel.y-1);
        }

        if(pixel.temp > 80){
            pixel.weight -= 0.02;
        }

        if(pixel.temp < 20){
            pixel.weight += 0.01;
        }

        pixel.memory *= 0.9;
    }
};
