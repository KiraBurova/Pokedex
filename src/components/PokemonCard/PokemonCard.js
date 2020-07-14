import React from 'react';

import { Card, Tag, Avatar, Descriptions } from 'antd';

import { getColorsForTag } from '../../helpers/helpers';

import styles from './PokemonCard.module.scss';

const PokemonCard = ({ pokemon }) => {
  return (
    <Card className={styles.card}>
      <Card.Meta
        className={styles.cardTitle}
        title={pokemon.name}
        avatar={<Avatar size={90} src={pokemon.sprites && pokemon.sprites.front_default} />}
      />
      <Descriptions column={1}>
        <Descriptions.Item label='Pokemon height'>{pokemon.height}</Descriptions.Item>
        <Descriptions.Item label='Pokemon weight'>{pokemon.weight}</Descriptions.Item>
      </Descriptions>
      {pokemon.types &&
        pokemon.types.map((type, index) => (
          <Tag key={index} color={getColorsForTag(type.type.name)}>
            {type.type.name}
          </Tag>
        ))}
    </Card>
  );
};

export default PokemonCard;
