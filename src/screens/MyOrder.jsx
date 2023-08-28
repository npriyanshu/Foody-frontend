import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    
    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            const response = await fetch("https://foody-food-server.onrender.com/api/v1/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail
                })
            });
            const data = await response.json();
            setOrderData(data.orderdata.order_data.reverse());
        }
    }

    useEffect(() => {
        fetchMyOrder();
    },[]);
    
    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row' id='Row'>
                    {
                    orderData.map((data, dataIndex) => (
                        <div key={dataIndex} className='col-12 col-md-6 col-lg-3'>
                            {data.map((item, itemIndex) => (
                                <div key={itemIndex} className='card mt-3' style={{ width: '16rem', maxHeight: '360px', overflowY: 'auto' }}>
                                    {item.Order_date && (
                                        <div className='m-auto mt-3'>
                                            <strong>{item.Order_date}</strong>
                                            <hr />
                                        </div>
                                    )}
                                    {!item.Order_date && (
                                        <div className='card-body'>
                                            <h5 className='card-title'>{item.name}</h5>
                                            <div className='container w-100 p-0'>
                                                <span className='m-1'>{item.qty}</span>
                                                <span className='m-1'>{item.size}</span>
                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                    ₹{item.price}/-
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}
