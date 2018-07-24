<template>
  <div class="total-row">
    <span class="total-label">Total</span>
    <TotalBox
      :value="redTotal"
      color="red"/>
    <span class="sign-delimiter">+</span>
    <TotalBox
      :value="yellowTotal"
      color="yellow"/>
    <span class="sign-delimiter">+</span>
    <TotalBox
      :value="greenTotal"
      color="green"/>
    <span class="sign-delimiter">+</span>
    <TotalBox
      :value="blueTotal"
      color="blue"/>
    <span class="sign-delimiter">-</span>
    <TotalBox
      :value="missesTotal"
      color="gray"/>
    <span class="sign-delimiter">=</span>
    <TotalBox
      :value="total"
      color="black"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getTotal } from '@/helpers';

import TotalBox from '@/components/TotalBox';

export default {
  name: 'TotalRow',
  components: {
    TotalBox
  },
  data: function() {
    return {
      minusTotal: 0
    };
  },
  computed: {
    ...mapGetters(['numberBoxes', 'misses']),
    redTotal: function() {
      return getTotal(this.numberBoxes('red'));
    },
    yellowTotal: function() {
      return getTotal(this.numberBoxes('yellow'));
    },
    greenTotal: function() {
      return getTotal(this.numberBoxes('green'));
    },
    blueTotal: function() {
      return getTotal(this.numberBoxes('blue'));
    },
    missesTotal: function() {
      return this.misses
        .filter(miss => miss)
        .length * 5;
    },
    total: function() {
      return this.redTotal + this.yellowTotal + this.greenTotal + this.blueTotal - this.missesTotal;
    }
  }
};
</script>

<style lang="scss" scoped>
.total-row {
  background-color: #bdbdbd;
  padding: 8px 0;
}
.total-label {
  display: inline-block;
  vertical-align: middle;
  color: #000000;
  font-size: 24px;
  font-weight: bold;
  padding-right: 16px;
}
.sign-delimiter {
  display: inline-block;
  vertical-align: middle;
  color: #000000;
  font-size: 36px;
  font-weight: bold;
  padding: 0 8px;
}
</style>
