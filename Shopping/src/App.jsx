import { useState } from "react";



const productData = [

  { id: 1, name: "Headphones", price: 150, discountPrice: 20 },
  { id: 2, name: "Smartphone", price: 200, discountPrice: 10 },
  { id: 3, name: "Laptop", price: 350, discountPrice: 20 },
  { id: 4, name: "Smartwatch", price: 100, discountPrice: 10 },
  { id: 5, name: "Tablet", price: 230, discountPrice: 18 },
  { id: 6, name: "Camera", price: 300, discountPrice: 20 },
  {id: 7, name: "SmartTV", price: 500, discountPrice: 80}

];



const tax_rate = 0.10;


export default function App() {

const [currentPage, setCurrentPage] = useState("product");
const [cart, setCart] = useState([]);
const addToCart = (product) => {


setCart((prev) => {

    
const current = prev.find((item) => item.id === product.id);

    
if (current) {

  return prev.map((item) => item.id === product.id

  ? { ...item, quantity: item.quantity + 1 }

  : item

);

}


return [...prev, { ...product, quantity: 1 }];

});

};




const changeQuantity = (id, change) => {

setCart((prev) => prev
        
.map((item) => {


if (item.id === id) {


  const quantity = item.quantity + change;
 
 
  if (quantity < 1) return null;
 
 
 
  return { ...item, quantity };
 
}


return item;

})


.filter(Boolean)


);

};





const removeFromCart = (id) => {

setCart((prev) => prev.filter((item) => item.id !== id));
};



const subtotal = cart.reduce(

(sum, item) => sum + item.discountPrice * item.quantity, 0

);




const totalTax = cart.reduce(

  (sum, item) =>

    sum + item.discountPrice * item.quantity * tax_rate, 0
  );



const finalTotal = (subtotal + totalTax).toFixed(2);

  

return (

<div className="min-h-screen bg-gray-100">
      





      
{/* The Navbar */}

<div className="flex justify-between items-center px-6 py-4 bg-white shadow gap-4">
        
<h2 className="font-bold text-xl">
          
Shopping 

</h2>



        <div className="flex gap-8">


          <button

            onClick={() => setCurrentPage("product")}
            className={`px-4 py-2 rounded-full${
          
              currentPage === "product"
                ? "bg-yellow-400 text-white"
                : "bg-gray-300"
          
          }`} >

            Products
          
          </button>




          <button

onClick={() => setCurrentPage("cart")}
className={`px-4 py-2 rounded-full ${

currentPage === "cart"
                ? "bg-yellow-400 text-white"
                : "bg-gray-300"

}`} >

            Cart ({cart.length})

          </button>


        </div>
      </div>

      <div className="p-6">

        {/* The Product Page */}
        {currentPage === "product" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {productData.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 bg-white shadow flex flex-col gap-2"
              >
                <h2 className="text-lg font-bold">{product.name}</h2>

                <p className="text-gray-400 line-through">
                  ${product.price}
                </p>

                <p className="font-bold text-green-600">
                  ${product.discountPrice}
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="text-white bg-green-500 rounded-full py-1 mt-2 hover:bg-green-600"
                >
                  Add to Cart
                
                </button>
              </div>
            ))}
          </div>
        )}






        {/* The Cart Page */}
        {currentPage === "cart" && (
          <div className="mt-6">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center">
                
                Your cart is empty

              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => {
                
                const itemTotal = item.discountPrice * item.quantity;
                  const itemTax = itemTotal * tax_rate;

                  return (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border rounded p-4 bg-white shadow"
                    >
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p>${item.discountPrice} each</p>

                      
                        <p className="text-sm text-gray-500">
                          Tax (10%): ₹{itemTax.toFixed(5)}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => changeQuantity(item.id, -1)}
                          className="px-2 bg-gray-300"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => changeQuantity(item.id, 1)}
                          className="px-2 bg-gray-300"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold">
                          ${itemTotal.toFixed(5)}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-blue-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}

          
                <div className="text-right font-bold space-y-1">
                  <p>Subtotal: ${subtotal.toFixed(5)}</p>
                  <p>Tax (10%): ${totalTax.toFixed(5)}</p>

                  <h2 className="text-xl">
                    Total: ${finalTotal}
                  </h2>

                  <button
                    onClick={() => {
                      alert(`Checkout Successful! $${finalTotal}`);
                      setCart([]);
                      setCurrentPage("product");
                    }}
                    className="bg-green-500 text-white rounded-full px-4 py-2 mt-2 hover:bg-green-600"
                  >
                    Place Order
                  </button>
                
                
                
                
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}