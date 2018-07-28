<template>
  <div class="rules-missed-row">
    <span class="cross-points-labels">
      <span class="table-cell">Crosses</span>
      <span class="hline"></span>
      <span class="table-cell">Points</span>
    </span>
    <span
      class="cross-points-block"
      v-for="block in blocks"
      :key="block.crosses">
      <span class="cross-points-block-container">
        <span class="cross-points-block-content">
          <span class="table-cell">{{ block.crosses }}x</span>
          <span class="hline"></span>
          <span class="table-cell">{{ block.points }}</span>
        </span>
      </span>
    </span>
    <span class="missed">
      <span class="missed-label">Missed: -5</span>
      <span
        :class="{ 'missed-block': true, 'ticked': miss }"
        v-for="(miss, missIndex) in misses"
        @click="onMissClick(missIndex)"
        :key="missIndex">
        <span class="missed-block-container"></span>
        <TickedOverlay/>
      </span>
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import TickedOverlay from '@/components/TickedOverlay';

export default {
  name: 'RulesMissedRow',
  components: {
    TickedOverlay
  },
  data() {
    return {
      blocks: [...Array.from(new Array(12), (val, index) => ({ 
        crosses: index + 1,
        points: (index + 1) * (index + 2) / 2
      }))]
    };
  },
  computed: {
    ...mapGetters(['misses'])
  },
  methods: {
    onMissClick: function(missIndex) {
      if (!this.misses[missIndex]) {
        const nbMissesBefore = this.misses
          .slice(0, missIndex)
          .filter(miss => miss)
          .length;
        if (nbMissesBefore === missIndex) {
          this.$store.dispatch('tickMiss', missIndex);
        }
      } 
    }
  }
}
</script>

<style lang="scss">
@import '@/global.scss';

$font-size: 20px;

.rules-missed-row {
  padding: 16px 0;
  .cross-points-labels,
  .cross-points-block,
  .missed {
    display: inline-block;
    vertical-align: middle;
  }
  .cross-points-block {
    width: 38px;
    height: 70px;
    border-radius: 10px;
    background-color: $gray;
    padding: 4px;
    margin: 0 2px;
    .cross-points-block-container {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background-color: $white;
      .cross-points-block-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% - 6px);
      }
    }
  }
  .missed {
    width: 120px;
    margin-left: 16px;
    .missed-label {
      display: inline-block;
      width: 100%;
      font-size: $font-size;
      line-height: $font-size;
      font-weight: bold;
      text-align: center;
      color: $black;
    }
    .missed-block {
      position: relative;
      overflow: hidden;
      display: inline-block;
      vertical-align: middle;
      border-radius: 10px;
      width: 20px;
      height: 24px;
      background-color: $gray;
      padding: 3px;
      margin: 0 2px;
      .missed-block-container {
        display: inline-block;
        border-radius: 8px;
        background-color: $white;
        width: 100%;
        height: 100%;
      }
      &.ticked .ticked-overlay {
        visibility: visible;
        svg {
          width: 24px;
        }
      }
      &:not(.ticked) {
        cursor: pointer;
      }
    }
  }
  .table-cell {
    display: block;
    padding: 6px 0 2px;
    font-size: $font-size;
    line-height: $font-size;
    font-weight: bold;
    color: $black;
  }
  .hline {
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 2px solid $gray;
  }
}
</style>
