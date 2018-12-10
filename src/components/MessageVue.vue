<template>
  <div>
    <v-layout v-if="!isSender" align-center justify-center row> 
      <v-layout align-center justify-center row>
        <v-flex lg1>
          <v-list-tile-avatar>
            <img :src="activeUser.getAvatar">
          </v-list-tile-avatar>
        </v-flex>
        <v-flex lg11>
          <div class="elevation-1 msg  msg-recieve">{{message.content}}</div>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-layout v-else align-center justify-center row>
      <v-flex lg11>
        <div class="elevation-1 msg msg-sender">{{message.content}}</div>
      </v-flex>
      <v-flex lg1>
        <v-list-tile-avatar>
          <img src="./../assets/man.png">
        </v-list-tile-avatar>
      </v-flex>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import User from "./../models/User";
import Message from "./../models/Message";

@Component
export default class MessageVue extends Vue {
  @Prop() private activeUser!: User;
  @Prop() private message!: Message;
  @Prop() private active!: boolean;
  @Prop() private localUserId !: number;
  get fullName() {
    return this.activeUser.first_name + " " + this.activeUser.last_name;
  }
  get isSender() {
    return this.message.sender == this.localUserId; // Need to change by current user
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.active {
  background: rgba(212, 236, 255, 1);
}

.msg {
  padding: 15px;
  color: rgba(0, 0, 0, 1);
  margin-top: 10px;
  margin-bottom: 10px;
}
.msg-receiver {
  padding: 15px;
}
.msg-sender {
  padding: 15px;
  background-color: rgba(212, 236, 255, 1);
}
</style>
