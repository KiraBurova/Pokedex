import React from 'react';

import { Card, Tag, Avatar, Descriptions } from 'antd';

const PokemonCard = ({ pokemon }) => {
  return (
    <Card>
      <Card.Meta
        title={pokemon.name}
        avatar={<Avatar size={90} src={pokemon.sprites && pokemon.sprites.front_default} />}
      />
      <Descriptions column={1}>
        <Descriptions.Item label='Pokemon height'>{pokemon.height}</Descriptions.Item>
        <Descriptions.Item label='Pokemon weight'>{pokemon.weight}</Descriptions.Item>
      </Descriptions>
      {pokemon.types && pokemon.types.map((type) => <Tag>{type.type.name}</Tag>)}
    </Card>
  );
};

export default PokemonCard;
