<template>
  <div class="statistic">
      <div class="myScene10"></div>
  </div>
</template>
<script>
import * as d3 from "d3";
import _flattendeep from 'lodash.flattendeep'

export default {
  name: 'about',
  data () {
    return {
        myurl: "https://gist.githubusercontent.com/wowdacom/2b90de1f17a603f35081f27266803f58/raw/98b4020ff29234c445345ad724ef72292e31a2e2/bodyWeight.json",
        rawData: [],
        collectedData: [[],[],[],[],[],[],[]]
    }
  },
  components: {
    
  },
  methods: {
    getMyTable () {
        let vm = this
        return d3.json(vm.myurl).then((data)=>{
          vm.rawData = _flattendeep(data)
        })
    },
    barChart () {
        let vm = this
        d3.select(".myScene10")
            .selectAll("div")
            .data(vm.collectedData)
            .enter()
            .append("div")
            .style("width", (d, i)=>{
                return +d.length * 10 + "px"
            })
            .style("height", "50px")
            .style("border", "solid 1px white")
            .style("background-color", "black")
    }
  },
  created () {

  },
  mounted () {
      let vm  = this
      this.getMyTable().then(()=>{
          let counter = 0
          while (counter < vm.rawData.length) {
              if ( 36 <= vm.rawData[counter] && vm.rawData[counter] <= 40 ) {
                  vm.collectedData[0].push(vm.rawData[counter])
              } else if ( 41 <= vm.rawData[counter] && vm.rawData[counter] <= 45 ) {
                  vm.collectedData[1].push(vm.rawData[counter])
              } else if ( 46 <= vm.rawData[counter] && vm.rawData[counter] <= 50 ) {
                  vm.collectedData[2].push(vm.rawData[counter])
              } else if ( 51 <= vm.rawData[counter] && vm.rawData[counter] <= 55 ) {
                  vm.collectedData[3].push(vm.rawData[counter])
              } else if ( 56 <= vm.rawData[counter] && vm.rawData[counter] <= 60 ) {
                  vm.collectedData[4].push(vm.rawData[counter])
              } else if ( 61 <= vm.rawData[counter] && vm.rawData[counter] <= 65 ) {
                  vm.collectedData[5].push(vm.rawData[counter])
              } else if ( 66 <= vm.rawData[counter] && vm.rawData[counter] <= 70 ) {
                  vm.collectedData[6].push(vm.rawData[counter])
              } else {
                  vm.collectedData[7].push(vm.rawData[counter])
              }
              counter = counter + 1
          }
      }).then(()=>{
          vm.barChart()
      })
      
  }
}
</script>
<style lang="scss" scoped>
    .myScene10 {
        margin: 0 auto;
        border: solid 1px green;
        width: 500px;
        height: 500px;
    }
</style>