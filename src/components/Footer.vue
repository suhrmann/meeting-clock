<template>
  <v-footer class="mt-5">
    <v-row justify="center" no-gutters>
      <FooterAbout />
      <FooterInformation />
      <v-btn
        v-for="link in links"
        :key="link"
        class="mx-2"
        rounded="xl"
        variant="text"
        size="small"
      >
        {{ link }}
      </v-btn>

      <v-col
        class="text-center mx-0"
        cols="12"
      >
        <div class="text-caption text-disabled">
          &copy; 2025 <span class="d-none d-sm-inline-block">Simon Uhrmann</span>
          <a
            class="text-decoration-none on-surface"
            href="https://github.com/suhrmann/meeting-clock/blob/main/LICENSE"
            rel="noopener noreferrer"
            target="_blank"
          >
            (MIT License)
          </a>
          <a
            href="https://github.com/suhrmann/meeting-clock"
            title="@suhrmann on GitHub"
            class="d-inline-block mx-2 social-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            <v-icon
              icon="mdi-github"
              size="20"
            />
          </a>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
  import FooterAbout from "@/components/FooterAbout.vue";
  import FooterInformation from "@/components/FooterInformation.vue";

  const links = []  // list of strings
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
