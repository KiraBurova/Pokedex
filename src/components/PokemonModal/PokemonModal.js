import React from 'react';

import { observer } from 'mobx-react-lite';

import PropTypes from 'prop-types';

import { Modal } from 'antd';

const PokemonModal = observer(({ selectedPokemon, pokemonAbilities, setVisible, visible }) => {
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal visible={visible} title={selectedPokemon.name} footer={null} onCancel={handleCancel}>
      <img src={selectedPokemon.sprites && selectedPokemon.sprites.front_default} alt='Poekmon' />
      {pokemonAbilities &&
        pokemonAbilities.map((ability) => (
          <div>
            {ability.name}
            {ability.effect_entries.map(
              (entry) => entry.language.name === 'en' && <div>{entry.effect}</div>,
            )}
          </div>
        ))}
    </Modal>
  );
});

PokemonModal.propTypes = {
  selectedPokemon: PropTypes.object.isRequired,
  pokemonAbilities: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default PokemonModal;
