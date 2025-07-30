'use client';

import React, {useState, useEffect} from 'react';
import styles from '../../styles/global/Global.module.scss';
import {useSelector, useDispatch} from 'react-redux';
import { deleteCartItem } from '@/redux/panier/panierSlice';
import Image from 'next/image';

const DetailArticle = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [toCart, setToCart] = useState(false);
    const dispatch = useDispatch();
    let cart = useSelector(state => state.panierSlice.product);

    useEffect(() => {
        if(cart.length > 0){
            let isInCart = false
            cart.forEach((element, index) => {
                if(element.id == props.product.id){
                    isInCart = true;
                    setQuantity(element.quantity);
                }
            })

            isInCart ? setToCart(true) : setToCart(false)
        }else{
            setToCart(false) 
        }
    }, [cart, props.product.id])

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuantity(value);
    };
    
    const handleIncrement = () => {
        setQuantity(parseInt(quantity, 10) + 1);
    };
    
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(parseInt(quantity, 10) - 1);
        }
    };
    
    const handleAddToCart = () => {
        const cartItem = {
            id: props.product.id, 
            title: props.product.title, 
            image: props.product.displayImage, 
            price: props.product.price, 
            id_vendeur: props.product.id_vendeur,
            nom_vendeur: props.product.nom_vendeur,
            quantity: quantity
        };
        props.onAddToCart(cartItem);
        setToCart(true);
    };
  
    const handleRemoveToCart = () => {
        dispatch(deleteCartItem(props.product.id));
        setToCart(false);
    }
  
    const src = `https://akata-marketplace.goavana.com${props.product.displayImage.url}`;
    const image = props.product.displayImage === '' ? (
        <div className={`${styles["img-wrapper"]} ${styles["no-image"]}`}>

        </div>
    ):(
        <div className={`${styles["img-wrapper"]} ${styles["with-image"]}`}>
            <Image loader={() => src} src={src} width={512} height={512} alt={props.product.displayImage.alt} style={{width: '100%', height:'100%'}} />
        </div>
    )
  
    const pricePerQuantity = props.product.price * (isNaN(parseInt(quantity, 10)) ? 1 : parseInt(quantity, 10));

    const button = toCart === false ? 
        (<button className="btn btn-success" onClick={handleAddToCart}>Ajouter au panier</button>) :
        (<button className="btn btn-warning" onClick={handleRemoveToCart}>Retirer du panier</button>)
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    {image}
                </div>
                <div className="col-8">
                    <h5 className={`mb-2 ${styles["card-title"]}`}>{props.product.title}</h5>
                    <p className={`mb-2 ${styles["card-text"]}`}>{props.product.description}</p>
                    <div className={`${styles["price-and-action"]}`}>
                      <div className={`mb-2 ${styles["price"]}`}>Prix : {pricePerQuantity.toLocaleString('en-US')} Ar</div>
                      <div className={`${styles["action"]}`}>
                          <button className={`${styles["btn"]}`} onClick={handleDecrement}>-</button>
                          <input className={`${styles["form-control"]}`} type="text" id="quantity" name="quantity" value={isNaN(parseInt(quantity, 10)) ? 1 : parseInt(quantity, 10)} onChange={handleInputChange} />
                          <button className={`${styles["btn"]}`} onClick={handleIncrement}>+</button>
                      </div>
                      <div className={`${styles["add-to-cart-btn"]}`}>
                        {button}
                      </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default DetailArticle

