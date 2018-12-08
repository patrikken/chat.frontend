<template>
  <v-container fill-height grid-list-md fluid class="home">
    <v-layout fill-height align-center justify-center row>
      <v-flex fill-height xs12 sm10 md8 lg10>
        <div class="holder">
          <v-layout fill-height row>
            <v-flex fill-height xs2 sm2 md2 lg4>
              <v-list two-line class="no-padding">
                <template v-for="(item, index) in data">
                  <UserTabsItem
                    v-bind:user="item.user"
                    v-bind:message="item.message"
                    v-bind:active="isActive(item.user.id)"
                    v-bind:index="index"
                    @clickUser="activateUser(index)"
                    :key="index"
                  />
                </template>
              </v-list>
            </v-flex>
            <v-flex fill-height xs10 sm10 md10 lg8>
              <v-flex>
                <v-layout fill-height align-center justify-center row class="header elevation-1">
                  <v-list-tile-avatar>
                    <img :src="activeUser.avatar">
                  </v-list-tile-avatar>
                  <span class="ch-text">{{activeUser.last_name}} {{activeUser.first_name}}</span>
                </v-layout>
              </v-flex>
              <v-flex style="padding : 15px; height: 500px;">
                <v-layout v-if="loading" fill-height align-center justify-center row>
                  <v-progress-circular
                    :size="25"
                    :width="2"
                    color="rgba(212, 236, 255, 1)"
                    indeterminate
                  ></v-progress-circular>
                </v-layout>
                <div v-else>
                  <template v-for="(item, index) in msgs">
                    <MessageVue
                      :key="index"
                      :loading="loading"
                      :activeUser="activeUser"
                      :message="item"
                    />
                  </template>
                </div>
              </v-flex>
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

@Component({
  components: {
    UserTabsItem,
    UserItem,
    MessageVue
  }
})
export default class ChatBox extends Vue {
  private activeUser!: User;
  private data: MessageEntry[];
  private msgs: Message[];
  private loading: boolean;
  constructor() {
    super();
    this.loading = false;
    this.data = [
      {
        user: {
          id: 12,
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          first_name: "Kenfack",
          last_name: "Patrik",
          status: "Be Focus",
          lastconnexion: ""
        },
        message: {
          id: 13,
          sender_id: 12,
          content: "Hello patrik",
          createDate: "string",
          isReaded: true
        }
      },
      {
        user: {
          id: 13,
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          first_name: "Mustapha",
          last_name: "B",
          status: "Wish I could come, but I'm out of town this weekend.",
          lastconnexion: ""
        },
        message: {
          id: 11,
          creationDate: "2018-12-05 20:19:08+01",
          chat_hist_id: 29,
          sender: 13,
          isReaded: false,
          content: "Hi",
          messageType: "TEXT"
        }
      },
      {
        user: {
          id: 14,
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          first_name: "Phalcon",
          last_name: "PHP",
          status: "Do you have Paris recommendations? Have you ever been?",
          lastconnexion: ""
        },
        message: {
          id: 12,
          sender_id: 12,
          content: "Do you have Paris recommendations? Have you ever been?",
          createDate: "string",
          isReaded: false
        }
      }
    ];
    this.activeUser = this.data[1].user;
    this.msgs = [
      {
        id: 11,
        creationDate: "2018-12-05 20:19:08+01",
        chat_hist_id: 29,
        sender: 13,
        isReaded: false,
        content: "Hi",
        messageType: "TEXT"
      },
      {
        id: 10,
        creationDate: "2018-12-05 20:18:30+01",
        chat_hist_id: 29,
        sender: 14,
        isReaded: false,
        content: "Hello",
        messageType: "TEXT"
      },
      {
        id: 10,
        creationDate: "2018-12-05 20:18:30+01",
        chat_hist_id: 29,
        sender: 14,
        isReaded: false,
        content: "Hello",
        messageType: "TEXT"
      },
      {
        id: 10,
        creationDate: "2018-12-05 20:18:30+01",
        chat_hist_id: 29,
        sender: 13,
        isReaded: false,
        content:
          "How are you my guy How are you my guy How are you my guy How are you my guy How are you my guy ",
        messageType: "TEXT"
      },
      {
        id: 10,
        creationDate: "2018-12-05 20:18:30+01",
        chat_hist_id: 29,
        sender: 14,
        isReaded: false,
        content: "Je vais bien merci",
        messageType: "TEXT"
      }
    ];
  }

  activateUser(index: number) {
    this.loading = true;
    this.data[index].message.isReaded = true;
    this.activeUser = this.data[index].user;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  isActive(id: number) {
    return this.activeUser.id == id;
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
  height: 60px;
  border: rgba(112, 112, 112, 0.2) solid 1px;
  padding: 5px;
}
.header-img {
  width: 30px;
  height: 30px;
  margin-right: 15px;
}
.no-padding {
  padding: 0;
}
</style>
