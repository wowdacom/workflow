<template>
  <div class="about">
    <!-- <div class="contorl" @click="handleAni">
      PLAY
    </div>
    <div class="icon icon1">
      <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 294.843 294.843" style="enable-background:new 0 0 294.843 294.843;" xml:space="preserve">
        <g>
          <path d="M147.421,0C66.133,0,0,66.133,0,147.421c0,40.968,17.259,80.425,47.351,108.255c2.433,2.25,6.229,2.101,8.479-0.331
            c2.25-2.434,2.102-6.229-0.332-8.479C27.854,221.3,12,185.054,12,147.421C12,72.75,72.75,12,147.421,12
            s135.421,60.75,135.421,135.421s-60.75,135.421-135.421,135.421c-3.313,0-6,2.687-6,6s2.687,6,6,6
            c81.289,0,147.421-66.133,147.421-147.421S228.71,0,147.421,0z"/>
          <path class="line top" d="M84.185,90.185h126.473c3.313,0,6-2.687,6-6s-2.687-6-6-6H84.185c-3.313,0-6,2.687-6,6S80.872,90.185,84.185,90.185z"/>
          <path class="line middle" d="M84.185,153.421h126.473c3.313,0,6-2.687,6-6s-2.687-6-6-6H84.185c-3.313,0-6,2.687-6,6S80.872,153.421,84.185,153.421z"/>
          <path class="line bottom" d="M216.658,210.658c0-3.313-2.687-6-6-6H84.185c-3.313,0-6,2.687-6,6s2.687,6,6,6h126.473
            C213.971,216.658,216.658,213.971,216.658,210.658z"/>
        </g>
      </svg>
    </div> -->
    <div class="square">
      <div class="people">
        <div class="person" :class="[ item ? 'reveal' : 'unreveal' ]" :key="index" v-for="(item, index) in currentPeople">

        </div>
      </div>
    </div>
    <div @click="burnIt" class="burn"><div class="inner">BURN IT!</div></div>
  </div>
</template>
<script>
import { TimelineMax } from "gsap";

export default {
  name: 'about',
  data () {
    return {
      isPlay: false,
      currentPeople: null,
      lack: [],
      isWither: false
    }
  },
  components: {
    
  },
  methods: {
    fetchData(){

    },
    init () {
    
    },
    fadeOut (element, horizontal = 0, vertical = 0 ) {
      let tl = new TimelineMax();
      tl
      .from(element, 1, { x: 0, y: 0 })
      .to(element, 1, { x: horizontal, y: vertical })
      return tl
    },
    getRandomArray (minNum, maxNum, n) {    //隨機產生不重覆的n個數字
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
        return rdmArray.sort(function(a, b){return a-b});
    },
    getRandom(minNum, maxNum) { //取得 minNum(最小值) ~ maxNum(最大值) 之間的亂數
        return Math.floor( Math.random() * (maxNum - minNum + 1) ) + minNum;
    },
    burnIt() {
      let tl = new TimelineMax();
      let animation = tl.staggerFromTo(".unreveal", 1, {
        scale: 1,
        y: 0,
        ease: Power1.easeInOut,
        stagger: {
          grid: [15,7],
          from: "center",
          amount: 2
        }
      }, {
        scale: function () {
          return Math.random()
        },
        y: 40,
        ease: Power1.easeInOut,
        stagger: {
          grid: [15,7],
          from: "center",
          amount: 2
        }
      });

      if (this.isWither) {
        animation.reversed()
      } else {
        animation.play()
      }
      this.isWither = !this.isWither
    },
    handleAni () {
      let master = new TimelineMax();
      let element1 = document.querySelector(".top")
      let element2 = document.querySelector(".middle")
      let element3 = document.querySelector(".bottom")
      
      let animation = master.add(this.fadeOut(element1, 0, -100))
        .add(this.fadeOut(element3, 0, 100))
        .add(this.fadeOut(element2, -100, 0))

      this.isPlayed = !this.isPlayed
      if (this.isPlayed) {
         animation.play();
      } else {
         animation.reverse(0);
      }
      // animation.reversed( !animation.reversed() );
    }
  },
  created () {
    this.currentPeople = Array(200).fill(false);
    this.lack = [ ...this.getRandomArray(0, 200, 40) ]
    this.lack.forEach((item)=>{
      this.currentPeople[item] = true
    })
  },
  mounted () {

    

    

  }
}
</script>
<style lang="scss" scoped>
  .about {
    .contorl {
      border-radius: 5px;
      border: solid 1px goldenrod;
      width: 100px;
      line-height: 50px;
      cursor: pointer;
    }
    .icon {
      margin: 100px auto;
      width: 100px;
    }
    .people {
      margin: 0 auto;
      .person {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: solid 1px goldenrod;
        background-color: yellow;
        margin: 10px;
        display: inline-block;

      }
    }
    .burn {
      margin: 50px auto;
      width: 100px;
      height: 50px;
      border-radius: 5px;
      background-color: black;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 32.5px 6px;
      cursor: pointer;
      .inner {
        width: 95%;
        line-height: 45px;
        border-radius: inherit;
        border: solid 2px white;
      }
    }
  }
</style>