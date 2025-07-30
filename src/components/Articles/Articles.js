'use client'
import Link from "next/link"
import { useState, useEffect } from "react"
import styles from '../../styles/global/Global.module.scss'
import Image from "next/image"
import {useSelector, useDispatch} from 'react-redux';
import { deleteCartItem } from "@/redux/panier/panierSlice";

const Articles = (props) => {
    const [toCart, setToCart] = useState(false);
    const [quantity, setQuantity] = useState(1);
    let cart = useSelector(state => state.panierSlice.product);
    const dispatch = useDispatch();

    useEffect(() => {
        if(cart.length > 0){
            let isInCart = false
            cart.forEach((element, index) => {
                if(element.id === props.product.id){
                    isInCart = true
                    setQuantity(element.quantity) 
                }
            })
            isInCart ? setToCart(true) : setToCart(false)
        }else{
            setToCart(false) 
        }
    }, [cart, props.product.id])

    const handleInputChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setQuantity(value);
    };
    
    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };
    
    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
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
        <div className={`${styles["img-wrapper"]} ${styles["no-image"]} `}>

        </div>
    ):(
        <div className={`${styles["img-wrapper"]} ${styles["with-image"]} `}>
            <Image src={src} width={512} height={512} alt="alt" style={{width: '100%', height:'100%'}} />
        </div>
    )
    const pricePerQuantity = props.product.price * (isNaN(parseInt(quantity, 10)) ? 1 : parseInt(quantity, 10));

    const button = toCart === false ? 
    (<button className="btn btn-success" onClick={handleAddToCart}>Ajouter au panier</button>) :
    (<button className="btn btn-warning" onClick={handleRemoveToCart}>Retirer du panier</button>)

    return (
        <div className="col-3">
            <div className={`card ${styles["card-article-item"]}`} style={{width: '100%'}}>
                <div className={`${styles["img-container"]}`} >
                    {image}
                    <div className={`${styles["btn-container"]}`}>
                        {button}
                    </div>
                </div>
                <div className={`${styles["card-body"]}`} >
                    <h5 className={`${styles["card-title"]}`} >{props.product.title}</h5>
                    <p className={`${styles["card-text"]}`} >{props.product.description}</p>
                    <div className={`${styles["voir-plus-btn"]}`}>
                        <Link href={`/articles/${props.product.id}`}>
                        Voir plus
                        </Link>
                    </div>
                    <div className={`${styles["price-and-action"]}`}>
                        <div className={`${styles["price"]}`}>
                            {parseInt(pricePerQuantity, 10).toLocaleString('en-US')} Ar
                        </div>
                        <div className={`${styles["action"]}`}>
                            <button className={`${styles["btn"]}`} onClick={handleDecrement}>-</button>
                            <input className={`${styles["form-control"]}`} type="text" id="quantity" name="quantity" value={isNaN(parseInt(quantity, 10)) ? 1 : parseInt(quantity, 10)} onChange={handleInputChange} />
                            <button className={`${styles["btn"]}`} onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Articles
