<!-- https://github.com/koishijs/koishijs.github.io/blob/9a01e0bd84de34b06cb6dc6c1bea426f2f417da0/.vuepress/components/PanelView.vue -->
<template>
  <div class="panel-view" :class="{ mini: !title }">
    <div class="controls">
      <div class="circle" :style="{ left: '17px', backgroundColor: '#FF5F56' }"/>
      <div class="circle" :style="{ left: '39px', backgroundColor: '#FFBD2E' }"/>
      <div class="circle" :style="{ left: '61px', backgroundColor: '#27C93F' }"/>
      <div class="title">{{ title }}</div>
    </div>
    <div class="content"><slot/></div>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
  },
}

</script>

<style lang="stylus">

.panel-view
  position relative
  border-radius 6px
  margin 1rem 0
  overflow-x auto
  background-color #f3f6f9

  .controls
    display initial
    position absolute
    top 0.8rem
    width 100%
    .circle
      position absolute
      top 1px
      width 14px
      height 14px
      border-radius 7px
      // box-shadow inset 0 0 1px #000c
    > .title
      text-align center
      width 100%
      font-size 0.9rem
      line-height 1rem

  .content
    padding 0.2rem 1.2rem
    width fit-content

  &.mini .controls
    display none
  &:not(.mini) .content
    padding-top 2rem

</style>