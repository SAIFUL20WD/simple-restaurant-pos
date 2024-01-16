

const Foods = ({ foodsData, handleAddToCart }) => {

    return (
        <section className="col-span-2 max-h-[90vh] overflow-y-scroll mx-5">
            <div className="grid grid-cols-4 mr-10">
                {
                    foodsData.length > 0 && foodsData.map((item) => {
                        return (
                            <div key={item.idMeal} className="border-2 border-slate-200 m-1 cursor-pointer rounded-md" onClick={() => handleAddToCart(item.idMeal, item.strMeal)}>
                                <img src={item.strMealThumb} alt="" className="rounded-t-md p-1 border-b border-slate-200"/>
                                <div className="text-sm p-1 max-h-12 overflow-hidden">
                                    <h3>{item.strMeal}</h3>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>

    );
};

export default Foods;