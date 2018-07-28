<template>
  <span
    :class="{ 'number-box': true, 'ticked': ticked }"
    @click="onClick">
    <span class="number-box-text">
      {{ number }}
    </span>
    <span class="hover-overlay"></span>
    <TickedOverlay/>
  </span>
</template>

<script>
import TickedOverlay from '@/components/TickedOverlay';

export default {
  name: 'NumberBox',
  components: {
    TickedOverlay
  },
  props: {
    number: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    ticked: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onClick() {
      if (!this.ticked) {
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
    &:not(:last-of-type) {
      margin-right: 4px;
    }
    &:not(.ticked) {
      cursor: pointer;
    }
    &.ticked {
      .ticked-overlay {
        visibility: visible;
      }
    }
  } 
</style>
