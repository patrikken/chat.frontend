<template>
  <v-list-tile avatar @click="clickOnUser()" class="list-item">
    <v-list-tile-avatar>
      <img src="./../assets/man.png">
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title class="title-item" v-html="fullName"></v-list-tile-title>
      <v-list-tile-sub-title class="statut-item" v-html="user.status"></v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import User from './../models/User';

@Component
export default class UserItem extends Vue {
  @Prop() private user!: User;
  get fullName() {
    return this.user.first_name + ' ' + this.user.last_name;
  }
  get getAvatar(){
    if (this.user.avatar)
    return this.user.avatar;
    return './../assets/man.png';
  }
  clickOnUser(){                           
    this.$router.push({name:'ChatBox',params:{id:""+this.user.id,'last_name':this.user.last_name, 'first_name':this.user.first_name}}); 
  } 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-item {
  border: 1px solid rgba(112, 112, 112, 0.1);
  border-top-width: 0.1px;
}
.title-item {
  font-family: "Tahoma", Regular;
  font-size: 16px;
}
.statut-item {
  font-family: "Tahoma", Regular;
  font-size: 14px;
}
/* 
* End Search zone
*/
</style>
