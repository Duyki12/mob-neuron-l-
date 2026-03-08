elements.neuron = {
    color: "#ff66cc",
    category: "machines",
    state: "solid",
    conduct: 1,

    tick: function(pixel) {

        if (pixel.charge) {

            let neighbors = [
                [1,0],[-1,0],[0,1],[0,-1]
            ];

            neighbors.forEach(d => {

                let x = pixel.x + d[0];
                let y = pixel.y + d[1];

                if (!isEmpty(x,y,true)) {

                    let p = pixelMap[x][y];

                    if (p.element === "neuron") {
                        p.charge = 1;
                    }

                }

            });

        }

    }
};
