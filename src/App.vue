<template>
  <v-app id="meeting-clock">
    <!-- Navigation bar-->
    <AppNavBar />

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
