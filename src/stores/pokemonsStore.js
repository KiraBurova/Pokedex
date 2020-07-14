import { decorate, observable, runInAction, action, computed } from 'mobx';

class PokemonsStore {
  pokemons = [];
  pokemon = {};
  loading = false;
  error = false;
  count = 0;

  async fetchPokemons(limit = 20) {
    this.loading = true;
    try {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
      const data = await result.json();
      const pokemons = data.results;
      const count = data.count;

      runInAction(() => {
        this.loading = false;
        this.count = count;
        this.error = false;
      });

      pokemons.forEach((pokemon) => this.fetchPokemon(pokemon.url));
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.error = true;
      });
    }
  }
  async fetchPokemon(url) {
    try {
      const result = await fetch(url);
      const data = await result.json();

      runInAction(() => {
        this.pokemons.push(data);
      });
    } catch (error) {
      runInAction(() => {
        this.loading = false;
        this.error = true;
      });
    }
  }
}

export default decorate(PokemonsStore, {
  pokemons: observable,
  pokemon: observable,
  loading: observable,
  error: observable,
  count: observable,
  fetchPokemons: action,
});
