export async function getPokemon(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
}

export async function getDebilidades(tipos) {
  const datos = await Promise.all(
    tipos.map(t => fetch(t.type.url).then(r => r.json()))
  )
  const nombres = new Set()
  datos.forEach(d => {
    d.damage_relations.double_damage_from.forEach(x => nombres.add(x.name))
  })
  return [...nombres]
}
