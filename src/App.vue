<template>
  <div id="app">
    <!-- 头部开始 -->
    <header>购物车</header>
    <!-- 头部结束 -->
    <!-- 主体部分开始 -->
    <div class="container">
      <!-- 导航开始 -->
      <div class="nav">
        <ul>
          <!-- 导航结束 -->
          <router-link to="/menu">菜单</router-link>
          <router-link to="/bussiness">商家</router-link>
        </ul>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

i {
  font-style: normal;
}

img {
  width: 60px;
  height: 60px;
  background-color: red;
}

/* 头部 */
header {
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  background-color: green;
  color: yellow;
}

/* 主体 */
.container {
  height: calc(100vh - 90px);
}

/* 导航 */
.nav {
  height: 40px;
}

.nav ul {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 30px;
  line-height: 30px;
}

.nav a {
  margin-left: 10px;
  // &.router-link-active {
  //   border-bottom: 2px solid lightblue;
  // }
}
.nav a.router-link-active {
  border-bottom: 2px solid lightblue;
}
</style>
