<script setup lang="ts">
import NavLink from '../components/NavLink.vue';
import Logo from '../components/Logo.vue';
</script>

<template>
  <div class="home">
    <p>Choose what kind of album entry you want to submit:</p>

    <nav class="link-grid">
      <NavLink
        route="/starship"
        title="Starship"
      />
      <NavLink
        route="/freighter"
        title="Freighter"
      />
      <NavLink
        route="/frigate"
        title="Organic Frigate"
      />
      <NavLink
        route="/multitool"
        title="Multi-Tool"
      />
      <NavLink
        route="/creature"
        title="Creature"
      />
      <NavLink
        route="/sandworm"
        title="Sandworm"
      />
      <NavLink
        route="/flora"
        title="Flora"
      />
      <NavLink
        route="/planet"
        title="Planet"
      />
      <NavLink
        route="/artifact"
        title="Artifact"
      />
    </nav>

    <p>
      A service of the Eisvana Wiki Scholars
      <!-- <a
        href="https://nomanssky.fandom.com/wiki/Galactic_Hub_Eissentam_Scribes"
        rel="noopener noreferrer"
        target="_blank"
        >Galactic Hub Eissentam Scribes</a
      > -->
    </p>

    <div class="logos">
      <Logo
        alt="Eisvana logo"
        href="https://nomanssky.fandom.com/wiki/Eisvana"
        src="https://static.wikia.nocookie.net/nomanssky_gamepedia/images/8/85/Eisvana_Logo.png"
      />
      <!--      <Logo
        alt="Galactic Hub Eissentam Scribes logo"
        href="https://nomanssky.fandom.com/wiki/Galactic_Hub_Eissentam_Scribes"
        src="https://static.wikia.nocookie.net/nomanssky_gamepedia/images/e/ea/EisHub_Scribe_logo.png"
      /> -->
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.logos {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 900px;
  font-size: 1.5rem;
  margin-inline: auto;
  margin-block: 3rem;
}
</style>
