<template>
  <div id="nav">
    <router-view />
  </div>
</template>

<style lang="scss">
label {
  display: none;
}
* {
  font-family: "Poppins", sans-serif;
}
body {
  background-color: #ff9830cc;
}
#app {
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: black;
    text-decoration: none;

    &.router-link-exact-active {
      border-bottom: black solid;
    }
  }
}
@media screen and (max-width: 480px) {
  #nav {
    padding: 10px;
  }
}
</style>
