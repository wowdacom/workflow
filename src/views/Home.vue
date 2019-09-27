<template>
  <div class="home">
    <Share href="http://nmdap.udn.com.tw/test/workflow/"></Share>
    <div class="scene">
      <div id="chart"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Share from '@/components/Share.vue'
import * as d3 from "d3";
import myCSV from "@/assets/example.csv"

export default {
  name: 'home',
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      source: null
    }
  },
  components: {
    HelloWorld,
    Share
  },
  methods: {
    fetchData(){
      let vm = this
      axios.get(this.baseUrl + 'example.csv').then(response => {
          d3.csv(response.data, function(d){
            console.log(d)
          })
          // console.log(response.data);
      })
    },
    init () {
      var w = 300;   
      var h = 300;   
      //資料   
      var dataset = [ ];   
      
      myCSV.forEach((data)=>{
        dataset.push(data.cars)
      })

      var outerRadius = w / 2;   
      //如果大於0就會是甜甜圈   
      var innerRadius = w / 4;   

      var arc = d3.arc()   
                    .innerRadius(innerRadius)   
                    .outerRadius(outerRadius);  
                    
      var labelArc = d3.arc()
                    .outerRadius(outerRadius + 20)
                    .innerRadius(outerRadius - 80);
          
      var pie = d3.pie();   
          
      //Easy colors accessible via a 10-step ordinal scale   
      var color = [ ...d3.schemePaired ];

      //Create SVG element   
      var svg = d3.select("#chart")   
                  .append("svg")   
                  .attr("width", w)   
                  .attr("height", h);   
          
      //Set up groups   
      var arcs = svg.selectAll("g.arc")   
                    .data(pie(dataset))   
                    .enter()   
                    .append("g")   
                    .attr("class", "arc")   
                    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

      let el1 = arcs.append("path")
                .transition()
                .attr("fill", function(d, i) {   
                    return "white" 
                })
                .transition()
                .duration(5000)
                .attr("fill", function(d, i) {   
                    return color[i % color.length];   
                })   
                .attr("d", arc);

      let el2 = arcs.append("text")
        .attr("transform", function(d) {   
            var midAngle = d.endAngle < Math.PI ? d.startAngle/2 + d.endAngle/2 : d.startAngle/2  + d.endAngle/2 + Math.PI ;
            return "translate(" + labelArc.centroid(d)[0] + "," + labelArc.centroid(d)[1] + ") rotate(-90) rotate(" + (midAngle * 180/Math.PI) + ")"; })
        .attr("dy", ".35em")  
        .attr("text-anchor", "middle")   
        .text(function(d) {
            return d.value;   
        })

      this.revealElemnet(el1, 0)
      this.revealElemnet(el2, 5000)
    },
    revealElemnet (el, dalay) {
      el.style("opacity", 0)
        .transition()
        .delay(dalay)
        .duration(1000)
        .style("opacity", 1)
    }
  },
  mounted () {
    //Width and height   

            
               
            this.init()
            //Draw arc paths   
             
               
            //Labels   
            

  }
}
</script>
<style lang="scss" scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .scene {
      width: 500px;
      // border: solid 1px greenyellow;
      .line {
        fill: none;
        stroke: black;
        stroke-width: 1.2px;
      }
      .arc {
        
      }

      div#chart {width: 100%;}
    }
  }
</style>
