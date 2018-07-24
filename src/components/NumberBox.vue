<template>
  <span
    :class="{ 'number-box': true, 'checked': checked }"
    @click="onClick">
    <span class="number-box-text">
      {{ number }}
    </span>
    <span class="hover-overlay"></span>
    <span class="checked-overlay">
      <svg viewBox="0 0 212.982 212.982">
        <path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312
          c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312
          l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937
          c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"/>
      </svg>
    </span>
  </span>
</template>

<script>
export default {
  name: 'NumberBox',
  props: {
    number: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClick() {
      if (!this.checked) {
        this.$emit('clicked');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/global.scss';

  .number-box {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 8px;
    overflow: hidden;
    .number-box-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
    }
    .hover-overlay {
      visibility: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background: rgba(0, 0, 0, .2);
    }
    .checked-overlay {
      visibility: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $black;
        width: 42px;
      }
    }
    &:not(:last-of-type) {
      margin-right: 4px;
    }
    &:not(.checked) {
      cursor: pointer;
      // &:hover .hover-overlay {
      //   visibility: visible;
      // }
    }
    &.checked {
      .checked-overlay {
        visibility: visible;
      }
    }
  } 
</style>
