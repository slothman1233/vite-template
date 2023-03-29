<template>
  <div>
    <HelloWorld :msg="msg"></HelloWorld>
  </div>

  <div>
    <SvgIcon icon-class="a-bug"></SvgIcon>
    <SvgIcon icon-class="projectManage"></SvgIcon>
  </div>
</template>

<script lang="ts">
  import HelloWorld from 'comps/HelloWorld.vue';

  export default defineComponent({
    name: 'ViewsHome',
    components: { HelloWorld },
    setup(prop) {
      return {
        msg: 'hel2lo World',
      };
    },
  });
</script>

<style lang="less">
  body {
    color: @FontColor_1;
    display: flex;
  }
</style>
