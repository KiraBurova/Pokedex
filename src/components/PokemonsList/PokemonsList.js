import React, { useEffect } from 'react';

import { Row, Col } from 'antd';
import { observer } from 'mobx-react-lite';

import { useStores } from '../../hooks/use-stores';

import PokemonCard from '../PokemonCard';

import styles from './PokemonsList.module.scss';

const PokemonsList = observer(() => {
  const { pokemonsStore } = useStores();
  const pokemons = pokemonsStore.pokemons;
  const pokemonsRows = pokemonsStore.pokemonsRows;

  useEffect(() => {
    pokemonsStore.fetchPokemons();
  }, [pokemons, pokemonsStore]);

  return (
    <div className={styles.rowsHolder}>
      {pokemonsRows &&
        pokemonsRows.map((row) => {
          return (
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 16]} justify='space-around'>
              {row.map((pokemon) => {
                return (
                  <Col span={5}>
                    <PokemonCard pokemon={pokemon} />
                  </Col>
                );
              })}
            </Row>
          );
        })}
    </div>
  );
});

export default PokemonsList;
