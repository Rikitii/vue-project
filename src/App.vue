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
  pokemon.value = await getPokemon(70)
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
      <div>

      </div>
    </div>
  </div>

</template>
