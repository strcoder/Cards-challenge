import React from 'react';
import Modal from '../Modal';
import Character from '../Character';
import Technology from '../Technology';
import HeadQuarter from '../HeadQuarter';
import './styles.scss';

const CardModal = ({ card, showModal, OnCloseModal }) => {
  return (
    <Modal
      show={showModal}
      onClose={OnCloseModal}
      className={card?.Faction}
    >
      <div className='CardModal'>
        {card?.CardType === 'HQ' && (
          <HeadQuarter card={card} animation='bounceIn' />
        )}
        {card?.CardType === 'Character' && (
          <Character card={card} animation='bounceIn' />
        )}
        {card?.CardType === 'Technology' && (
          <Technology card={card} animation='bounceIn' />
        )}
      </div>
    </Modal>
  );
};

export default CardModal;
