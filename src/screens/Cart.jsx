import { toast } from "react-hot-toast";
import { useCart,useDispatchCart } from "../Context/useContext";
export default function Cart() {
    let cartData = useCart();
    let dispatch = useDispatchCart();

    if (cartData.length === 0) {
        return <div>
            <div className="m-5 w-75 text-center fs-4">Cart is Empty!</div>
        </div>
    }

    const handleCheckOut = async() => {
      
      const userEmail = localStorage.getItem("userEmail");
      let response = await fetch('https://foody-food-server.onrender.com/api/v1/orderData',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          order_data: cartData,
          order_date: new Date().toDateString(),
        })
      });
      console.log(response.status);
      if(response.status === 200){
        dispatch({type:"DROP"});
        toast.success("Order Placed Successfully");
      }
    }
     

    let totalCartPrice = cartData.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);
      // let totalCartPrice = cartData.reduce((total, food) => total + food.price, 0)

 

      
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {
            cartData.map((food,index) =>(
               <tr key={food._id}>
                <th scope="row">{index+1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
              <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                    {console.log(index)}
                <button className="btn btn-danger" onClick={() => dispatch({type:"DELETE",index:index})}>Remove</button>
                </td>
               </tr>
            ))
            }
          </tbody>
        </table>
        <div>
            <h1 className="fs-2">{totalCartPrice}/</h1>
        </div>
        <div className="btn bg-success mt-5 mb-3" onClick={handleCheckOut}>Check Out</div>
      </div>
    </div>
  );
}
