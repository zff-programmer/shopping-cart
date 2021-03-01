<template>
  <div>
    <div class="food-container">
      <!-- 菜单列表开始 -->
      <div class="menu-list">
        <ul>
          <li @click="change(item.foodType,index)"
              v-for="(item,index) in menu"
              :key="index"
              :class="currentIndex == index ? 'active':''">{{item.menuName}}</li>
        </ul>
      </div>
      <!-- 菜单列表结束 -->
      <!-- 食物列表开始 -->
      <ul class="food-list">
        <li class="food-item"
            v-for="item in foods.filter(food=>food.foodType===foodType)"
            :key="item.foodID">
          <img src="//blog.qszone.com/img/author.6f6bee9b.jpg"
               alt />
          <div class="food-info">
            <div class="food-name">{{item.foodName}}</div>
            <div class="food-operation">
              <div class="food-price">￥{{item.foodPrice}}</div>
              <div class="food-count">
                <button @click="decrement(item.foodID)"
                        v-show="item.count > 0">-</button>
                <span v-show="item.count > 0">{{item.count}}</span>
                <button @click="increment(item.foodID)">+</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 食物列表结束 -->
    <!-- 主体部分结束 -->

    <!-- 尾部开始 -->
    <footer class="footer-container">
      <!-- 模态框开始 -->
      <div class="model-box"
           v-show="visible && totalPrice">模态框</div>
      <!-- 模态框结束 -->
      <!-- 弹出框开始 -->
      <div class="pop-up-box"
           v-show="visible && totalPrice">
        <li class="food-item"
            v-for="item in foods.filter(food=>food.count > 0)"
            :key="item.foodID">
          <img src="//blog.qszone.com/img/author.6f6bee9b.jpg"
               alt />
          <div class="food-info">
            <div class="food-name">{{item.foodName}}</div>
            <div class="food-operation">
              <div class="food-price">￥{{item.foodPrice}}</div>
              <div class="food-count">
                <button @click="decrement(item.foodID)">-</button>
                {{item.count}}
                <button @click="increment(item.foodID)">+</button>
              </div>
            </div>
          </div>
        </li>
      </div>
      <!-- 弹出框结束 -->
      <div class="footer"
           @click="changeVisiblity">
        <span class="footer-total">总计：￥{{totalPrice}}</span>
        <span class="footer-cal">结算</span>
      </div>
    </footer>
    <!-- 尾部结束 -->
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      currentIndex: 0,
      foodType: 'recommend',
      visible: false,
      menu: [
        { menuName: '招牌菜', foodType: 'recommend' },
        { menuName: '主食', foodType: 'staple' },
        { menuName: '小吃', foodType: 'snack' },
      ],
      foods: [
        {
          foodID: 1,
          foodType: 'recommend',
          typeName: '推荐',
          foodName: '酸辣白菜',
          foodPrice: 13,
          count: 0,
        },
        {
          foodID: 2,
          foodType: 'recommend',
          typeName: '推荐',
          foodName: '酸辣土豆丝',
          foodPrice: 12,
          count: 0,
        },
        {
          foodID: 3,
          foodType: 'recommend',
          typeName: '推荐',
          foodName: '鱼香肉丝',
          foodPrice: 15,
          count: 0,
        },
        {
          foodID: 4,
          foodType: 'staple',
          typeName: '主食',
          foodName: '米饭',
          foodPrice: 3,
          count: 0,
        },
        {
          foodID: 5,
          foodType: 'staple',
          typeName: '主食',
          foodName: '大碗面',
          foodPrice: 10,
          count: 0,
        },
        {
          foodID: 6,
          foodType: 'snack',
          typeName: '小吃',
          foodName: '手抓饼',
          foodPrice: 6,
          count: 0,
        },
        {
          foodID: 7,
          foodType: 'snack',
          typeName: '小吃',
          foodName: '葱油饼',
          foodPrice: 5,
          count: 0,
        },
        {
          foodID: 8,
          foodType: 'snack',
          typeName: '小吃',
          foodName: '肉夹馍',
          foodPrice: 8,
          count: 0,
        },
        {
          foodID: 9,
          foodType: 'drinks',
          typeName: '酒水',
          foodName: '可口可乐',
          foodPrice: 3,
          count: 0,
        },
        {
          foodID: 10,
          foodType: 'drinks',
          typeName: '酒水',
          foodName: '王老吉',
          foodPrice: 3.5,
          count: 0,
        },
        {
          foodID: 11,
          foodType: 'drinks',
          typeName: '酒水',
          foodName: '雪碧',
          foodPrice: 2.5,
          count: 0,
        },
        {
          foodID: 12,
          foodType: 'drinks',
          typeName: '酒水',
          foodName: '芬达',
          foodPrice: 3,
          count: 0,
        },
        {
          foodID: 13,
          foodType: 'drinks',
          typeName: '酒水',
          foodName: '柠檬茶',
          foodPrice: 4,
          count: 0,
        },
      ],
    }
  },
  mounted () {
    let selectFoods = this.$store.state.selectFoods
    for (const item of this.foods) {
      for (const select of selectFoods) {
        if (item.foodID == select.foodID) item.count = select.count
      }
    }
  },
  methods: {
    increment (index) {
      this.foods[index - 1].count++
      const count = this.foods[index - 1].count
      if (count === 1) {
        this.$store.commit('addFoods', this.foods[index - 1])
      } else {
        this.$store.commit('changeFoods', {
          foodID: this.foods[index - 1].foodID,
          count,
        })
      }
    },
    decrement (index) {
      this.foods[index - 1].count <= 0 ? 0 : this.foods[index - 1].count--
      const count = this.foods[index - 1].count
      if (count === 0) {
        this.$store.commit('removeFoods', index - 1)
      } else {
        this.$$store.commit('changeFoods', {
          foodID: this.foods[index - 1].foodID,
          count,
        })
      }
    },
    change (foodType, index) {
      this.foodType = foodType
      this.currentIndex = index
    },
    changeVisiblity () {
      if (this.totalPrice <= 0) return
      this.visible = !this.visible
    },
  },
  computed: {
    totalPrice () {
      let sum = 0
      for (const item of this.foods) {
        sum += item.foodPrice * item.count
      }
      return sum
    },
  },
  watch: {
    totalPrice (newValue, oldValue) {
      if (newValue <= 0) this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.food-container {
  display: flex;
  justify-content: space-between;
  height: 100%;
}

/* 菜单列表 */
.menu-list {
  height: 100%;
  width: 100px;
  background-color: #eee;
  text-align: center;
}

.active {
  background-color: #fff;
}

.menu-list li {
  height: 40px;
  line-height: 40px;
}

/* 食物列表 */
.food-list {
  flex: 1;
}

.food-list li {
  height: 60px;
}

.food-item {
  display: flex;
  justify-content: space-around;
  flex: 1;
  padding-left: 10px;
}

.food-item .food-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  padding: 0 10px;
}

.food-name {
  height: 40px;
}

.food-operation {
  display: flex;
  justify-content: space-between;
}

.food-price {
  color: red;
}

.food-count button {
  width: 20px;
  height: 20px;
  background-color: yellow;
  border: none;
  border-radius: 50%;
  vertical-align: bottom;
  outline: transparent;
}

.footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.model-box {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
}
.footer {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 3;
  height: 50px;
  width: 95%;
  line-height: 50px;
  margin: 0 auto;
  background-color: black;
  border-radius: 25px;
}
.pop-up-box {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  max-height: 400px;
  width: 100%;
  padding-bottom: 50px;
  overflow: scroll;
  background-color: #fff;
  border-top: 30px solid yellowgreen;
  border-radius: 15px;
  & li {
    margin: 10px auto;
  }
}

.hidden {
  visibility: hidden;
}
.visible {
  visibility: visible;
}

.footer .footer-total {
  display: block;
  margin-left: 10px;
  color: white;
}

footer .footer-cal {
  display: block;
  width: 80px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  text-align: center;
  background-color: yellow;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
}
</style>