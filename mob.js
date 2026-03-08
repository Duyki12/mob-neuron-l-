// ======================
// NEURON CELL
// ======================

elements.neuron = {
    color: "#00ff88",

    behavior: [
        "XX|XX|XX",
        "XX|XX|XX",
        "XX|XX|XX"
    ],

    category: "life",
    state: "solid",
    density: 1200,

    properties: {
        charge: 0,
        threshold: 5,
        cooldown: 0
    },

    tick: function(pixel) {

        // giảm cooldown
        if(pixel.cooldown > 0){
            pixel.cooldown--;
        }

        // nhận tín hiệu từ xung quanh
        let dirs = [
            [1,0],[-1,0],[0,1],[0,-1]
        ];

        for(let i=0;i<dirs.length;i++){

            let x = pixel.x + dirs[i][0];
            let y = pixel.y + dirs[i][1];

            if(!isEmpty(x,y,true)){

                let other = pixelMap[x][y];

                if(other.element == "neuron_spike"){
                    pixel.charge += 1;
                }

            }
        }

        // đạt ngưỡng → phát xung
        if(pixel.charge >= pixel.threshold && pixel.cooldown == 0){

            pixel.cooldown = 20;
            pixel.charge = 0;

            // tạo spike xung quanh
            for(let i=0;i<dirs.length;i++){

                let x = pixel.x + dirs[i][0];
                let y = pixel.y + dirs[i][1];

                if(isEmpty(x,y)){
                    createPixel("neuron_spike",x,y);
                }

            }

        }

    }

};



// ======================
// NEURON SPIKE
// ======================

elements.neuron_spike = {

    color:"#ffff00",

    behavior:[
    "XX|XX|XX",
    "XX|DL|XX",
    "XX|XX|XX"
    ],

    category:"energy",
    state:"gas",
    density:1,

    tick:function(pixel){

        // lan truyền
        if(Math.random() < 0.3){

            let dirs = [
                [1,0],[-1,0],[0,1],[0,-1]
            ];

            let d = dirs[Math.floor(Math.random()*dirs.length)];

            tryMove(pixel,pixel.x+d[0],pixel.y+d[1]);

        }

    }

};
