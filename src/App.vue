<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">D3.js Terms</router-link> |
      <router-link to="/about">GSAP Terms</router-link> |
      <router-link to="/advance">GSAP Terms Advance</router-link> |
      <router-link to="/statistic">Homework of statistic</router-link> |
      <router-link to="/canvas">My Gallery</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
