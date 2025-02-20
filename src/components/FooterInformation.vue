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
        Informationen
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="py-5">
        <v-card-title>
          <v-icon icon="mdi-invoice-text-clock" class="mr-3" />
          Berechnung and Daten-Quellen
        </v-card-title>

        <v-card-text>
          <p class="font-weight-bold  mt-3">
            Berechnung
          </p>
          <p>
            Meeting Clock stoppt die Dauer des Meetings und multipliziert das Gesamtgehalt aller Teilnehmenden.
            Für die berechnung werden die Entgeltgruppen verwendet und es wird von 160 Arbeitsstunden pro Monat ausgegangen.
          </p>

          <p class="font-weight-bold mt-5">
            Datenquelle
          </p>
          <p class="my-2">
            Meeting Clock enthält (aktuell) nur die neuesten Gehaltstabellen (zurzeit 2024/25) des Landes Bayern. <br>
          </p>
          <p class="my-2">
            Die Monatsgehälter für die Berechnung wurden übernommen von
            <a href="https://oeffentlicher-dienst.info/" target="_blank" class="font-weight-bold">Öffentlicher-Dienst.Info</a>.
            <br>
            Neben den Tabellen bietet die Seite auch einen Gehaltsrechner sowie zahlreiche weitere Informationen
            und Nachrichten zum Gehalt im Öffentlichen Dienst.
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
