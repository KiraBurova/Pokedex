import { decorate, observable, runInAction, action, computed } from 'mobx';
class PokemonsStore {
  pokemons = [];
  selectedPokemon = {};
  pokemonAbilities = [];
  loading = false;
  error = false;
  count = 0;

  get pokemonsRows() {
    // return [1,2,3,4,5,6,7,8] => [ [1, 2, 3, 4], [5, 6, 7, 8 ] ]
    //amount of rows needed to fir all the elements
    const amountOfRows = [...Array(Math.ceil(this.pokemons.length / 4))];
    // chunk the products into the array of rows
    const rows = amountOfRows.map((row, index) => this.pokemons.slice(index * 4, index * 4 + 4));
    return rows;
  }

  getPokemonInfo = (pokemonId) => {
    this.pokemonAbilities = [];
    this.selectedPokemon = this.pokemons.find(({ id }) => id === pokemonId);
    this.loading = true;
    this.selectedPokemon.abilities.forEach((ability) =>
      this.fetchPokemonAbilities(ability.ability.url),
    );
  };

  fetchPokemonAbilities = async (url) => {
    const result = await fetch(url);
    const data = await result.json();

    runInAction(() => {
      this.pokemonAbilities.push(data);
      this.loading = false;
      console.log(13);
    });
    try {
    } catch (error) {
      this.error = true;
      this.loading = false;
    }
  };

  fetchPokemons = async (offset = 0, pageSize = 0) => {
    this.loading = true;
    try {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}`);
      const data = await result.json();
      const pokemons = data.results;
      const count = data.count;

      runInAction(() => {
        this.count = count;
        this.error = false;
      });

      pokemons.forEach((pokemon) => this.fetchPokemon(pokemon.url, pageSize));
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.error = true;
      });
    }
  };

  fetchPokemon = async (url, pageSize) => {
    try {
      const result = await fetch(url);
      const data = await result.json();

      runInAction(() => {
        if (this.pokemons.length >= pageSize && pageSize) {
          this.pokemons = [];
        }
        this.pokemons.push(data);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.error = true;
      });
    }
  };
}

export default decorate(PokemonsStore, {
  pokemons: observable,
  loading: observable,
  error: observable,
  count: observable,
  pokemonAbilities: observable,
  selectedPokemon: observable,
  fetchPokemons: action,
  searchPokemons: action,
  pokemonsRows: computed,
  pokemonInfo: action,
});
