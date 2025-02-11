<template>
  <v-app id="inspire">
    <v-app-bar
      class="px-3"
      density="compact"
      flat
    >
      <v-avatar
        class="hidden-md-and-up"
        color="grey-darken-1"
        size="32"
      ></v-avatar>

      <v-spacer></v-spacer>

      <v-tabs
        align-tabs="center"
        color="grey-darken-2"
      >
        <v-tab
          v-for="link in links"
          :key="link"
          :text="link"
        ></v-tab>
      </v-tabs>
      <v-spacer></v-spacer>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-1"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row justify="center">
          <v-col
            cols="12"
            sm="8"
            md="6"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >

              <!-- Page content -->
              <router-view />

            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  const links = [
    'Dashboard',
    'Messages',
    'Profile',
    'Updates',
  ]
</script>

<script>
  export default {
    data: () => ({
      links: [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ],
    }),
  }
</script>
