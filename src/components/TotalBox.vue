<template>
  <span :class="`total-box ${color}`">
    <span class="total-box-container">
      <span class="total-box-value">
        {{ value }}
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'TotalBox',
  props: {
    value: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/global.scss';

.total-box {
  display: inline-block;
  vertical-align: middle;
  width: 65px;
  height: 50px;
  border-radius: 10px;
  padding: 4px;
  .total-box-container {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background-color: white;
    .total-box-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      line-height: 32px;
      font-weight: bold;
    }
  }
  &.red {
    background-color: $red;
    .total-box-value {
      color: $red;
    }
  }
  &.yellow {
    background-color: $yellow;
    .total-box-value {
      color: $yellow;
    }
  }
  &.green {
    background-color: $green;
    .total-box-value {
      color: $green;
    }
  }
  &.blue {
    background-color: $blue;
    .total-box-value {
      color: $blue;
    }
  }
  &.gray {
    background-color: $gray;
    .total-box-value {
      color: $gray;
    }
  }
  &.black {
    width: 160px;
    background-color: $black;
    .total-box-value {
      color: $black;
    }
  }

}
</style>
