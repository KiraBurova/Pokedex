import React from 'react';

import PropTypes from 'prop-types';

import { Card, Tag, Avatar, Descriptions } from 'antd';

import { getColorsForTag } from '../../helpers/helpers';

import styles from './PokemonCard.module.scss';
import { observer } from 'mobx-react-lite';

const PokemonCard = observer(({ pokemon }) => {
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
});

PokemonCard.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    types: PropTypes.array.isRequired,
    sprites: PropTypes.object.isRequired,
  }).isRequired,
};

export default PokemonCard;
