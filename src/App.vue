<script setup>
import { ref, onBeforeMount, onBeforeUpdate, onUnmounted, onMounted, onUpdated, onBeforeUnmount } from "vue";
import { getPokemon, getDebilidades } from "./api/pokeapi.js";


let loading = ref(true)
let pokemon = ref({})
let debilidades = ref([])

const iconosTipo = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '🥊',
  poison: '☠️',
  ground: '🌍',
  flying: '🦅',
  psychic: '🔮',
  bug: '🐛',
  rock: '🗿',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌙',
  steel: '⚙️',
  fairy: '✨',
}

onBeforeMount(() => {
  console.log("Aun no hay DOM")
})

onMounted(async () => {
  pokemon.value = await getPokemon(12)
  debilidades.value = await getDebilidades(pokemon.value.types)

  console.log(pokemon.value)
  console.log(debilidades.value)
  loading.value = false
})

onBeforeUpdate(() => {
  console.log("Antes de actualizar")
})

onUpdated(() => {
  console.log("Despues de actualizar")
})

onBeforeUnmount(() => {
  console.log("Antes de desmontar")
})

onUnmounted(() => {
  console.log("Despues de desmontar")
})

</script>

<template>
  <div>
    <div class="carta" :style="{'--pokemon-type':`var(--${pokemon.types?.[0]?.type?.name})`}">
      <div class="h2">
        <h2>{{ pokemon.name }}</h2>
        <h3>#{{ pokemon.id }}</h3>
      </div>

      <!-- div de imagen -->
      <div class="imagen">
        <img class="img" :src="pokemon.sprites?.front_default" :alt="pokemon.name">
      </div>

      <!-- div para peso y altura -->
      <div class="info">
        <div>
          <p>Altura: {{ pokemon.height / 10 }} M</p>
        </div>
        <div>
          <p>Peso: {{ pokemon.weight / 10 }} Kg</p>
        </div>
      </div>

      <!-- tipo -->
      <div>
        <div class="tipo">
          <p>Tipo:</p>
          <p v-for="t in pokemon.types" :key="t.type.name">{{ iconosTipo[t.type.name] }} {{ t.type.name }}</p>
        </div>
      </div>

      <!-- debilidades -->
      <div class="debilidades">
        <span>Debilidades: </span>
        <div>
          <span v-for="d in debilidades" :key="d">{{ iconosTipo[d] }} {{ d }}</span>
        </div>
      </div>

    </div>
    <div>
      <!-- stats -->
      <div class="stats">
          <div class="estadisticas">
            <p>Vida: {{ pokemon?.stats?.[0]?.base_stat }}</p>
            <p>Ataque: {{ pokemon?.stats?.[1]?.base_stat }}</p>
            <p>Defensa: {{ pokemon.stats?.[2]?.base_stat }}</p>
            <p>Ataque Especial: {{ pokemon?.stats?.[3]?.base_stat }}</p>
            <p>Defensa Especial: {{ pokemon?.stats?.[4]?.base_stat }}</p>
            <p>Velocidad: {{ pokemon?.stats?.[5]?.base_stat }}</p>
          </div>
      </div>
    </div>
  </div>

</template>

<style lang="css">
:root{
  --normal: #ffffff;
  --fire: #f8ad3e;
  --water: #72a4ff;
  --grass: #0cff34d2;
  --electric: #e6e203e5;
  --ice: #00deee;
  --fighting: #ff5e00;
  --poison: #ff00eae8;
  --ground: #b48248;
  --flying: #00ffd5;
  --psychic: #ff0512e5;
  --bug: #098605;
  --rock: #5e5331;
  --ghost: #8400ff;
  --dragon: #1900fffa;
  --dark: #3a3a3a;
  --steel: #797979;
  --fairy: #fda1e2de;
}

.imagen {
  background-color: var(--pokemon-type);
}

</style>