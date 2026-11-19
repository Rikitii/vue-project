<script setup>
import {ref, computed, onBeforeMount, on} from "vue";
import {getPokemon} from "./api/pokeapi.js";

let loading = ref(true)
let pokemon = ref({})

const precio = ref(20)
const cantidad = ref(5)

const contador = ref(1)
const total = computed(()=> precio.value * cantidad.value)

function totalProductos(){
  console.log("calculando total de productos")
  return precio.value * cantidad.value}
</script>

<template>
  <input type="number" v-model="cantidad">
  <p>{{ total }}</p>
  <p>{{ totalProductos() }}</p>

  <button @click="contador++">Incrementar</button>
  <p>contador= {{ contador }}</p>
</template>