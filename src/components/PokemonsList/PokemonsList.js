import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';

import { Row, Col, Spin } from 'antd';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../hooks/use-stores';

import PokemonCard from '../PokemonCard';
import PokemonModal from '../PokemonModal';

import styles from './PokemonsList.module.scss';

const PokemonsList = observer(() => {
  const { pokemonsStore } = useStores();
  const pokemonsRows = pokemonsStore.pokemonsRows;
  const getPokemonInfo = pokemonsStore.getPokemonInfo;
  const selectedPokemon = pokemonsStore.selectedPokemon;
  const loadingList = pokemonsStore.loadingState.pokemonList;
  const loadingDetails = pokemonsStore.loadingState.pokemonDetails;
  const pokemonAbilities = pokemonsStore.pokemonAbilities;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    pokemonsStore.fetchPokemons();
  }, [pokemonsStore]);

  const selectPokemon = (id) => {
    setVisible(true);
    getPokemonInfo(id);
  };

  return (
    <div className={styles.rowsHolder}>
      <Spin size='large' spinning={loadingList}>
        {pokemonsRows &&
          pokemonsRows.map((row, index) => {
            return (
              <Row key={index} gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]} justify='center'>
                {row.map((pokemon) => {
                  return (
                    <Col span={5} key={pokemon.id} onClick={() => selectPokemon(pokemon.id)}>
                      <PokemonCard pokemon={pokemon} />
                    </Col>
                  );
                })}
              </Row>
            );
          })}
        <PokemonModal
          setVisible={setVisible}
          visible={visible}
          selectedPokemon={selectedPokemon}
          pokemonAbilities={pokemonAbilities}
          loading={loadingDetails}
        />
      </Spin>
    </div>
  );
});

export default PokemonsList;
