<template>
  <div id="app" ref="app">
    <ColorRow
      color="red"
      @ticked="onNumberBoxTicked"/>
    <ColorRow
      color="yellow"
      @ticked="onNumberBoxTicked"/>
    <ColorRow
      color="green"
      @ticked="onNumberBoxTicked"/>
    <ColorRow
      color="blue"
      @ticked="onNumberBoxTicked"/>
    <RulesMissedRow/>
    <TotalRow/>
  </div>
</template>

<script>
import ColorRow from '@/components/ColorRow';
import RulesMissedRow from '@/components/RulesMissedRow';
import TotalRow from '@/components/TotalRow';

const resizeElt = (elt) => {
  const widthRatio = window.innerWidth / elt.clientWidth;
  const heightRatio = window.innerHeight / elt.clientHeight;
  const ratio = Math.min(widthRatio, heightRatio);
  console.log(ratio);
  elt.style.transform = `translate(-50%, 0) scale(${ratio})`;
};

export default {
  name: 'app',
  components: {
    ColorRow,
    RulesMissedRow,
    TotalRow
  },
  methods: {
    onNumberBoxTicked(payload) {
      this.$store.dispatch('tickNumberBox', payload);
    }
  },
  mounted() {
    this.$nextTick(() => {
      resizeElt(this.$el);
    });
    window.addEventListener('resize', () => {
      resizeElt(this.$el);
    });
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: inline-block;
  background-color: #e3e3e3;
  color: #2c3e50;
  padding: 32px;
  width: 902px;
  box-sizing: border-box;
  position: relative;
  left: 50%;
  top: 0;
  // left: 50%;
  // top: 0;
  transform-origin: 50% 0;
  > div {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
