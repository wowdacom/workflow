<template>
  <div class="statistic">
   
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
          console.log(vm.collectedData)
      })
      
  }
}
</script>
<style lang="scss" scoped>

</style>