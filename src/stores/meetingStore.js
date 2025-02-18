import { defineStore } from 'pinia'

import { allSalaryTables } from './salaryTables.js'
import { HOURS_PER_MONTH } from "@/stores/settings.js";

export const useMeetingStore = defineStore('meeting', {
  state: () => ({
    /*
     * All monthly salaries of BY.
     */
    monthlySalaries: allSalaryTables(),

    // Liste der Teilnehmer/innen
    participants: [
      // fill with meeting participants
    ],

    // Timer-Status
    isRunning: false,
    elapsedMs: 0,        // Gesamtzeit in Millisekunden
    lastTimestamp: null  // Zeitpunkt des letzten "Start"/"Resume"
  }),

  getters: {
    // umgerechnete Stundenlöhne (auf Basis von Arbeitsstunden/Monat)
    hourlyRates(state) {
      // Aus monthlySalaries -> pro Eintrag in Stunde umrechnen
      const result = {}
      for (const [cat, monthly] of Object.entries(state.monthlySalaries)) {
        result[cat] = monthly / HOURS_PER_MONTH
      }
      return result
    },

    // Dauer in Sekunden
    elapsedSeconds: (state) => state.elapsedMs / 1000,

    // Kosten pro Sekunde
    costPerSecond(state) {
      /*
        1) Summiere pro Teilnehmer (Teilnehmeranzahl x Stundenlohn) -> "Summe pro Stunde"
        2) Teile durch 3600 -> "Summe pro Sekunde"
      */
      let sumPerHour = 0
      for (const participant of state.participants) {
        const hourlyRate = this.hourlyRates[participant.category] || 0
        sumPerHour += (hourlyRate * participant.count)
      }

      // sumPerHour => Euro/Stunde
      // costPerSecond => Euro/Sekunde
      return sumPerHour / 3600
    },

    // Aktueller Meetingpreis in €
    totalCost() {
      return this.costPerSecond * this.elapsedSeconds
    }
  },

  actions: {
    // Teilnehmer hinzufügen/entfernen
    addParticipant() {
      this.participants.push({
        category: Object.keys(this.monthlySalaries)[0],  // add first selected salary
        count: 1
      })
    },
    removeParticipant(index) {
      this.participants.splice(index, 1)
    },

    // Timer-Methoden
    startTimer() {
      if (!this.isRunning) {
        this.isRunning = true
        this.lastTimestamp = Date.now()
      }
    },
    pauseTimer() {
      if (this.isRunning) {
        const now = Date.now()
        this.elapsedMs += (now - this.lastTimestamp)
        this.isRunning = false
        this.lastTimestamp = null
      }
    },
    resetTimer() {
      this.isRunning = false
      this.elapsedMs = 0
      this.lastTimestamp = null
    },

    // Wird z.B. pro Sekunde getriggert, wenn Timer läuft
    updateTimer() {
      if (this.isRunning && this.lastTimestamp !== null) {
        const now = Date.now()
        this.elapsedMs += (now - this.lastTimestamp)
        this.lastTimestamp = now
      }
    }
  }
})
