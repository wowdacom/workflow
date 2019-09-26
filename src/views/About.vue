<template>
  <div class="about">
    <div class="contorl" @click="handleAni">
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
    </div>
    
  </div>
</template>
<script>
import { TimelineMax } from "gsap";

export default {
  name: 'about',
  data () {
    return {
      isPlay: false
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
  }
</style>