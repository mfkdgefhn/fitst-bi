<template>
  <div>
    <div class="tucheng">
      <img class="tu"
           src="http://10.10.1.32:8018/Images/sku/18130001.jpg">
      <span class="fooler">女鞋</span>
    </div>
    <div class="tucheng">
      <img class="tu"
           src="http://10.10.1.32:8018/Images/sku/28625023.jpg">
      <span class="fooler">箱包</span></div>

  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }

}

</script>

<style scoped>
.tucheng {
  width: 42%;
  min-width: 500px;
  border: 1px solid #e5e5e5;
  display: inline-block;
  margin: 10px;
  border-radius: 3px;
  text-align: center;
}
.tu {
  width: 37%;
  height: 180px;
  margin: 0 auto;
  display: inline-block;
}
.fooler {
  /* border: 1px solid #409EFF; */
  background: #f5f7fa;
  display: inline-block;
  width: 100%;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  color: #909399;
}
</style>
