

const Cart = ({cartsData, handleDelete, handleIncreaseDecrease}) => {
    return (
        <section className="col-span-2 max-h-[90vh] overflow-y-scroll">
            
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr className="text-center text-lg">
                            <th className="text-start">Item</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartsData.map((item) => {
                            return (
                                <tr key={item.id} className="text-center font-medium">
                                    <th className="text-start">{item.name}</th>
                                    <td>{item.price}</td>
                                    <td>
                                        <span className="bg-red-500 text-white p-1 mx-1 cursor-pointer" onClick={() => handleIncreaseDecrease(0, item.id)}>-</span>
                                        {item.qty}
                                        <span className="bg-sky-500 text-white p-1 mx-1 cursor-pointer" onClick={() => handleIncreaseDecrease(1, item.id)}>+</span>
                                    </td>
                                    <td>{item.price * item.qty}</td>
                                    <td onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash bg-red-500 text-white text-xs p-2 cursor-pointer"></i></td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Cart;