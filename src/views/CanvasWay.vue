<template>
  <div class="CanvasWay">
     <div id="p5sketch">
        <!-- p5 instance will be created here -->
    </div>

    <p>Some other HTML</p>
    <p>Some other HTML</p>
    <p>Some other HTML</p>
    <p>Some other HTML</p>
    <p>Some other HTML</p>
    <p>Some other HTML</p>
  </div>
</template>
<script>
import p5 from 'p5'

export default {
  name: 'about',
  data () {
    return {
        pageWidth: 0,
        pageHeight: 0,
        myImg: require('../assets/download.jpg'),
        mouseIsPressed: false,
        totlaBalls: [[10, 20, 40, 15, 20], [20, 15, 20, 15, 20], [40, 10, 35, 10, 15], [10, 10, 45, 5, 20], [15, 20, 5, 25, 20]],
        xdirection: 1, // Left or Right
        ydirection: 1,
        xpos: null,
        ypos: null
    }
  },
  components: {
    
  },
  methods: {
    
  },
  created () {

  },
  mounted () {
      let pageWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      let pageHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
      let vm = this
      let myp5 = new p5(( sketch ) => {

        let x = 100;
        let y = 100;
        let pg = null
        let step = 0 
         // Top to Bottom
        // sketch.preload = () => {
        //     img = loadImage('../assets/logo.png')
        // }

        sketch.setup = () => {
            sketch.createCanvas(pageWidth, pageHeight);
            // pg = sketch.createGraphics(pageWidth / 2, pageHeight / 2 );
        };

        sketch.draw = () => {
            
            for (let i = 0; i < vm.totlaBalls.length; i++) {
                for (let j = 0; j < vm.totlaBalls[0].length; j++) {
                    let rad = vm.totlaBalls[i][j]; // Width of the shape
                    vm.xpos = 50 * i + 50; 
                    vm.ypos = 50*j + 50; // Starting position of shape

                    let xspeed = 2.8; // Speed of the shape
                    let yspeed = 2.2; // Speed of the shape
                    
                    vm.xpos = vm.xpos + xspeed * vm.xdirection;
                    vm.ypos = vm.ypos + yspeed * vm.ydirection;

                    // Test to see if the shape exceeds the boundaries of the screen
                    // If it does, reverse its direction by multiplying by -1
                    if (vm.xpos > pageWidth - rad || vm.xpos < rad) {
                        vm.xdirection *= -1;
                    }
                    if (vm.ypos > pageHeight - rad || vm.ypos < rad) {
                        vm.ydirection *= -1;
                    }

                    sketch.ellipse(vm.xpos, vm.ypos, rad, rad)              
                }
            }
            step++
            // if (sketch.mouseIsPressed) {
            //     sketch.fill(0);
            // } else {
            //     sketch.fill(255);
            // }
            // sketch.ellipse(sketch.mouseX, sketch.mouseY, 80, 80);

            // pg.background(51);
            // pg.noFill();
            // pg.stroke(255);
            // pg.ellipse(sketch.mouseX - 150, sketch.mouseY - 75, 60, 60);

            // sketch.image(pg, 150, 75);
        };
      }, document.getElementById('p5sketch'));
  }
}
</script>
<style lang="scss" scoped>
    .CanvasWay {
 
    }
</style>