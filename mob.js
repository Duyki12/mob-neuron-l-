// Neuron element mod for Sandboxels

if (!elements.neuron) {

elements.neuron = {
    color: "#ff66cc",
    category: "machines",
    state: "solid",
    density: 2000,
    conduct: 1,

    tick: function(pixel) {

        if (pixel.charge) {

            var dirs = [
                [1,0],[-1,0],[0,1],[0,-1]
            ];

            for (var i = 0; i < dirs.length; i++) {

                var x = pixel.x + dirs[i][0];
                var y = pixel.y + dirs[i][1];

                if (!isEmpty(x,y,true)) {

                    var p = pixelMap[x][y];

                    if (elements[p.element].conduct) {
                        p.charge = 1;
                    }

                }

            }

        }

    }
};

}
