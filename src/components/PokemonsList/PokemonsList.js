import React, { useEffect } from 'react';

import { useStores } from '../../hooks/use-stores';
import { Card, Tag, Row, Col, Avatar, Descriptions } from 'antd';
import { observer } from 'mobx-react-lite';

const PokemonsList = observer(() => {
  const { pokemonsStore } = useStores();
  const pokemons = pokemonsStore.pokemons;

  useEffect(() => {
    pokemonsStore.fetchPokemons();
  }, [pokemons, pokemonsStore]);
  return (
    <div style={{ margin: '0 auto' }}>
      {pokemons &&
        pokemons.map((pokemon, index) => {
          return (
            <Row>
              <Col span={6}>
                <Card>
                  <Card.Meta
                    title={pokemon.name}
                    avatar={
                      <Avatar size={90} src={pokemon.sprites && pokemon.sprites.front_default} />
                    }
                  />
                  <Descriptions column={1}>
                    <Descriptions.Item label='Pokemon height'>{pokemon.height}</Descriptions.Item>
                    <Descriptions.Item label='Pokemon weight'>{pokemon.weight}</Descriptions.Item>
                  </Descriptions>
                  {pokemon.types && pokemon.types.map((type) => <Tag>{type.type.name}</Tag>)}
                </Card>
              </Col>
            </Row>
          );
        })}
    </div>
  );
});

export default PokemonsList;
