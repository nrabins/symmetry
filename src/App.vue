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

    <v-content>
      <v-container grid-list-lg fill-height>
        <v-layout>
          <v-flex xs2>
            <v-controls/>
          </v-flex>
          <v-flex xs10>
            <v-canvas/>
          </v-flex>
        </v-layout>
      </v-container>
      <!-- <v-container>
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
      </v-container>-->
    </v-content>
  </v-app>
</template>

<script>
// import Canvas from "@/components/Canvas";
import Controls from "@/components/Controls";
import Canvas from "@/components/Canvas";

export default {
  components: {
    // "v-canvas": Canvas,
    "v-controls": Controls,
    "v-canvas": Canvas
  }
};
</script>