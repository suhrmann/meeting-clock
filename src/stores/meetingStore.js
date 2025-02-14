import { defineStore } from 'pinia'

import { monthlySalaryTables } from './salaryTables.js'

export const useMeetingStore = defineStore('meeting', {
  state: () => ({
    /*
     * Map one "monthly salary table" to this variable.
     */
    monthlySalaries: monthlySalaryTables.monthlySalariesTVL.entgelte,

    /*
     * Salary tables.
     */
    monthlySalaryTables: {
      /**
       * Monatsentgelte TV-L 2025 für Stufe 1
       */
      monthlySalariesTVL: {
        'title': 'Entgelttabelle TV-L 2025',
        'source': 'https://oeffentlicher-dienst.info/c/t/rechner/tv-l/allg?id=tv-l-2025&matrix=1',
        'entgelte': {
          'E1 (Stufe 2)': 2434.49,
          'E2 (Stufe 1)': 2642.84,
          'E3 (Stufe 1)': 2815.57,
          'E4 (Stufe 1)': 2849.24,
          'E5 (Stufe 1)': 2973.97,
          'E6 (Stufe 1)': 3135.83,
          'E7 (Stufe 1)': 3135.83,
          'E8 (Stufe 1)': 3319.52,
          'E9a (Stufe 1)': 3520.10,
          'E9b (Stufe 1)': 3520.10,
          'E10 (Stufe 1)': 3928.42,
          'E11 (Stufe 1)': 4064.54,
          'E12 (Stufe 1)': 4193.48,
          'E13 (Stufe 1)': 4629.74,
          'E14 (Stufe 1)': 5003.49,
          'E15 (Stufe 1)': 5504.26,
        },
      },

      /**
       * Beamtenbesoldung Bayern 2025 - Besoldungsordnung A
       */
      monthlySalariesBeamteBY_A: {
        'title': 'Beamtenbesoldung Bayern 2025 - Besoldungsordnung A (erste Stufe)',
        'source': 'https://oeffentlicher-dienst.info/c/t/rechner/tv-l/allg?id=tv-l-2025&matrix=1',
        'entgelte': {
          'A3 (Stufe 1)': 2784.00,
          'A4 (Stufe 2)': 2853.40,
          'A5 (Stufe 2)': 2889.32,
          'A6 (Stufe 2)': 2960.92,
          'A7 (Stufe 2)': 3074.21,
          'A8 (Stufe 2)': 3150.76,
          'A9 (Stufe 2)': 3294.99,
          'A10 (Stufe 2)': 3537.12,
          'A11 (Stufe 3)': 4045.29,
          'A12 (Stufe 4)': 4527.30,
          'A13 (Stufe 5)': 5247.58,
          'A14 (Stufe 5)': 5612.74,
          'A15 (Stufe 6)': 6445.94,
          'A16 (Stufe 6)': 7104.54
        },
      },
    },

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
    // umgerechnete Stundenlöhne (auf Basis ~172 Arbeitsstunden/Monat)
    hourlyRates(state) {
      const hoursPerMonth = 172 // hier ggf. anpassen

      // Aus monthlySalaries -> pro Eintrag in Stunde umrechnen
      const result = {}
      for (const [cat, monthly] of Object.entries(state.monthlySalaries)) {
        result[cat] = monthly / hoursPerMonth
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
