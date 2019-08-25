<template>
  <div id="app">
    <b-container fluid>
      <b-row class="content-container">
        <b-col cols="12" class="content-header">Header</b-col>
        <b-col cols="12" class="content-middle">
          <b-row>
            <b-col cols="2" class="menus">
              <b-nav vertical>
                <b-nav-item
                  class="menu-item"
                  to="/chart/msft"
                  :active="$route.path === '/chart/msft'"
                >MSFT</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/aapl"
                  :active="$route.path === '/chart/aapl'"
                >AAPL</b-nav-item>
                <b-nav-item class="menu-item">INTC</b-nav-item>
                <b-nav-item class="menu-item">NFLX</b-nav-item>
                <b-nav-item class="menu-item">ORCL</b-nav-item>
                <b-nav-item class="menu-item">CMCSA</b-nav-item>
                <b-nav-item class="menu-item">GOOG</b-nav-item>
                <b-nav-item class="menu-item">LUV</b-nav-item>
                <b-nav-item class="menu-item">HOG</b-nav-item>
                <b-nav-item class="menu-item">GOOGL</b-nav-item>
                <b-nav-item class="menu-item">AMZN</b-nav-item>
              </b-nav>
            </b-col>
            <b-col cols="10">
              <router-view />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" class="content-footer">Footer</b-col>
      </b-row>
    </b-container>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route);
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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

.content-container {
  height: 100vh;
}
.content-header {
  height: 7.5%;
  background-color: red;
  color: white;
}
.content-middle {
  height: 85%;
}

.content-middle > .row {
  height: 100%;
}

.menus {
  padding: 0;
}

.menus .nav {
  height: 100%;
  text-align: left;
}

.content-footer {
  height: 7.5%;
  background-color: black;
  color: white;
}

.menu-item {
  flex: 1;
}

.menu-item a {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: dimgray;
}

.menu-item:not(:first-child) {
  border-top: 2px solid white;
}

.nav-link {
  background-color: palegreen;
}
.nav-link.active {
  background-color: darkseagreen;
}

.nav-link:hover:not(.active) {
  background-color: palegreen;
  opacity: 0.5;
}
</style>
