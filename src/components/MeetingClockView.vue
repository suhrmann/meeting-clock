<template>
  <v-app>
    <v-main>
      <v-container class="py-0">
        <!-- Timer-Bereich -->
        <v-row justify="center">
          <v-col>
            <v-card outlined>
              <v-card-title class="d-flex flex-column align-center">

                <!-- Kosten-Anzeige -->
                <div class="mt-6 ">
                  <span class="text-h4">
                    Aktuelle Kosten:
                  </span>
                  <span class="text-h4 text-red font-weight-bold">
                    {{ totalCostFormatted }} €
                  </span>
                </div>

                <!-- Timer-Anzeige -->
                <div class="text-h5 my-3">{{ formattedTime }}</div>

                <!-- Buttons -->
                <div>
                  <v-btn
                    color="success"
                    class="mr-5"
                    size="large"
                    :disabled="store.isRunning"
                    @click="handleStart"
                  >
                    {{ !store.isRunning && store.elapsedSeconds == 0 ? 'Start' : 'Continue' }}
                  </v-btn>
                  <v-btn
                    color="warning"
                    class="mr-5"
                    size="large"
                    :disabled="!store.isRunning"
                    @click="handlePause"
                  >
                    Pause
                  </v-btn>
                  <v-btn
                    color="error"
                    size="large"
                    @click="handleReset"
                  >
                    Reset
                  </v-btn>
                </div>

              </v-card-title>
            </v-card>
          </v-col>
        </v-row>

        <!-- Teilnehmerliste -->
        <v-row justify="center" class="mt-6">
          <v-col>
            <v-card outlined>
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
                        <!-- Eingruppierung als v-select -->
                        <v-select
                          :items="Object.keys(store.monthlySalaries)"
                          v-model="p.category"
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
                <v-btn color="primary" variant="flat" @click="store.addParticipant">
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

export default {
  setup() {
    const store = useMeetingStore()

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
