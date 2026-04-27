import "./index.css";
import { useMemo, useState } from "react";



const TAX_RATE = 0.1;
const PRODUCTS = [
  
  { id: 1, name: "Headphones", price: 150, discountPrice: 20 },
  { id: 2, name: "Smartphone", price: 200, discountPrice: 10 },
  { id: 3, name: "Laptop", price: 350, discountPrice: 20 },
  { id: 4, name: "Smartwatch", price: 100, discountPrice: 10 },
  { id: 5, name: "Tablet", price: 230, discountPrice: 18 },
  { id: 6, name: "Camera", price: 300, discountPrice: 20 },
  { id: 7, name: "SmartTV", price: 500, discountPrice: 80 },
  { id: 8, name: "Washing Machine", price: 600, discountPrice: 70 },
  { id: 9, name: "Speakers", price: 700, discountPrice: 80 },

];



function money(n) {

return `$${Number(n || 0).toFixed(2)}`;
  
}




function calcItemTax(discountPrice) {
  
return discountPrice * TAX_RATE;

}




export default function App() {



const [activeTab, setActiveTab] = useState("products");


const [cart, setCart] = useState({});



const cartCount = useMemo(() => Object.values(cart).reduce((sum, q) => sum + q, 0), [cart]
  
);




const cartItems = useMemo(() => {
 

return Object.entries(cart)

.map(([idStr, qty]) => {


const id = Number(idStr);
const p = PRODUCTS.find((x) => x.id === id);



if (!p) return null;





const itemTax = calcItemTax(p.discountPrice);
const lineSubtotal = p.discountPrice * qty;
const lineTax = itemTax * qty;
const lineTotal = lineSubtotal + lineTax;




return {


...p, qty, itemTax, lineSubtotal, lineTax, lineTotal,
        

};

})



.filter(Boolean);


}, [cart]);






const subtotal = useMemo(() => cartItems.reduce((sum, it) => sum + it.lineSubtotal, 0), [cartItems]
  
);




const tax = useMemo(() => cartItems.reduce((sum, it) => sum + it.lineTax, 0), [cartItems]
  
);





const total = useMemo(() => subtotal + tax, [subtotal, tax]);



function addToCart(productId) {


setCart((prev) => ({

  
...prev, [productId]: (prev[productId] || 0) + 1,
    
}));

}






function increment(productId) {
    
addToCart(productId);

}





function decrement(productId) {

setCart((prev) => {




const current = prev[productId] || 0;


if (current <= 1) {



const { [productId]: _, ...rest } = prev;


return rest;

}


return { ...prev, [productId]: current - 1 };


});

}






function removeItem(productId) {


setCart((prev) => {



const { [productId]: _, ...rest } = prev;


return rest;

});

}






function placeOrder() {



if (cartCount === 0) {


window.alert("Cart is empty.");

return;

}





window.alert(`Order Confirmed! 

Total: ${money(total)}`);

setCart({});

setActiveTab("products");


}








return (



<div className="page">


<header className="topbar">
 
<div className="brand">Shopping</div>




<div className="topbar-actions">









<button
  
className={`pill pill-yellow ${

activeTab === "products" ? "is-active" : ""

}`}



onClick={() => setActiveTab("products")}

type="button">
            
Products

</button>







          
<button

className={`pill pill-gray ${activeTab === "cart" ? "is-active" : ""}`}

onClick={() => setActiveTab("cart")}

type="button">
            
Cart 

({cartCount})

</button>



        
</div>
</header>








<main className="content">

<section className="panel">

{activeTab === "products" ? (
            
<div className="grid">
  
{PRODUCTS.map((p) => {

const itemTax = calcItemTax(p.discountPrice);



return (

<article key={p.id} className="card">












<h3 className="title">{p.name}</h3>

<div className="prices">

<div className="new">

Price: 
  
{money(p.price)}</div>
 
                      









<div className="new">

Discount Price: 

{money(p.discountPrice)}
                      
</div>










<div className="taxline">

Tax: 

{money(itemTax)}

</div>
                    
</div>


 
 
 
                    
                    



<button
                      
className="btn-add"

onClick={() => addToCart(p.id)}

type="button">


Add to Cart


</button>






</article>


);


})}



</div>





) : (




<div className="cart">

<div className="cart-header">


<h2 className="cart-title">Cart</h2>

</div>








{cartItems.length === 0 ? (


<div className="cart-empty">Your cart is empty.</div>



) : (

<>



<div className="cart-list">


{cartItems.map((item) => (
                      
                      
                      
<div key={item.id} className="cart-row">

<div className="cart-name">{item.name}</div>

<div className="cart-meta">





<span className="cart-price">

{money(item.discountPrice)}

</span>





<span className="cart-qty">x {item.qty}

</span>
  
  
  
</div>







<div className="qty-controls">








<button
                            
className="qty-btn"
onClick={() => decrement(item.id)}
type="button"
aria-label={`Decrease ${item.name}`}

>
 
-
                          
</button>

                          











<button
                            
className="qty-btn"
onClick={() => increment(item.id)}
type="button"
aria-label={`Increase ${item.name}`}

>

+

</button>












<button
className="qty-btn qty-delete"
onClick={() => removeItem(item.id)}
type="button"
aria-label={`Delete ${item.name}`}

>

Delete

</button>








</div>

</div>

))}

</div>









<div className="summary">

<div className="summary-row">









<span>

Subtotal:

</span>








<strong>{money(subtotal)}</strong>
</div>



 
 




<div className="summary-row">
                      
                      
                      
                      



<span>
  
Tax:

</span>
                      
                      
                      
                      
                      
                      
                      
<strong>
  
{money(tax)}
  
</strong>






</div>













<div className="summary-row summary-total">
                      






<span>
  
Total:

</span>
         
         
         
  
  
  
  
  
  
<strong>

{money(total)}

</strong>


                    
                    
</div>






<div className="summary-divider">--------------------</div>

                    
                    
                    
                    
                    
<button

className="btn-place"
onClick={placeOrder}
type="button"

>


Place Order

</button>








</div>

</>

)}

</div>



)}

        
        

</section>





</main>

</div>


);

}