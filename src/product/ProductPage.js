import React, {useState} from "react";

import './style.css'
import {
    useQuery,
    gql
} from "@apollo/client";

function beautifyName(name){
    //removes dashes from name, adds uppercase to first letter of each word
    var newName = name[0].toUpperCase()
    for(let i = 1 ; i < name.length ; i++){
        if(name[i] === '-' && i !== name.length-1){
            newName += " "
            newName += name[i+1].toUpperCase()
            i+=1
        }
        else
            newName += name[i]
    }
    return newName
}

function transformPrice(pricesArray,currentCurrency) {
    //renders the right prace for an object, based on its array of prices
    var Price = ""
    var found = false;
    pricesArray.forEach((price) => {
        if (price.currency === currentCurrency) {
            Price += price.currency + price.amount
            found = true;
        }

    })
    if (!found)
        return "currency-not-found-in-database"
    else {
        Price = Price.replace("EUR", "€")
        Price = Price.replace("USD", "$")
        Price = Price.replace("JPY", "¥")
        return Price
    }
}

const clothesQuery = gql`query getProduct{
    category(input:{
        title: "clothes",
    }){
        products{
            prices{
                currency
                amount
            },
            category,
            description,
            attributes{
                id,
                items{
                    displayValue,
                    value,
                    id
                }
            }
            gallery,
            id,
            inStock
        }
    }  }`

const techQuery = gql`query getProduct{
    category(input:{
        title: "tech",
    }){
        products{
            prices{
                currency
                amount
            },
            category,
            description,
            attributes{
                id,
                items{
                    displayValue,
                    value,
                    id
                }
            }
            gallery,
            id,
            inStock
        }
    }  }`

const ProductFromDatabase = (props)=>{
    const [size,setSize] = useState("n/a")
    var category,URL
    try{
         category = window.location.hash.split("&")[1]
         URL = window.location.hash.split("&")[2]
    }
    catch{
        //pass
    }

    const {loading, error, data} = useQuery(category==="tech" ? techQuery : clothesQuery)

    if(loading) return "Loading...";
    if(error) return "Error..."

    var productName = "n/a";
    var sideGallery = [];
    var mainGallery = null;
    var brand = "no-brand-from-db"
    var price = "n/a"
    var description = null;

    var FOUND_OBJECT = false;

    data.category.products.forEach((product)=>{
        if(product.id === URL){
            FOUND_OBJECT = true
            productName = product.id
            // description = product.description.replaceAll("<p>","").replaceAll("</p>","")
            description = document.createElement("p").innerHTML = product.description;
            setTimeout(()=>{
                document.getElementsByClassName("description-container")[0].innerHTML = description
            },500)

            product.gallery.forEach((photo)=>{
                sideGallery.push(<img src={photo}/>)})

            mainGallery = sideGallery[0]

            price = transformPrice(product.prices,props.currentCurrency)
        }
    })

    if(!FOUND_OBJECT){
        return  <section id="page-product">
            <div className="product-gallery-container">
                <p>Product not found.</p>
            </div>
        </section>

    }


    return<>
        <section id="page-product">
            <div className="product-gallery-container">
                <div className="side-gallery">
                    {sideGallery}
                </div>

                <div className="main-gallery">
                    {mainGallery}
                </div>
            </div>

            <div className="product-options-container">

                <div className="product-name">
                    <h2>{beautifyName(productName)}</h2>
                    <h3>{brand}</h3>
                </div>

                <div className="size-container">
                    SIZE:
                    <div className="size-boxes">
                        <button className={"button" + (size===0 ? " selected" : "")} disabled onClick={()=>{setSize(0)}}>XS</button>
                        <button className={"button" + (size===1 ? " selected" : "")} onClick={()=>{setSize(1)}}>S</button>
                        <button className={"button" + (size===2 ? " selected" : "")} onClick={()=>{setSize(2)}}>M</button>
                        <button className={"button" + (size===3 ? " selected" : "")} onClick={()=>{setSize(3)}}>L</button>
                    </div>
                </div>

                <div className="price-container">
                    PRICE:
                    <p>{price}</p>
                </div>

                <div className="addToCartBtn">
                    <button className="button">ADD TO CART</button>
                </div>

                <div className="description-container">
                </div>
            </div>
        </section>
        </>
}


const ProductPage = (props)=>{

    return(<>
        <ProductFromDatabase currentCurrency={props.currentCurrency}/>
        </>)
}

export default ProductPage