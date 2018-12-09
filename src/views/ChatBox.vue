<template>
  <v-container
    @NotifactiveUser="setActiveUser(user)"
    id="ChatBox"
    fill-height
    grid-list-md
    fluid
    class="home"
  >
    <v-layout fill-height align-center justify-center row>
      <v-flex fill-height xs12 sm10 md8 lg8>
        <div class="holder">
          <v-layout fill-height row>
            <v-flex fill-height xs3 sm3 md2 lg3 style="padding-right: 0;">
              <v-flex>
                <v-layout fill-height align-center justify-center row class="header elevation-1">
                  <img src="./../assets/group306.svg" class="header-img">
                  <span class="pk-title-text">Новое сообщение</span>
                </v-layout>
              </v-flex>
              <v-list two-line class="no-padding pk-magin-top-small">
                <template v-for="(item, index) in data">
                  <UserTabsItem
                    v-bind:user="item"
                    v-bind:active="isActive(item.id, index)"
                    v-bind:index="index"
                    @clickUser="activateUser(index)"
                    :key="index"
                  />
                </template>
              </v-list>
            </v-flex>
            <v-flex fill-height xs9 sm9 md10 lg9 style="padding-left: 0;">
              <v-flex>
                <v-layout
                  v-if="activeUser"
                  fill-height
                  align-center
                  justify-center
                  row
                  class="header elevation-1"
                >
                  <v-list-tile-avatar v-if="activeUser.id !=0 ">
                    <img :src="activeUser.avatar" class="header-avatar">
                  </v-list-tile-avatar>
                  <span class="pk-title-text">{{activeUser.last_name}} {{activeUser.first_name}}</span>
                  {{localUserId}}
                </v-layout>
              </v-flex>
              <div class="pk-chat-panel elevation-1">
                <v-flex
                  class="scroll-y pk-msg-panel"
                  style="padding : 4px  30px 4px 30px;max-height: 400px"
                  id="pk-panel-msg"
                >
                  <v-layout v-if="loading" fill-height align-center justify-center row>
                    <v-progress-circular :size="25" :width="2" color="#3b87f5" indeterminate></v-progress-circular>
                  </v-layout>
                  <div v-else>
                    <template v-for="(item, index) in msgs">
                      <MessageVue
                        :key="index"
                        :loading="loading"
                        :activeUser="activeUser"
                        v-bind:localUserId="localUserId"
                        :message="item"
                      />
                    </template>
                  </div>
                </v-flex>
                <v-layout
                  style="padding : 4px  30px; margin : 4px 0;"
                  align-center
                  justify-center
                  row
                >
                  <v-flex lg1>
                    <v-list-tile-avatar>
                      <img src="./../assets/man.png">
                    </v-list-tile-avatar>
                  </v-flex>
                  <v-flex lg10>
                    <input
                      class="pk-input"
                      v-model="message"
                      v-on:keyup.enter="send"
                      placeholder="Написать сообщение"
                      type="text"
                    >
                  </v-flex>
                </v-layout>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import User from "./../models/User";
import UserTabsItem from "@/components/UserTabsItem.vue"; // @ is an alias to /src
import UserItem from "@/components/UserItem.vue";
import MessageVue from "@/components/MessageVue.vue";
import Message from "@/models/Message";
import axios from "axios";
import Routes from "@/services/Routes";
import HttpService from "@/services/HTTP";

@Component({
  components: {
    UserTabsItem,
    UserItem,
    MessageVue
  }
})
export default class ChatBox extends Vue {
  private activeUser: User;
  //private data: MessageEntry[];
  private data: User[];
  private msgs: Message[];
  private loading: boolean;
  private localUserId!: number;
  private message: string;
  constructor() {
    super();
    var id = prompt("Enter you ID");
    if (id != null) this.localUserId = parseInt(id);
    // this.localUserId = 13;
    this.loading = true;
    this.data = [];
    this.activeUser = new User();
    this.message = "";
    //this.activeUser = this.data[1].user;
    this.msgs = [];
  }

  mounted() {
    HttpService.GET(Routes.USER_LIST, () => {
      this.loading = false;
    }).then((value: any) => {
      this.data = value;
      //this.activateUser(1);
    });
   setInterval(() => {
      const data = {
        sender: this.localUserId,
        reciever: this.activeUser.id,
        page: 0
      };
      HttpService.POST(Routes.CHAT_BOX, data, () => {
        this.loading = false;
      }).then((value: any) => {
        this.msgs = value.data;
       // console.log("Result of on service", value.data);
       this.scrollToBottom();
      }); 
    }, 1000);
  }

  setActiveUser(user: User) {
    console.log("setactiveuser", user);
    this.activeUser = user;
  }

  async activateUser(index: number) {
    this.loading = true;
    this.activeUser = this.data[index];
    const data = {
      sender: this.localUserId,
      reciever: this.activeUser.id,
      page: 0
    };
    await HttpService.POST(Routes.CHAT_BOX, data, () => {
      this.loading = false;
    }).then((value: any) => {
      this.msgs = value.data;
      console.log("Result of on service", value.data);
    });
    this.scrollToBottom();
  }

  isActive(id: number | string, index: number) {
    if (this.activeUser.id == 0) {
      if (this.$route.params.user == id) {
        this.activateUser(index);
      }
    }
    return this.activeUser.id == id;
  }

  send() {
    var msg = new Message(this.localUserId, this.message);
    this.message = "";
    const data = msg.getFormattedData(this.activeUser.id);
    HttpService.POST(Routes.SEND_MSG, data, () => {
      // alert('message sended')
    }).then(value => {
      if (value != null) {
        this.msgs.push(msg);
        this.scrollToBottom();
      }
    });
  }

  scrollToBottom() {
    var container = this.$el.querySelector("#pk-panel-msg");
    if (container != null) container.scrollTop = container.scrollHeight + 50000;
  }
}

interface MessageEntry {
  user: User;
  message: any;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.holder {
  background-color: #ffffff;
  border: rgba(112, 112, 112, 0.2) solid 1px;
  // width: 600px;
  // min-height: 600px;
  margin: auto;
  width: 100%;
}

.header {
  height: 40px;
  border: rgba(112, 112, 112, 0.2) solid 1px;
  padding: 5px;
}
.header-img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
.header-avatar {
  width: 30px;
  height: 30px;
}
.no-padding {
  padding: 0;
}
.pk-magin-top-small {
  margin-top: 10px;
}
.pk-text {
  font-size: 13x;
}
.h-title-text {
  font-size: 15px;
}
.pk-chat-panel {
  border-left: 1px solid transparent;
}
.pk-msg-panel {
  height: 500px;
}
.pk-input {
  width: 100%;
  height: 35px;
  padding: 5px 10px;
  font-family: "Tahoma", Regular;
  border: 1px solid rgba(112, 112, 112, 0.1);
}
.pk-input:active,
.pk-input:focus {
  outline: none;
  border-bottom: 2px solid rgba(212, 236, 255, 1);
}
</style>
