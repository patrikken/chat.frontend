<template> 
  <NewMessageBox id="New"/> 
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NewMessageBox from "@/components/NewMessageBox.vue"; // @ is an alias to /src

@Component({
  components: {
    NewMessageBox
  }
})
export default class NewMessage extends Vue { 
}
</script>

<style lang="scss">
.home {
  background: rgba(112, 112, 112, 0.8);
  opacity: 70%; 
  padding: 1em;
  min-height: 400px;
  padding-bottom: 20px;
} 
#app {
  height: 100%;
} 
.ch-text{
    font-family: 'Tahoma', Regular;
    font-size : 16px;
} 
</style>
