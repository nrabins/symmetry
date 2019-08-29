<template>
  <v-app>
    <!-- <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>-->

    <v-content fill-height>
      <v-container>
        <v-layout>
          <v-flex xs4>
            <v-controls />
          </v-flex>
          <v-flex xs8>
            <v-card>
              <v-card-text>
                <v-canvas/>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Canvas from "@/components/Canvas";
import Controls from "@/components/Controls";

export default {
  components: {
    "v-canvas": Canvas,
    "v-controls": Controls
  }
};
</script>
