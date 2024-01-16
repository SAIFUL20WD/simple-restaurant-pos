import { useEffect, useState } from "react";
import Categories from "../components/categories";
import Foods from "../components/Foods";
import Cart from "../components/Cart";
import { priceGenerator } from "../Helper/priceGenerator.js";


const HomePage = () => {
    const [foods, setFoods] = useState([]);
    const [cart, setCart] = useState([]);
    const [bill, setBill] = useState({
        tax: 0,
        discount: 0,
        total: 0
    })

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`)
            .then(res => res.json())
            .then(data => setFoods(data.meals))
    }, []);

    const handleCategoryChange = (category) => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
            .then(res => res.json())
            .then(data => setFoods(data.meals))
    }

    const handleAddToCart = (id, name) => {
        const duplicate = cart.find(item => item.id === id)
        if (duplicate) {
            const newCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, qty: item.qty + 1 }
                }
                else {
                    return item
                }
            })
            setCart(newCart)
        } else {
            setCart([...cart, { id: id, name: name, qty: 1, price: priceGenerator() }])
        }
    }

    const handleIncreaseDecrease = (operation, id) => {
        const newCart = cart.map((item) => {
            if (item.id === id) {
                if(operation === 1){
                    return { ...item, qty: item.qty + 1 }
                }
                else {
                    if(item.qty === 1) return item
                    else return { ...item, qty: item.qty - 1 }
                } 
            }
            else {
                return item
            }
        })
        setCart(newCart)
    }

    const handleDelete = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
    }

    const handleCalculate = () => {
        let sum = 0
        cart.map(item => {
            if (item.qty === 1) {
                sum += item.price
            }
            else {
                sum = sum + (item.price * item.qty)
            }
        });
        const tax = parseInt(sum * (15 / 100))
        const discount = parseInt(sum * (5 / 100))
        const total = parseInt(((sum + tax) - discount))
        setBill({ tax, discount, total })
    }

    const handlePlaceOrder = () => {
        setCart([])
        setBill({tax: 0, discount: 0, total: 0})
        alert("Order Placed")
    }

    return (
        <>
            <section className="grid grid-cols-5 mx-10 my-5">
                <Categories handleCategoryChange={handleCategoryChange} />
                <Foods foodsData={foods} handleAddToCart={handleAddToCart} />
                <Cart cartsData={cart} handleDelete={handleDelete} handleIncreaseDecrease={handleIncreaseDecrease}/>
            </section>
            <div className="flex justify-between max-w-7xl mx-auto">
                <p>VAT/Tax: {bill.tax}</p>
                <p>Discount: {bill.discount}</p>
                <p>Grand Total: <span className="bg-sky-500 px-3 py-1 text-2xl text-white font-bold rounded-md">{bill.total}</span></p>
                <div>
                    <button className="btn btn-sm bg-green-500 text-white" onClick={handleCalculate}>Calculate</button>
                    <button className="btn btn-sm bg-green-500 text-white" onClick={handlePlaceOrder}>Place Order</button>
                </div>
            </div>
        </>
    );
};

export default HomePage;