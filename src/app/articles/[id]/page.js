'use client';
import styles from '../../../styles/global/Global.module.scss';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "@/redux/panier/panierSlice";
import DetailArticle from '@/components/Articles/DetailArticle';

export async function generateStaticParams() {
    const data = await fetch('https://akata-marketplace.goavana.com/products?_start=0&_limit=10&_sort=created_at:desc').then((res) => res.json());

    return data.map((dataItem) => ({
        id: dataItem.id.toString()
    }));
}

async function getData(){
    const res = await fetch('https://akata-marketplace.goavana.com/products?_start=0&_limit=10&_sort=created_at:desc');
    // Recommendation: handle errors
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

const Page = ({ params }) => {
    const { id } = params;
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();

    const addToCartItem = (object) => {
        dispatch(addCartItem(object))
    }

    useEffect(() => {
        async function fetchData() {
            const data = await getData();
            const dataFilter = data.find(item => item.id == id);
            setProduct(dataFilter);
        }
        fetchData();
    }, [id])

    const details = !product ? (
        <div className="container"><p>Loading ....</p></div>
    ) : (
        (() => {
            let id = product.id;
            let displayImage = product.image == null ? '' : {url:product.image.url, alt:product.image.alternativeText};
            let title = product.title;
            let description = product.description;
            let price = product.price;
            let id_vendeur = product.users_id.id;
            let nom_vendeur =product.users_id.name;
            let infosProduct = {
                id,
                displayImage,
                title,
                description,
                price,
                id_vendeur,
                nom_vendeur
            }
            return (
                <DetailArticle 
                    product={infosProduct}
                    onAddToCart={addToCartItem}
                />
            )
        })()
    )

    return (
        <div className={`${styles["article-details-wrapper"]}`}>{details}</div>    
     )
}
export default Page;

