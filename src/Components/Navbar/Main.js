import React, { useState } from "react"
import { Route, Switch } from "react-router"
import Navbar from "./Navbar"
import Cart from "../Cart"
import Footer from "../Footer/Footer"
import Login from "../Login/Login"
import { Redirect } from "react-router-dom"
import Slidder  from "../Slidder"
import Cards  from "../Cards/Cards"
import SignUp from "../Signup/Signup"
import {SingleCard} from "../Cards/index"
import Payment from "../Payment"

import PrivateRoutes from "../PrivateRoutes"

export default function Main(){

    const [auth , setAuth] = useState(true)

    const [cartItems,setCrtItems]=useState([]); 
    
    const onAdd=(product)=>{
        const exist=cartItems.find(x=>x.id === product.id);
        if(exist){
            setCrtItems(
                cartItems.map(x=>
                    x.id === product.id ? {...exist, qty:exist.qty+1} : x
                )
            )
        }else{
            setCrtItems([...cartItems,{...product,qty:1}])
        }
    }

    const onRemove=(product)=>{
        const exist = cartItems.find((x)=>x.id === product.id);
        if(exist.qty===1){
            setCrtItems(
                cartItems.filter((x)=> 
                    x.id !== product.id
                )
            );
        }else {
            setCrtItems(cartItems.map(x=>x.id === product.id ? {...exist, qty:exist.qty-1} : x) )
        }
    }


    const loginHandler=()=>{
        setAuth(true)
    }
    const logoutHandler=()=>{
        setAuth(false)
    }


    
    return(
        <div>
            <Navbar auth={auth} logoutHandler={logoutHandler} loginHandler={loginHandler} countCartItems={cartItems.length}/>
            <Route exact path="/" component={Slidder}/>
            
            <Switch>
            <Route exact path="/" component={Cards} />
              
               
                
                <Route exact path="/SignIn"  render={(props)=><Login {...props} loginHandler={loginHandler}/>} />
                
                <Route exact  path="/Signup" component={SignUp}/>
                
               <Route path="/course/:id"  render={(props)=><SingleCard {...props}  onAdd={onAdd} />} />

              {auth === true?
              <Route exact path="/cart"  component={(props)=><Cart {...props} cartItems={cartItems}  onRemove={onRemove} auth={auth} logoutHandler={logoutHandler} loginHandler={loginHandler} />} />
                 :<Redirect to='/login'/>}
                  
                {/*  <PrivateRoutes auth={auth} path='/cart' component={(props) => <Cart {...props} cartItems={cartItems} onAdd={onAdd} onRemove={onRemove}  />} /> */}


              <Route exact path="/payment" component={Payment} cartItems={cartItems}/> 
               
              <Route render={()=> <h3>404 Page Not Found</h3>} />
             
              
              
                </Switch>
                
    
                <Footer />
                
        </div>
    )
}