<template>
  <v-container style="height:500px;" fluid>
    <v-layout fill-height align-center justify-center column>
      <h3>Welcome</h3>
      <v-flex style="width: 292px;" xs8>
        <v-layout v-if="loading" row>
          <v-progress-circular
            :size="25"
            align-center
            justify-center
            :width="2"
            color="#3b87f5"
            indeterminate
          ></v-progress-circular>
        </v-layout>
        <v-form>
          <v-text-field v-on:keyup.enter="send" v-model="email" label="E-mail" required></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import Routes from "@/services/Routes";
import HttpService from "@/services/HTTP";

@Component({
  components: {
    HelloWorld
  }
})
export default class Welcome extends Vue {
  private email: string;
  private loading: boolean;
  constructor() {
    super();
    this.loading = false;
    this.email = "";
  }
  send() {
    this.loading = true;
    HttpService.GET(Routes.GET_USER + this.email, () => {
      this.loading = false;
    }).then((value) => {
      if (value.id != undefined) {
        localStorage.setItem("user_id", value.id);
        localStorage.setItem("name", value.first_name + ' '+ value.last_name);
        this.$router.push('/new');
      } else {
        alert("user dont exist");
      }
    });
  }
}
</script>
