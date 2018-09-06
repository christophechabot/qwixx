<template>
  <div>
    <div :class="`color-row`">
      <div class="color-row-container">
        <NumberBox
          v-for="(box, index) in boxes"
          :key="box.number"
          :index="index"
          :number="box.number"
          :ticked="box.ticked"
          :color="box.color"
          @clicked="onClicked(index)"/>
      </div>
      <span :class="`lock ${lock.ticked ? 'ticked' : ''} ${lock.color}`">
        <span class="lock-outer">
          <span class="lock-inner">
            <svg viewBox="0 0 14 18">
              <path
                style="fill:currentColor;stroke:none;"
                d="m 9.7518,0.22115 c -1.52437,-0.39179 -2.79204,-0.21956 -3.71316,0.17787 -0.92115,0.39744 -1.51442,1.00421 -1.7562,1.2297 -1.06899,0.99693 -1.30402,2.36578 -1.30402,2.36578 l 2.19077,0.57773 c 0,0 0.3977,-1.0407 0.6612,-1.28644 0.32258,-0.30085 0.62095,-0.59795 1.10712,-0.80771 0.48617,-0.20977 1.14419,-0.34688 2.25076,-0.0625 2.04467,0.52555 2.56206,2.42111 2.3295,3.46865 -0.14677,0.66085 -0.32928,1.37168 -0.51136,2.05162 l -7.84175,-2.03184 c -0.68776,-0.1782 -1.38584,0.22856 -1.56403,0.91632 l -1.55909,6.01721 c -0.17822,0.68776 0.23329,1.38705 0.92104,1.56526 l 9.35906,2.42497 c 0.68776,0.17821 1.38705,-0.23328 1.56525,-0.92104 l 1.55911,-6.01721 c 0.11329,-0.43736 -0.0151,-0.87778 -0.29779,-1.18687 0.20341,-0.75355 0.41283,-1.56183 0.58242,-2.32575 0.50398,-2.26992 -0.7616,-5.32888 -3.97875,-6.15576 z m -2.23199,8.40023 c 0.7906,0.20486 1.26597,1.0127 1.06111,1.80332 -0.1373,0.52989 -0.54258,0.91684 -1.03463,1.05349 l 0.11761,2.75926 -3.18535,-0.88587 1.57239,-2.31136 c -0.31924,-0.35641 -0.46323,-0.85981 -0.33419,-1.35772 0.20484,-0.79062 1.01269,-1.26598 1.80329,-1.06113 z"
              />
            </svg>
          </span>
          <TickedOverlay/>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getNbTicked } from '@/helpers';

import NumberBox from '@/components/NumberBox';
import TickedOverlay from '@/components/TickedOverlay';

export default {
  name: 'ColorRow',
  components: {
    NumberBox,
    TickedOverlay
  },
  data: function() {
    return {};
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters(['numberBoxes']),
    boxes: function() {
      return this.numberBoxes(this.color).slice(0, 11);
    },
    lock: function() {
      return this.numberBoxes(this.color)[11];
    }
  },
  methods: {
    onClicked(index) {
      if (index < 10) {
        let hasNoFurtherTick = true;
        for (let i = index + 1; i < this.boxes.length; i++) {
          if (this.boxes[i].ticked) {
            hasNoFurtherTick = false;
          }
        }
        if (hasNoFurtherTick) {
          this.$store.dispatch('tickNumberBox', { color: this.color, index });
        }
      } else {
        if (getNbTicked(this.boxes) >= 5) {
          this.$store.dispatch('tickNumberBox', { color: this.color, index: 10 });
          this.$store.dispatch('tickNumberBox', { color: this.color, index: 11 });
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/global.scss';

  .color-row {
    display: inline-block;
    padding: 0;
    margin-bottom: 4px;
    min-width: 800px;
    .color-row-container {
      display: inline-block;
      vertical-align: middle;
    }
    .lock {
      display: inline-block;
      vertical-align: middle;
      height: 69px;
      padding: 16px 8px 0 8px;
      .lock-outer {
        position: relative;
        overflow: hidden;
        display: inline-block;
        vertical-align: middle;
        width: 42px;
        height: 42px;
        border-radius: 50%;
        padding: 4px;
        .lock-inner {
          position: relative;
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: inline-block;
            width: 22px;
          }
        }
      }
      &.ticked {
        .ticked-overlay {
          visibility: visible;
        }
      }
    } 

    .lock.red {
      background-color: $red;
      .lock-outer {
        background-color: $red-dark;
        .lock-inner {
          background-color: $red-light;
          svg {
            color: $red;
          }
        }
      }
    }
  }
  
  .lock.yellow {
    background-color: $yellow;
    .lock-outer {
      background-color: $yellow-dark;
      .lock-inner {
        background-color: $yellow-light;
        svg {
          color: $yellow;
        }
      }
    }
  }

  .lock.green {
    background-color: $green;
    .lock-outer {
      background-color: $green-dark;
      .lock-inner {
        background-color: $green-light;
        svg {
          color: $green;
        }
      }
    }
  }

  .lock.blue {
    background-color: $blue;
    .lock-outer {
      background-color: $blue-dark;
      .lock-inner {
        background-color: $blue-light;
        svg {
          color: $blue;
        }
      }
    }
  }
</style>

