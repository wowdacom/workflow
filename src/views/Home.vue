<template>
  <div class="home">
    <h1>跟著D3官網做起來</h1>
    <!-- <div class="myScence">
      <p>裡面的數字可以當預設</p>
      <p>1</p>
      <p>2</p>
      <p>3</p>
      <p>4</p>
      <p>5</p> 
    </div> -->
    <div class="myScence2">

    </div>
    <div class="myScence3">
      <div class="bars"></div>
      <div class="rule"></div>
    </div>
    <div class="myScence4">
      <svg class="myChart"></svg>
    </div>
    <div class="myScence5">
      <svg class="myChart2"></svg>
    </div>
    <!-- <Share href="http://nmdap.udn.com.tw/test/workflow/"></Share>
    <div class="scene">
      <div id="chart"></div>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Share from '@/components/Share.vue'
import * as d3 from "d3";
import myCSV from "@/assets/example.csv"
import myData from "@/assets/myData.csv"

export default {
  name: 'home',
  data () {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      source: null,
      box: null,
      jsonurl: "https://gist.githubusercontent.com/wowdacom/b22c4cd6a70e791ff9a62e06b5f77034/raw/83382070b4b9cd9bdb6dcaf76c147245298a0271/gistfile1.json",
      myChartData: [{name:'Alex', score: 30}, {name:'Peter', score: 10},{name:'Alan', score: 40},{name:'Jim', score: 10},{name:'Brian', score: 50},{name:'Freddy', score: 90},{name:'Allen', score: 45}]
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
    },
    handelEnter (elements, tag) {
      return elements.enter().append(tag)
    },
    handelExit (elements) {
      elements.exit().remove();
    },
    handleChart () {
      let vm = this

      d3.select(".rule")
          .selectAll("div")
          .data([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
          .enter()
          .append("div")
          .style("position", "absolute")
          .style("top", "0")
          .style("left", (d, i)=>{
            return d + "%"
          })
          .style("transform", "translateX(-100%)")
          .style("width", "3px")
          .style("height", "10px")
          .style("background-color", "black")
          .attr("class", "scale")
          .append("p")
          .style("position", "absolute")
          .style("top", "0")
          .style("left", "-10px")
          .text((d, i)=>{
            return d
          })
        

      d3.select(".bars")
        .selectAll("div")
        .data(vm.myChartData)
        .enter()
        .append("div")
      
      d3.select(".bars")
        .style("display", "flex")
        .style("flex-flow", "column")
        .style("justify-content", "space-around")
        .selectAll("div")
        .attr("class", "bar")
        .text((d, i)=>{
          return d.score
        })
        .style("text-align", "right")
        .style("line-height", "50px")
        .style("padding", "0 10px")
        .style("color", "white")
        .style("border", (d, i)=>{
          return "solid 1px #" + (parseInt("EBB", 16) + d.score).toString(16);
        })
        .style("background-color", (d, i)=>{
          let color = 100
          return d3.schemePaired[i]
        })
        .style("width", (d, i)=>{
          return d.score + "%"
        })

      d3.selectAll(".bar")
        .style("position", "relative")
        .append("div")
        .text((d, i)=>{
          return vm.myChartData[i].name
        })
        .style("position", "absolute")
        .style("color", "black")
        .style("left", "0")
        .style("top", "0")
        .style("transform", "translateX(-130%)")
        
    },
    handleBubbles () {
      this.box = d3.select(".myScence").style('background-color', "red")
      let element1 = d3.select(".myScence")
                      .selectAll("p")
                      .data([1, 2, 3, 5, 8, 13, 21])

      let element2 = d3.select(".myScence2")
                       .selectAll("div")
                       .data([10, 15, 20, 15, 10, 5, 15, 25])

      this.handelEnter(element1, "p")
        .text(function(d) { return d })
      

      this.handelEnter(element2, "div")
        .text(function(d) { return d })

      d3.select(".myScence")
        .selectAll("p")
        .style("margin", "0px")
        .style("background-color", (d, i) => {
          return "#" + (parseInt("eee", 16) + d).toString(16);
        })
        .style("font-size", (d, i) => {
          return d*5 + "px"
        })

      d3.select(".myScence2")
        .selectAll("div")
        .style("margin", "10px")
        .style("display", "inline-block")
        .style("width", (d, i) => {
          return d*5 + "px";
        })
        .style("line-height", (d, i) => {
          return d*5 + "px";
        })
        .style("border", (d, i) => {
          return "solid 1px" + "#" + (parseInt("BE5", 16) + d).toString(16);
        })
        .style("border-radius", "50%")
        .transition(750)
        .delay((d, i) => {
          return d * 100
        })
        .style("background-color", (d, i) => {
          return "#" + (parseInt("BE5", 16) + d).toString(16);
        })
    },
    handleChartSVG () {
      let vm  = this
      let h = 50

      d3.json(vm.jsonurl).then((data)=>{

        let bars = d3.select(".myChart")
            .attr("width", "50%")
            .attr("height", h * data.length)
            .selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("class", "bar-4")
            .attr("transform", (d, i)=>{
              return "translate(0," + i * h + ")"
            })

        let x = d3.scaleLinear()
                  .domain([0, d3.max(data.map((d, i)=>{
                    return d.value
                  }))])
                  .range([0, 500]);

        bars.append("rect")
          .attr("width", (d)=>{
            return d.value * 5;
          })
          .attr("height", h  - 1)
          .attr("fill", (d, i)=>{
            return "#" + (parseInt("EBB", 16) + d.value).toString(16);
          })

        bars.append("text")
            .attr("x", (d)=>{
              return d.value * 5 - 30;
            })
            .attr("y", h / 2)
            .attr("dy", ".35em")
            .attr("fill", "white")
            .text(function(d) { return d.value; });

        bars.append("text")
            .attr("x", (d)=>{
              return d.value * 5 + 10;
            })
            .attr("y", h / 2)
            .attr("dy", ".35em")
            .attr("fill", "green")
            .text(function(d) { return d.name; });

      })
     
    },
    handleChartSVGColumns () {

      let vm  = this
      let w = 500
      let h = 500



      // .rangeRoundBands 
      let x = d3.scaleBand()
                 .rangeRound([0, w], .1);

      let y = d3.scaleLinear()
                  .range([0, h]);

      let xAxis = d3.axisBottom(x);
              
      let myChart = d3.select(".myChart2")
        .attr("width", w)
        .attr("height", h)

      //會用domain 對應 range 是因為要讓最長的那隻剛好撐滿整個圖表
      d3.json(vm.jsonurl).then((data)=>{

        y.domain([0, d3.max(data, (d)=>{
          return d.value
        })])

        var barWidth = w / data.length;

        var bar = myChart.selectAll("g")
                    .data(data)
                    .enter().append("g")
                    .attr("transform", (d, i)=> { return "translate(" + i * barWidth  + ",0)" } )
                    .call(xAxis);

            bar.append("rect")
                  .on("mouseenter", vm.handleMouseOver)
                  .on("mouseover", vm.handleMouseOver)
                  .attr("id", (d, i)=>{
                    return "bar-" + i
                  })
                  .attr("y", (d)=>{
                    return h - y(d.value)
                  })
                  .attr("height", (d)=>{
                    return y(d.value)
                  })
                  .attr("width", barWidth - 1)
                  .attr("fill", (d, i)=>{
                    return d3.schemeSet3[i]
                  })
                  .attr("class", "bar")
                  
            bar.append("text")
                  .attr("x", barWidth / 2 - 8)
                  .attr("y", (d)=>{
                    return h - y(d.value) + 25;
                  })
                  .attr("fill", "black")
                  .attr("d", ".75em")
                  .text((d)=>{
                    return d.value
                  })

      })
    },
    handleMouseOver(state) {  // Add interactivity
      console.log(d3.event)
      
      if (d3.event.type === "mouseenter") {
        d3.select('#' + d3.event.target.id)
        .attr("fill", "orange");
      }
      if (d3.event.type === "mouseover") {
        
      }
      // Use D3 to select element, change color and size
      

    }
  },
  mounted () {
    this.handleBubbles()
    this.handleChart()
    this.handleChartSVG()
    this.handleChartSVGColumns()

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
    flex-flow: column;
    .myScence {
      margin: 0 auto;
      width: 500px;
      border: solid 1px yellowgreen;
    }
    .myScence2 {
      margin: 0 auto;
      width: 400px;
      // border: solid 1px blueviolet;
      margin: 50px;
    }
    .myScence3 {
      margin: 0 auto;
      width: 50%;
      margin: 50px;
      position: relative;
      .bars {
        width: 100%;
      }
      .rule {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: black;
      }
    }
    .myScence4 {
      width: 100%;
      margin: 100px;
      .myChart {
        border: solid 1px goldenrod;
        .bar-4 {
          rect {
            fill: steelblue;
          }
          text {
            fill: white;
            font: 10px sans-serif;
            text-anchor: end;
          }
        }
        
      }
    }
    
    .myScence5 {
      border: solid 1px paleturquoise;
    }

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
