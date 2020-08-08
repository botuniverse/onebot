<!-- https://github.com/koishijs/koishijs.github.io/blob/9a01e0bd84de34b06cb6dc6c1bea426f2f417da0/.vuepress/components/ChatMessage.vue -->
<template>
  <div class="chat-message" :class="{ shown }">
    <img v-if="avatar" class="avatar" :src="avatar"/>
    <div v-else class="avatar" :style="{ backgroundColor: color }">{{ nickname[0] }}</div>
    <div class="nickname">{{ nickname }}</div>
    <div class="message-box">
      <slot>&nbsp</slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    nickname: String,
    color: String,
    avatar: String,
  },

  data: () => ({
    shown: false,
    active: false,
    moving: false,
  }),

  watch: {
    active (value) {
      if (!value) return this.shown = false
      const prev = this.$el.previousElementSibling && this.$el.previousElementSibling.__vue__
      if (prev && (prev.moving || !prev.shown)) {
        prev.$once('appear', this.appear)
      } else {
        this.appear()
      }
    },
  },

  mounted () {
    this.handleScroll()
    addEventListener('scroll', this.handleScroll)
    addEventListener('resize', this.handleScroll)
  },

  beforeDestroy () {
    removeEventListener('scroll', this.handleScroll)
    removeEventListener('resize', this.handleScroll)
  },

  methods: {
    appear () {
      this.shown = true
      this.moving = true
      setTimeout(() => {
        this.moving = false
        this.$emit('appear')
      }, 100)
    },
    handleScroll () {
      const rect = this.$el.getBoundingClientRect()
      if (rect.top < innerHeight) this.active = true
      // this.active = rect.top < innerHeight
    },
  },
}

</script>

<style lang="stylus">

.chat-message
  position relative
  margin 1rem 0
  opacity 0
  transform translateX(-20%)
  transition transform 0.3s ease-out, opacity 0.3s ease

  &.shown
    opacity 1
    transform translateX(0)

.avatar
  width 3rem
  height 3rem
  position absolute
  border-radius 100%
  transform translateY(-1px)
  user-select none
  pointer-events none
  text-align center
  line-height 2.8rem
  font-size 1.6rem
  color white

.nickname
  position relative
  margin 0 0 0.5rem 4.4rem
  font-weight bold

.message-box
  position relative
  margin-left 4.4rem
  width fit-content
  line-height 1.6
  border-radius 0.5rem
  background-color white
  word-break break-all

  .chat-message:not(.no-padding) &
    padding 0.6rem 0.8rem

  > img
    border-radius 0.5rem

  img
    vertical-align middle

  p > img
    margin 0.2rem 0

  &::before
    content ''
    position absolute
    right 100%
    top 0px
    width 12px
    height 12px
    border 0 solid transparent
    border-bottom-width 8px
    border-bottom-color currentColor
    border-radius 0 0 0 32px
    color white

  p
    margin 0
    line-height 1.6

</style>