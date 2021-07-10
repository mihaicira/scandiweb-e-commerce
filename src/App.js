import React, {Component} from "react";
import "./App.css"

import Navbar from "./mutual-components/Navbar";
import Catalog from "./catalog/Catalog";
import ProductPage from "./product/ProductPage";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            currentPage:"n/a",
            sexFilter:"WOMEN",
            currency: "USD",
            categoryFilter:"Clothes",
            cart:[
                {
                    id:"jacket-canada-goosee",
                    brand:"no-brand-from-db",
                    prices:["blabal"],
                    amount: 1,
                    image: "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg"
                }
            ]
        }
    }

    componentDidMount() {
        var State = this.state;
        const URL = window.location.hash;
        if(URL.substring(1).includes("product&")){
            State.currentPage = "product"
            this.setState(State)
        }
        else{
            State.currentPage = "catalog"
            if(window.location.hash.includes("&clothes"))
                State.categoryFilter = "Clothes"
            if(window.location.hash.includes("&tech"))
                State.categoryFilter = "Tech"
            else{
                console.log("HELOO")
                window.location.hash="catalog&clothes"
                State.categoryFilter = "Clothes"
            }
            this.setState(State)
        }

    }

    //pages
    changePage(newPage){
        var State = this.state;
        State.currentPage = newPage;
        console.log("changing page to: ",newPage)
        setTimeout(()=>{
            this.setState(State)
        },2000)

    }

    //navbar
    changeSexFilter(newFilter){
        var State = this.state
        State.sexFilter = newFilter
        this.setState(State)
    }

    changeCurrency(newCurrency){
        var State = this.state
        State.currency = newCurrency
        this.setState(State)
        document.querySelector("#navbar-action-dropdown").style.transform = "translateY(75%) translateX(-34%) rotateX(90deg)";
    }

    //catalog
    changeCategoryFilter(){
        var State = this.state;
        if(State.categoryFilter === "Clothes")
            State.categoryFilter = "Tech"
        else
            State.categoryFilter = "Clothes"

        document.querySelector("#category-button").style.transform="rotateX(90deg)";

        window.location.hash="catalog&"+State.categoryFilter.toLowerCase()
        setTimeout(()=>{
            this.setState(State)
            document.querySelector("#category-button").style.transform="rotateX(0deg)";
        },550)


        document.querySelector("#catalog-container").style.opacity = "0";
    }

    render(){
        return(<>
            {/*Navbar*/}
            <Navbar changeToWomen={()=>{this.changeSexFilter("WOMEN")}}
                    changeToMen={()=>{this.changeSexFilter("MEN")}}
                    changeToKids={()=>{this.changeSexFilter("KIDS")}}
                    currentSexFilter={this.state.sexFilter}

                    currentCurrency={this.state.currency}
                    changeToUSD={()=>{this.changeCurrency("USD")}}
                    changeToEUR={()=>{this.changeCurrency("EUR")}}
                    changeToJPY={()=>{this.changeCurrency("JPY")}}/>


            <div className="fadeMe"></div>

            {/*Catalog*/}
            {
                this.state.currentPage === "catalog" &&
                <Catalog currentCategory={this.state.categoryFilter}
                changeCategory={()=>{this.changeCategoryFilter()}}
                currentCurrency={this.state.currency}
                changePageToProduct={()=>{this.changePage("product")}}/>
            }

            {/*Product*/}
            {
                this.state.currentPage === "product" &&
                    <ProductPage currentCurrency={this.state.currency}/>
            }




            </>)
    }
}

export default App;