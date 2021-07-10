import React from "react";
import "./style.css";
import Product from "./Product";
import {
    useQuery,
    gql
} from "@apollo/client";

const clothesCategoryQuery = gql`query GetCategoryProducts{
    category(input:{
        title: "clothes",
    }){
        products{
            prices{
                currency
                amount
            },
            gallery,
            id,
            inStock
        }
    }
}`

const techCategoryQuery = gql`query GetCategoryProducts{
    category(input:{
        title: "tech",
    }){
        products{
            prices{
                currency
                amount
            },
            gallery,
            id,
            inStock
        }
    }
}`

const GetCategoryProducts = (props)=>{
    const {loading, error, data} = useQuery(props.category === "Clothes" ? clothesCategoryQuery : techCategoryQuery)


    if(loading) return <p>Loading...</p>
    if(error) return <p>Error...</p>

    var Products = []
    data.category.products.forEach((product)=>{
        Products.push(<Product image={product.gallery[0]} name={product.id} prices={product.prices} key={product.id} currentCurrency={props.currentCurrency} changePageToProduct={props.changePageToProduct} category={props.category}/>)
    })

    document.querySelector("#catalog-container").style.opacity = "1"

    return Products
}

const Catalog = (props)=>{

    // window.location.hash="catalog"
    // window.location.search=""

    return(<>
        <section id="page-catalog">
            <button className="button" id="category-button" onClick={()=>{props.changeCategory()}}>{props.currentCategory}</button>
            <section id="catalog-container">
                <GetCategoryProducts category={props.currentCategory} currentCurrency={props.currentCurrency} changePageToProduct={props.changePageToProduct}/>
            </section>
        </section>
    </>);
}

export default Catalog