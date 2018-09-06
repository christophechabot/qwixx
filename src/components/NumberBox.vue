<template>
  <span
    :class="`number-box ${ticked ? 'ticked' : ''} ${color}`"
    @click="onClick">
    <div class="number-box-container">
      <span class="number-box-text-container">
        <span class="number-box-text">
          {{ number }}
        </span>
        <TickedOverlay/>
      </span>
    </div>
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
    },
    color: {
      type: String,
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
    width: 68px;
    height: 85px;
    overflow: hidden;
    .number-box-container {
      border-radius: 0;
      margin: 8px 0;
      padding: 4px 0;
    }
    .number-box-text-container {
      position: relative;
      display: inline-block;
      width: 60px;
      height: 60px;
      border-radius: 8px;
    }
    .number-box-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 40px;
    }
    .ticked-overlay { 
      border-radius: 8px;
    }
    &:first-of-type {
      padding-left: 16px;
      .number-box-container {
        border-radius: 10px 0 0 10px;
      }
    }
    &:last-of-type {
      padding-right: 4px;
      .number-box-container {
        border-radius: 0 10px 10px 0;
      }
    }
    &:not(.ticked) {
      cursor: pointer;
    }
    &.ticked {
      .ticked-overlay {
        visibility: visible;
      }
    }
    &.red {
      background-color: $red;
      .number-box-container {
        background-color: $red-dark;
        .number-box-text-container {
          background-color: $red-light;
          color: $red;
        }
      }
    }
    &.green {
      background-color: $green;
      .number-box-container {
        background-color: $green-dark;
        .number-box-text-container {
          background-color: $green-light;
          color: $green;
        }
      }
    }
    &.yellow {
      background-color: $yellow;
      .number-box-container {
        background-color: $yellow-dark;
        .number-box-text-container {
          background-color: $yellow-light;
          color: $yellow;
        }
      }
    }
    &.blue {
      background-color: $blue;
      .number-box-container {
        background-color: $blue-dark;
        .number-box-text-container {
          background-color: $blue-light;
          color: $blue;
        }
      }
    }
  } 
</style>
