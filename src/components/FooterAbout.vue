<script setup>

</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        class="mx-2"
        rounded="xl"
        variant="text"
        size="small"
      >
        Datenschutz
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="py-5">
        <v-card-title>
          <v-icon icon="mdi-eye-off" class="mr-3" />
          Datenschutz
        </v-card-title>

        <v-card-text>
          <p class="font-weight-bold mb-2">
            Dieses Projekt läuft vollständig in deinem Browser!
          </p>
          <p>
            Sobald die Seite vollständig geladen ist, werden keine weiteren Daten an den Server gesendet.
            Alle Informationen, die du für die Berechnungen eingibst, verbleiben auf deinem Gerät und werden
            weder übertragen noch an anderer Stelle gespeichert.
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            text="Close"
            variant="flat"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>

</style>
