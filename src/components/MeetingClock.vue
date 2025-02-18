<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- Timer-Bereich -->
        <v-row justify="center">
          <v-col>
            <v-card>
              <v-card-title class="d-flex flex-column align-center mt-6">

                <!-- Kosten-Anzeige -->
                <div class="text-h4">
                  Meeting Kosten:
                </div>
                <div class="text-h4 text-red font-weight-bold text-center mt-5">
                  {{ totalCostFormatted }} €
                </div>

                <!-- Timer-Anzeige -->
                <div class="text-h5 mt-3 mb-5">
                  {{ formattedTime }}
                </div>

                <!-- Buttons -->
                <v-row
                  align="center"
                  justify="center"
                  :class="smAndDown ? 'mt-16' : ''"
                >
                  <v-col cols="12" md="4" sm="6">
                    <v-btn
                      color="success"
                      size="large"
                      :block="smAndDown"
                      :disabled="store.isRunning"
                      @click="handleStart"
                    >
                      {{ !store.isRunning && store.elapsedSeconds == 0 ? 'Start' : 'Continue' }}
                    </v-btn>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-btn
                      color="warning"
                      size="large"
                      :block="smAndDown"
                      :disabled="!store.isRunning"
                      @click="handlePause"
                    >
                      Pause
                    </v-btn>
                  </v-col>

                  <v-col cols="12" md="4" sm="6">
                    <v-btn
                      color="error"
                      size="large"
                      :block="smAndDown"
                      @click="handleReset"
                    >
                      Reset
                    </v-btn>
                  </v-col>
                </v-row>

              </v-card-title>
            </v-card>
          </v-col>
        </v-row>


        <!-- Meeting members -->
        <v-row justify="center" class="mt-6">
          <v-col>
            <v-card flat>
              <v-card-title class="justify-space-between">
                <span>Teilnehmer</span>
              </v-card-title>

              <!-- Tabelle oder einzelne Rows -->
              <v-card-text>
                <table class="participants-table">
                  <thead>
                    <tr>
                      <th>Eingruppierung</th>
                      <th>Anzahl</th>
                      <th>Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(p, idx) in store.participants"
                      :key="idx"
                    >
                      <td>
                        <!-- Eingruppierung as v-autocomplete to allow Test-search -->
                        <v-autocomplete
                          v-model="p.category"
                          :items="Object.keys(store.monthlySalaries)"
                          label="Eingruppierung"
                          dense
                          outlined
                        />
                      </td>
                      <td>
                        <!-- Anzahl als v-text-field -->
                        <v-text-field
                          type="number"
                          min="1"
                          v-model.number="p.count"
                          dense
                          outlined
                          style="max-width:100px"
                        />
                      </td>
                      <td>
                        <v-btn
                          color="error"
                          class="mb-5"
                          icon
                          @click="store.removeParticipant(idx)"
                        >
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  variant="flat"
                  @click="store.addParticipant"
                >
                  + Teilnehmer hinzufügen
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { onMounted, onUnmounted, computed } from 'vue'
import { useMeetingStore } from '../stores/meetingStore'
import { useDisplay } from 'vuetify'

export default {
  setup() {
    const store = useMeetingStore()

    const { smAndDown } = useDisplay()

    // Zeit formatieren (HH:MM:SS)
    const formattedTime = computed(() => {
      const totalSeconds = Math.floor(store.elapsedSeconds)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      const pad = (val) => String(val).padStart(2, '0')
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    })

    const totalCostFormatted = computed(() => {
      return store.totalCost.toFixed(2)
    })

    // Timer-Updates
    let timerInterval = null

    onMounted(() => {
      timerInterval = setInterval(() => {
        store.updateTimer()
      }, 1000)
    })

    onUnmounted(() => {
      if (timerInterval) {
        clearInterval(timerInterval)
        timerInterval = null
      }
    })

    const handleStart = () => store.startTimer()
    const handlePause = () => store.pauseTimer()
    const handleReset = () => store.resetTimer()

    return {
      store,
      formattedTime,
      totalCostFormatted,
      smAndDown,
      handleStart,
      handlePause,
      handleReset
    }
  }
}
</script>

<style scoped>
/* Einfache Tabelle (falls nicht via <v-data-table>) */
.participants-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

.participants-table th,
.participants-table td {
  border-bottom: 1px solid #eee;
  padding: 8px;
  text-align: left;
}

.participants-table th {
  background-color: #fafafa;
}
</style>
