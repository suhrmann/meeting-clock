<script setup>
import { useMeetingStore } from '../stores/meetingStore'

const store = useMeetingStore()
</script>

<template>
  <v-card flat>
    <v-card-title>
      Settings
    </v-card-title>
    <v-card-text>
      <v-combobox
        label="Besoldungstabelle"
        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      ></v-combobox>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
