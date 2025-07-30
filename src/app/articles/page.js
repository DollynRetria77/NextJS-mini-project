'use client';
import styles from '../../styles/global/Global.module.scss';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Articles from '@/components/Articles/Articles';
import { useDispatch } from 'react-redux';
import { addCartItem } from '@/redux/panier/panierSlice';

const Page = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const res = await getData();
      setData(res)
    }
    fetchData();
  }, []);

  const addToCartItem = (object) => {
    dispatch(addCartItem(object))
  }

  const displayData = !data ? (<p>Loading...</p>) : data.map((article) => {
    let id = article.id;
    let displayImage = article.image == null ? '' : {url: article.image.url, alt: article.image.arternativeText}
    let title = article.title;
    let description = article.description;
    let price = article.price;
    let id_vendeur = article.users_id.id;
    let nom_vendeur = article.users_id.name;

    let product = {
      id, 
      displayImage, 
      title, 
      description,
      price, 
      id_vendeur, 
      nom_vendeur
    }

    return (
      <Articles 
          key={uuidv4()}
          product={product}
           onAddToCart={addToCartItem}
      />
    )
  })

  return (
    <div className={`${styles["articles-wrapper"]}`}>
      <div className="container">
          <div className="row">
              <div className="col-12"><h2>Tous les articles disponibles</h2></div>
          </div>
      </div>
      <div className="container">
          <div className="row">
              {displayData}
          </div>
      </div>
    </div>
  )
}

export default Page

async function getData(){
    const res = await fetch('https://akata-marketplace.goavana.com/products?_start=0&_limit=10&_sort=created_at:desc');

    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }

    return res.json();
}
