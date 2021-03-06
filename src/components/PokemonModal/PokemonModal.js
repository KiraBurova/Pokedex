import React from 'react';

import { observer } from 'mobx-react-lite';

import PropTypes from 'prop-types';

import { Modal, Typography, Spin } from 'antd';

import styles from './PokemonModal.module.scss';

const PokemonModal = observer(
  ({ selectedPokemon, pokemonAbilities, setVisible, visible, loading }) => {
    const handleCancel = () => {
      setVisible(false);
    };

    const ModalTitle = (
      <Typography.Title level={3} className={styles.title}>
        {selectedPokemon.name}
      </Typography.Title>
    );

    return (
      <Modal visible={visible} title={ModalTitle} footer={null} onCancel={handleCancel}>
        <Spin spinning={loading}>
          <img
            src={selectedPokemon.sprites && selectedPokemon.sprites.front_default}
            alt='Poekmon'
          />
          {pokemonAbilities &&
            pokemonAbilities.map((ability) => (
              <div key={ability.id}>
                <Typography.Text mark strong className={styles.abilityName}>
                  {ability.name}
                </Typography.Text>
                {ability.effect_entries.map(
                  (entry, index) =>
                    entry.language.name === 'en' && (
                      <Typography.Text key={index}>{entry.effect}</Typography.Text>
                    ),
                )}
              </div>
            ))}
        </Spin>
      </Modal>
    );
  },
);

PokemonModal.propTypes = {
  selectedPokemon: PropTypes.object.isRequired,
  pokemonAbilities: PropTypes.array.isRequired,
  setVisible: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PokemonModal;
