<template>
  <v-list-tile avatar @click="clickUser" class="list-item" :class="{'active' : active}">
    <v-list-tile-avatar>
      <img src="./../assets/man.png">
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title
        class="title-item"
        :class="{'unreadedmsg' : !message.isReaded}"
      >{{fullName}}</v-list-tile-title>
      <v-list-tile-sub-title
        class="statut-item"
        :class="{'unreadedmsg' : !message.isReaded}"
        v-html="content"
      ></v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action style="padding-top: 15px; padding-bottom: 19px;" wrap>
      <span class="time">12:24</span>
      <span class="badge_badge">8</span>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import User from "./../models/User";
import Message from "./../models/Message";

@Component
export default class UserTabsItem extends Vue {
  @Prop() private user!: User;
  // @Prop()
  private message!: any;
  @Prop() private active!: boolean;
  constructor() {
    super();
    this.message = {
      id: 13,
      sender: 12,
      content: "Hello patrik",
      creationDate: "string",
      isReaded: true
    };
  }
  get fullName() {
    return this.user.first_name + " " + this.user.last_name;
  }
  clickUser(key: number) {
    this.$emit("clickUser", this.user.id);
  }
  get content() {
    if (this.message.sender == 13) return "Me: " + this.message.content;
    return this.message.content;
  }
  get getAvatar() {
    if (this.user.avatar) return this.user.avatar;
    return "./../assets/man.png";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.list-item {
  // border: 1px solid rgba(112, 112, 112, 0.1);
  border-top-width: 0.1px;
}
.title-item {
  font-family: "Tahoma", Regular;
  font-size: 15px;
}
.statut-item {
  font-family: "Tahoma", Regular;
  font-size: 12px;
}
.unreadedmsg {
  font-weight: bold;
  color: #000000;
}
.active {
  background: rgba(212, 236, 255, 1);
}

.badge_badge {
  color: #fff;
  background-color: #3b87f5;
  text-align: center;
  padding-top: 3px;
  font-size: 12px;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.time {
  color: rgba(0, 0, 0, 0.5);
  font-size: 10px;
}
/* 
* End Search zone
*/
</style>
