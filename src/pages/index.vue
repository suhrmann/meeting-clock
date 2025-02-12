<template>
  <v-row justify="center">
    <!-- Central page column -->
    <v-col
      cols="12"
      sm="8"
      md="6"
    >
      <v-sheet
        min-height="10vh"
        rounded="lg"
      >

        <!-- Page content -->
        <MeetingClock />

      </v-sheet>
    </v-col>

    <!-- Config column -->
    <v-col
      v-if="!is_production /* only show in dev */"
      cols="12"
      md="3"
    >
      <v-sheet
        min-height="268"
        rounded="lg"
      >
        <!-- Settings options -->
        <MeetingClockSettings />

      </v-sheet>
    </v-col>
  </v-row>
</template>

<script setup>
const is_production = import.meta.env.PROD;
</script>
