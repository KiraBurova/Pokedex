import React from 'react';

import PokemonsStore from '../stores/pokemonsStore';

export const storesContext = React.createContext({
  pokemonsStore: new PokemonsStore(),
});
