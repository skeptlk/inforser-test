<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <div class="d-flex align-center">
            <v-toolbar-title>
                Опросы
            </v-toolbar-title>
        </div>

        <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>

  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  }
};
</script>
