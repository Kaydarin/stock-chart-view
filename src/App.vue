<template>
  <div id="app">
    <b-container fluid>
      <b-row class="content-container">
        <!-- Header -->
        <b-col cols="12" class="content-header">Header</b-col>
        <b-col cols="12" class="content-middle">
          <b-row>
            <!-- Left Menus -->
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
                <b-nav-item
                  class="menu-item"
                  to="/chart/intc"
                  :active="$route.path === '/chart/intc'"
                >INTC</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/nflx"
                  :active="$route.path === '/chart/nflx'"
                >NFLX</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/orcl"
                  :active="$route.path === '/chart/orcl'"
                >ORCL</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/cmcsa"
                  :active="$route.path === '/chart/cmcsa'"
                >CMCSA</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/goog"
                  :active="$route.path === '/chart/goog'"
                >GOOG</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/luv"
                  :active="$route.path === '/chart/luv'"
                >LUV</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/hog"
                  :active="$route.path === '/chart/hog'"
                >HOG</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/googl"
                  :active="$route.path === '/chart/googl'"
                >GOOGL</b-nav-item>
                <b-nav-item
                  class="menu-item"
                  to="/chart/amzn"
                  :active="$route.path === '/chart/amzn'"
                >AMZN</b-nav-item>
              </b-nav>
            </b-col>
            <!-- Chart Views -->
            <b-col cols="10">
              <router-view :key="$route.path" />
            </b-col>
          </b-row>
        </b-col>
        <!-- Footer -->
        <b-col cols="12" class="content-footer">Footer</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
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
