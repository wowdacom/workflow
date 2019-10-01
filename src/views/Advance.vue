<template>
  <div class="advance">
    <h1>Hello Advance</h1>
    <div id="list">
        <div class="tile" :label="index + 1 " :key="index" v-for="(item, index) in cells" >
            {{ item.number }}
        </div>
    </div>
  </div>
</template>
<script>
import { TimelineMax } from "gsap";

export default {
  name: 'about',
  data () {
    let elements = 90
    return {
        numTiles: 25,
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
  methods: {
    shuffle: function () {
    	this.cells = _.shuffle(this.cells)
    }
  },
  created () {

  },
  mounted () {
      console.log(this.cells)
  }
}
</script>
<style lang="scss" scoped>
  .advance {
    #list {
        // background-color: rgba(0, 0, 0, 0.2);
        width: 250px;
        // width: 90%;
        // width: 0;
        position: relative;
        display: block;
        margin-top: 50px;
    }

    .tile {
        display: inline-block;
        background-color: yellowgreen;
        color: #3A3A4D;
        padding: 5px;
        font-weight: bold;
        margin: 5px;
    }
  }
</style>