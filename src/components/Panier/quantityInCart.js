'use client';
import { updatedCartItems } from '@/redux/panier/panierSlice';
import {useDispatch} from 'react-redux';
import styles from '../../styles/global/Global.module.scss';

const QuantityInCart = ({ product, onQuantityChange }) => {
  const dispatch = useDispatch()

  const handleIncrement = () => {
    onQuantityChange(product.id, product.quantity + 1);
    dispatch(updatedCartItems({id: product.id, quantity: product.quantity + 1}));
  };

  const handleDecrement = () => {
    if (product.quantity > 0) {
      onQuantityChange(product.id, product.quantity - 1);
      dispatch(updatedCartItems({id: product.id, quantity: product.quantity - 1}));
    }
  };

  return (
    <div className={`${styles["action"]} ${styles["action-cart"]}`}>
        <div className="mb-1">Nbre : <span style={{fontWeight: 'bold'}}>{product.quantity}</span></div>
        <div className={`${styles["btn-action-wrapper"]} mb-1`}>
          <button className="btn" onClick={handleDecrement}>-</button>
          <span>&nbsp;&nbsp;</span>
          <button className="btn" onClick={handleIncrement}>+</button>
        </div>
    </div>
  );
}

export default QuantityInCart
