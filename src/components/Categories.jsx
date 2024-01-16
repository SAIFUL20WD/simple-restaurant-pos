import { useEffect } from "react";
import { useState } from "react";


const Categories = ({handleCategoryChange}) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
            .then(res => res.json())
            .then(data => setCategories(data.categories))
    }, [])

    return (
        <div className="col-span-1 max-w-56 max-h-[90vh] overflow-y-scroll">
            <h3 className="text-2xl text-center border-b-2 border-green-600 p-3">Categories</h3>
            {
                categories.length > 0 && categories.map((item) => {
                    return (
                        <div key={item.idCategory} className="bg-green-500 m-2 px-10 py-3 cursor-pointer">
                            <h3 className="text-white text-center" onClick={() => handleCategoryChange(item.strCategory)}>{item.strCategory}</h3>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Categories;