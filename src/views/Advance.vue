<template>
  <div class="advance">
    <h1>讓我動起來</h1>
    <div class="scence10">
      
    </div>
    <div :style="{ transform: 'translate('+ ballX+'px,' + ballY+ 'px)'}" class="ball">AA</div>
    <div @click="handleBall"  class="controller shuffle-btn">CONTROLLER</div>
    <!-- <div id="list">
      <transition-group name="cell" tag="div" class="container">
        <div class="tile" :label="index + 1 " :key="index" v-for="(item, index) in cells" >
            {{ item.number }}
        </div>
      </transition-group>
    </div>
    <div @click="handleShuffle" class="shuffle-btn">Shuffle It!</div>
    <div @click="handleLeaking" class="shuffle-btn">remove It</div> -->
  </div>
</template>
<script>
import { TimelineMax } from "gsap";
import TWEEN from 'tween.js'
import _shuffle from 'lodash.shuffle'
import EasyStar from 'easystarjs'

export default {
  name: 'about',
  data () {
    let elements = 90
    return {
        removeList: [],
        numTiles: 25,
        isSorted: false,
        ballX: 0,
        ballY: 0,
        currentState: 0,
        stateTrack: [{ x: 0, y: 0 }, { x: 180, y: 0 }, { x: 180, y: 180 }, { x: 0, y: 180 }],
        cells: Array.apply(null, { length: elements })
                      .map(function (_, index) { 
                            return {
                                id: index,
                                number: index + 1
                            }
                        })
    }
  },
  components: {
    
  },
  watch: {
    // ballX (val) {
    //   console.log(val)
    // }
  },
  methods: {
    handleShuffle () {
      this.isSorted = !this.isSorted
      if (this.isSorted) {
        this.cells = _shuffle(this.cells)
      } else {
        this.cells.sort(function (a, b) {
          return a.number - b.number;
        });
      }
    },
    handleLeaking () {
      this.removeList = [ ...this.getRandomArray(0, 90, 10) ]
      let total = this.removeList.length
      while (this.removeList.length > 0) {
        this.cells.splice(this.removeList[0], 1)
        this.removeList.shift()
      }
      // console.log(this.cells)
    },
    getRandomArray (minNum, maxNum, n) {
      var rdmArray = [n];     //儲存產生的陣列

      for(var i=0; i<n; i++) {
          var rdm = 0;        //暫存的亂數

          do {
              var exist = false;          //此亂數是否已存在
              rdm = this.getRandom(minNum, maxNum);    //取得亂數
              
              //檢查亂數是否存在於陣列中，若存在則繼續回圈
              if(rdmArray.indexOf(rdm) != -1) exist = true;
              
          } while (exist);    //產生沒出現過的亂數時離開迴圈
          
          rdmArray[i] = rdm;
      }
      return rdmArray;
    },
    getRandom(minNum, maxNum) { //取得 minNum(最小值) ~ maxNum(最大值) 之間的亂數
        return Math.floor( Math.random() * (maxNum - minNum + 1) ) + minNum;
    },
    animate(time) {
      let vm = this
        requestAnimationFrame(vm.animate);
        TWEEN.update(time);
    },
    handleBall () {

      let vm = this
      let position = this.stateTrack[vm.currentState]
      let tween = new TWEEN.Tween(position)
                        .to(vm.stateTrack[vm.currentState + 1], 1000)
                        .onUpdate(function() {
                            if (vm.currentState == 0 || vm.currentState == 2) {
                              vm.ballX = Math.cos(this.x*Math.PI/180) * 50
                              vm.ballY = this.x * 2
                            } else {
                              vm.ballX = this.y * 2
                              vm.ballY = Math.cos(this.y*Math.PI/180) * 50
                            }
                            
                        })
                        .start()
                        .onComplete(function(){
                          if (vm.currentState + 1 < vm.stateTrack.length) {
                            vm.currentState = vm.currentState + 1
                          } else {
                             vm.currentState = 0
                          }
                        })
      this.animate();
      
    },
    handleGrid () {
      let grid = [[0,0,1,0,0],
                  [0,0,1,0,0],
                  [0,0,1,0,0],
                  [0,0,1,0,0],
                  [0,0,0,0,0]];

      let gridnew = [[0,0,0,0,0],
                 [0,0,0,0,0],
                 [0,0,0,0,0],
                 [0,0,0,0,0],
                 [0,0,0,0,0]];

      let easystar = new EasyStar.js();
      easystar.setGrid(grid);
      easystar.setAcceptableTiles([0])
      easystar.findPath(0, 0, 4, 2, function( path ) {
        if (path === null) {
          console.log("Path was not found.");
        } else {
          for (var i = 0; i < path.length; i++)
              {
                gridnew[path[i].y][path[i].x] = 1
                // console.log("P: " + i + 
                //             ", X: " + path[i].x + 
                //             ",Y: " + path[i].y);
              }
          console.log(gridnew)
        }
      });
      easystar.setIterationsPerCalculation(1000);
      easystar.calculate();
    }
    ,
    updatePosition () {

    }
  },
  created () {

  },
  mounted () {
      // console.log(this.cells)
      this.handleGrid()
  }
}
</script>
<style lang="scss" scoped>
  .advance {
    position: relative;
    #list {
        margin : 50px auto;
        // background-color: rgba(0, 0, 0, 0.2);
        width: 50%;
        // width: 90%;
        // width: 0;
        position: relative;
        display: block;
    }
    .scence10 {
      width: 1000px;
      height: 1000px;
    }
    .ball {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: yellow;
      border: solid 1px black;
      left: 50%;
      top: 50%;
    }
    .tile {
        display: inline-block;
        background-color: yellowgreen;
        color: #3A3A4D;
        padding: 5px;
        font-weight: bold;
        margin: 5px;
        border-radius: 50%;
    }
    .shuffle-btn {
      border: solid 1px yellowgreen;
      border-radius: 5px;
      width: 150px;
      line-height: 50px;
      margin: 0 auto;
      cursor: pointer;
    }
    .cell-move {
      animation: move_wave 1s ease-in-out forwards;
      // transition: transform 1s;
    }
    @keyframes move_wave {
      50% {
        transform: translate3D(100px, -100px, 0);
      }
    }
  }
</style>