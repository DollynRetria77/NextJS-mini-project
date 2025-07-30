'use client';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { deleteCartItem, deleteAllItem} from '@/redux/panier/panierSlice';
import QuantityInCart from './quantityInCart';
import styles from '../../styles/global/Global.module.scss';
import Image from 'next/image';
import shopping from '../../../public/assets/images/shopping-cart.png';

const Panier = () => {
  const [isActiveCart, setIsActiveCart] = useState(false);
  const [carts, setCarts] = useState([]);
  let cart = useSelector(state => state.panierSlice.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const cartsPerVendeur = groupByUserId(cart)
    setCarts([...cartsPerVendeur]);
    cart.length == 0 && setIsActiveCart(false);
  }, [cart]);

  //fonction qui regroupe le panier par vendeur
  const groupByUserId = (allProductsInCarts) => {
    let groupedItems = {};
    
    allProductsInCarts.forEach(item => {
      const vendeurId= item.id_vendeur;
      const vendeurName = item.nom_vendeur;
      const related_product = {
        id: item.id, 
        title: item.title, 
        image: item.image, 
        price: item.price, 
        quantity: item.quantity
      }
      if (!groupedItems[vendeurId]) {
        groupedItems[vendeurId] = { name: vendeurName, products: [related_product] };
      } else {
        groupedItems[vendeurId].products.push(related_product);
      }
    });
    return Object.values(groupedItems);
  }
  //end function qui regroupe le panier par vendeur

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedProducts = carts.map((element) => {
          const productPerVendeur = element.products.map((product) => {
            return product.id === productId ? { ...product, quantity: newQuantity } : product
          })
          return {name: element.name, products: [...productPerVendeur]}
    });
    setCarts(updatedProducts);
  };  


  let prixTotal = 0;
  const displayCart = carts.map((element, index) => {
    let total = 0;
    for(let i=0; i < element.products.length; i++){
      total += (element.products[i].price * element.products[i].quantity);
    }

    prixTotal += total;

    let listingProduct = element.products.map((item, index) => {
      const src = `https://akata-marketplace.goavana.com${item.image.url}`;
      const picture = item.image !== '' ? (
        <div className={`${styles["ppvi-image"]}`}>
          <Image loader={() => src} src={src} width={175} height={175} alt={item.image.alt} />
        </div>
      ) : (
        <div className={`${styles["ppvi-image"]} ${styles["no-image"]}`}>
          No image
        </div>
      )

      const price = item.price * item.quantity;

      return (
        <div className={`${styles["product-par-vendeur-item"]}`} key={index}>
          {picture}
          <div className={`${styles["ppvi-infos"]}`}>
            <div className={`${styles["ppvi-infos-title"]}`}>{item.title}</div>
            <div className={`${styles["ppvi-infos-prix"]}`}>Prix : {price.toLocaleString('en-US')} Ar</div>
            <QuantityInCart key={item.id} product={item} onQuantityChange={handleQuantityChange} />

            <button onClick={() => dispatch(deleteCartItem(item.id))} className="btn btn-danger">delete</button>
          </div>
        </div>
      )
    })

    return (
      <div key={index} className={`${styles["product-par-vendeur"]}`}>
          <strong>Commande auprès de: {element.name}, Total: {total.toLocaleString('en-US')} Ar </strong>
          {listingProduct}
      </div>
    )
  })

  const buttonCustom = (
    <>
      <button 
        className={`${styles["btn-cart"]}`}
        onClick={() => setIsActiveCart(!isActiveCart)}
      >
        <span><Image src={shopping} width="12" height="12" alt="cart" /></span>
        <span className={`${styles["nombre"]}`}>{cart.length}</span>
      </button>
    </>
  )

  const displayCartWrapper = (
    <div className={`${styles["panier-wrapper"]}`}>
        {cart.length > 0 ? 
          <span>Montant total à payer : {prixTotal.toLocaleString('en-US')} Ar </span> :
          <span>Le panier est vide</span>
        }
        {/* call display Cart */}
        {displayCart}
        {/* end call display cart */}
        {cart.length > 0 && <div className="mt-2"><button onClick={() => dispatch(deleteAllItem())} className="btn btn-warning">Vider le panier</button></div>}
    </div>
  )

  return (
    <>
      {buttonCustom}
      {isActiveCart && displayCartWrapper}
    </>
  )
}

export default Panier

