import {Input,Typography} from '@material-tailwind/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { PokemonCard } from './components/PokemonCard';


function App() {


  const [selected, setSelected] = useState('');//Es la categoria o tipo de pokemon a mostrar
  const [urlCategories, setUrlCategories] = useState('');//URL de endpoint para consultar pokemones segun categoria seleccionada
  

  const [filteredItems, setFilteredItems] = useState([]);//Almacena los items que se filtren, de acuerdo al buscador
  const [categories, setCategories] = useState([]);//Almacena las categorias que existen de pokemons
  const [pokemons, setPokemons] = useState([]);//Almacena los pokemones segun el categoria seleccionada


  const getCategoriesPokemons = async () => {//Obtener categorias de pokemon
    const {data} = await axios.get('https://pokeapi.co/api/v2/type/')
    setCategories(data.results)
  }
  useEffect(() => //Hacer consulta para obtener categorias
  { 
    getCategoriesPokemons()
  },[])


  async function getPokemonByCategory(urlCategories)
  {
    const {data} = await axios.get(urlCategories)//Obtenemos los pokemones que pertenecen a la categoria seleccionada
    setPokemons(data.pokemon)//Le asignamos los pokemones al estado pokemons
    setFilteredItems(data.pokemon)//here
  }
  useEffect(()=>{
    setPokemons([])
    setFilteredItems([])//here
    setUrlCategories('')
    getPokemonByCategory(urlCategories)
  },[selected])


  
  function search(searchTxt)//Funcion para buscar pokemon
  {
    if(searchTxt == '')
      {
        setFilteredItems(pokemons)
      }
      else
      {
        setFilteredItems(pokemons.filter( ({pokemon}) => 
        {
          return pokemon.name.toLowerCase().includes(searchTxt.toLowerCase())
        }))
      }
  }


  return (
    <>
      <header className='header-content padding'>
        <img src="./logo.png" alt="pokeApi" style={{width:'100px'}}/>
        <div className="w-auto">
          <Input key={1} onChange={e => search(e.target.value)} label="Search pokemon" icon={<IoSearch/>} color='blue' />
        </div>
      </header>
      <nav className='navbar-content padding'>
        {
          categories.map((category,id) => (
            <button onClick={e => {setSelected(category.name); setUrlCategories(category.url)}} className={`btn-navbar ${selected == category.name ? 'btn-selected' : ''}`} key={id}>{category.name}</button>
          ))
        }
      </nav>
      <main className='main-content'>
        {
          filteredItems ? 
          <>
            {
              filteredItems.map(({pokemon},id) => (
                id < 20 ? <PokemonCard key={id} name={pokemon.name} url={pokemon.url}/> : <></>
              )) 
            }
          </>
          :<></>
        }
      </main>
    </>
  )
}

export default App
