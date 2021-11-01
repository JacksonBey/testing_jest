import React,{useState,useEffect,useMemo} from 'react'

const PokemonContainer = () => {
  const [pokemon,setPokemon] = useState(null)
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  const [pokemonQuery,setPokemonQuery] = useState('')
  const [pokemonImageURL,setPokemonImageURL] = useState('')



  const fetchData = async () => {
    setLoading(true)
    // sanatize the query
    const sanatizedQuery = pokemonQuery.toLowerCase().trim()
    try {
      fetch(`https://pokeapi.co/api/v2/pokemon/${sanatizedQuery}`)
      .then(res => res.json())
      .then(data => {
        console.log('DATA: ', data)
        setPokemon(data)
        setLoading(false)
        setPokemonImageURL(`${data.sprites.front_default}`)
      }
      )
      //finds the image url from google images
      // const imageURL = await fetch(`https://www.google.com/search?q=${sanatizedQuery}+pokemon&tbm=isch&tbs=isz:m`)

    } catch (error) {
      console.log('ERROR: ', error)
      setError(error)
    }
  }

  useEffect(() => {

    fetchData()
  },[])


  return (
    <div style={{display:"flex", flexDirection:'column', width:"60%", padding:"30px"}}>

      <label for="pokemonQuery">Search for a pokemon </label>
    <input type="text" id="pokemonQuery" value={pokemonQuery} onChange={(e) => setPokemonQuery(e.target.value)}/>
    <button onClick={() => fetchData()}> Search</button>
      {loading ? 'Loading...' : pokemon.name}
      {error ? error.message : null}
      <button onClick={() => console.log('POKEMON: ', pokemon)}>pokemon?</button>
      <img src={pokemonImageURL}/>
    </div>
  )
}
export default PokemonContainer