import React, {Component} from "react";
import "./style.css";

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

class Product extends Component{

    transformPrice(pricesArray){
        //renders the right prace for an object, based on its array of prices
        var Price = ""
        var found = false;
        console.log(pricesArray)
        pricesArray.forEach((price)=>{
            if(price.currency === this.props.currentCurrency){
                Price += price.currency + price.amount
                found = true;
            }

        })
        if(!found)
            return "currency-not-found-in-database"
        else{
            Price = Price.replace("EUR","€")
            Price = Price.replace("USD","$")
            Price = Price.replace("JPY","¥")
            return Price
        }
    }

    redirectToProduct(){
        window.location.hash = "product&"+this.props.category.toLowerCase()+'&'+this.props.name
        this.props.changePageToProduct()
    }

    render() {
        return(<>
                <div className="Product">
                    <img src={this.props.image} onClick={()=>{this.redirectToProduct()}}/>
                    <p className="product-name">{beautifyName(this.props.name)}</p>
                    <p className="product-price" onClick={()=>{this.redirectToProduct()}}>{this.transformPrice(this.props.prices)}</p>
                </div>
            </>)
    }
}

export default Product;