elements.adaptive_mob = {
    color: "#33ffaa",
    behavior: behaviors.POWDER,
    category: "life",
    state: "solid",

    tick: function(pixel) {

        // khởi tạo neuron
        if(pixel.weight === undefined){
            pixel.weight = Math.random()*2-1;
        }

        if(pixel.memory === undefined){
            pixel.memory = 0;
        }

        // cảm biến môi trường
        let stimulus = 0;

        if (!isEmpty(pixel.x+1,pixel.y,true)) stimulus += 1;
        if (!isEmpty(pixel.x-1,pixel.y,true)) stimulus -= 1;

        // neuron activation
        let output = stimulus * pixel.weight + pixel.memory;

        // hành động
        if(output > 0){
            tryMove(pixel,pixel.x+1,pixel.y);
        } else {
            tryMove(pixel,pixel.x-1,pixel.y);
        }

        // learning rule (thích nghi)
        if(pixel.temp > 100){ // gặp lửa
            pixel.weight -= 0.05;
        }

        if(pixel.temp < 20){ // môi trường tốt
            pixel.weight += 0.01;
        }

        // memory decay
        pixel.memory *= 0.9;
    }
};
