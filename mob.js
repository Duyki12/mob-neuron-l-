runAfterLoad(function() {

elements.neuron_mob = {
    color: "#33ffaa",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",
    density: 900,

    tick: function(pixel) {

        // khởi tạo neuron
        if(pixel.weight === undefined){
            pixel.weight = Math.random()*2-1;
        }

        if(pixel.memory === undefined){
            pixel.memory = 0;
        }

        // cảm biến môi trường
        let leftBlocked = !isEmpty(pixel.x-1,pixel.y,true);
        let rightBlocked = !isEmpty(pixel.x+1,pixel.y,true);

        let stimulus = 0;

        if(leftBlocked) stimulus -= 1;
        if(rightBlocked) stimulus += 1;

        // neuron activation
        let output = stimulus * pixel.weight + pixel.memory;

        // hành động
        if(output > 0){
            tryMove(pixel,pixel.x+1,pixel.y);
        } else {
            tryMove(pixel,pixel.x-1,pixel.y);
        }

        // nhảy ngẫu nhiên
        if(Math.random() < 0.05){
            tryMove(pixel,pixel.x,pixel.y-1);
        }

        // thích nghi môi trường
        if(pixel.temp > 80){ 
            pixel.weight -= 0.02;
        }

        if(pixel.temp < 20){ 
            pixel.weight += 0.01;
        }

        // memory decay
        pixel.memory *= 0.9;

    }
};

});
