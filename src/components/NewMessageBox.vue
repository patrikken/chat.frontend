<template>
  <v-container fill-height grid-list-md fluid class="home">
    <v-layout fill-height align-center justify-center row wrap>
      <v-flex fill-height xs12 sm10 md8 lg5>
        <div class="holder">
          <v-layout fill-height align-center justify-center row class="header">
            <img src="./../assets/group306.svg" class="header-img">
            <span class="ch-text">Новое сообщение</span>
          </v-layout>
          <v-layout class="search-zone" align-space-between justify-end fill-height row>
            <v-flex fill-height xs10 sm10 md10 style="padding-bottom : 0;padding-top : 0;">
              <input type="text" class="search-input" placeholder="Поиск">
            </v-flex>
            <v-flex
              fill-height
              xs2
              sm2
              md2
              align-self-end
              style="padding-bottom : 0;padding-top : 0;"
            >
              <input type="button" class="search-btn">
            </v-flex>
          </v-layout>
          <v-layout
            align-space-between
            justify-end
            fill-height
            style="padding-left : 25px;padding-right : 25px; padding-bottom : 10px;"
            row
          >
            <v-flex style="padding-top : 0; min-height : 200px;">
              <v-layout v-if="loading" fill-height align-center justify-center row>
                <v-progress-circular :size="25" :width="2" color="#3b87f5" indeterminate></v-progress-circular>
              </v-layout>
              <div v-else>
                <v-list two-line class="no-padding">
                  <template v-for="(item, index) in users">
                    <UserItem v-bind:user="item" v-bind:key="index" @click="alert('')"/>
                  </template>
                </v-list>
              </div>
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UserItem from "@/components/UserItem.vue";
import Routes from "@/services/Routes";
import axios from "axios";
import HttpService from "@/services/HTTP";

@Component({
  components: {
    UserItem
  }
})
export default class NewMessageBox extends Vue {
  @Prop() private msg!: string;
  loading = true;
  users = [];
  mounted() {
    HttpService.GET(Routes.USER_LIST, () => {
      this.loading = false;
    }).then((response) => { 
      this.users = response;
    });
  }
  // data() {
  //   return {
  //     loading: this.loading,
  //     errored: false,
  //     items: this.users
  //   };
  //  }
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
  height: 50px;
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

/* 
* Search zone style
*/
.search-zone {
  height: 35px;
  border: rgba(112, 112, 112, 0.2) solid 1px;
  padding: 0;
}
.search-btn {
  width: 100%;
  height: 100%;
  background-image: url("./../assets/зона поиска.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position-y: center;
}
.search-input {
  height: 100%;
  width: 110%;
  padding-left: 8px;
  padding-right: 5%;
  border: 0px solid transparent;
}
.search-input:focus {
  border: 0px solid transparent;
}

.search-input:active {
  border: 0px solid transparent;
}

/* 
* End Search zone
*/
</style>
