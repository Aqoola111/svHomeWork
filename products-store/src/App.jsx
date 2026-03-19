import {useState, useEffect, useRef} from 'react'
import './App.css'

function App() {
    const [products, setProducts] = useState(undefined)
    const [filteredProducts, setFilteredProducts] = useState(undefined)
    const [categories, setCategories] = useState(undefined)
    const [filter, setFilter] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const selectRef = useRef(null)


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            const response = await fetch('https://dummyjson.com/products')
            const json = await response.json()
            setProducts(json.products)
            setLoading(false)
            selectRef.current?.focus()
        }
        fetchProducts()
    }, []);

    useEffect(() => {
        const updateCategories = () => {
            if (products === undefined) return
            const ctg = products.map(product => product.category)
            setCategories([...new Set(ctg)])
        }
        updateCategories()
    }, [products])

    useEffect(() => {
        const filterProducts = () => {
            if (filter === undefined) {
                setFilteredProducts(products)
                return;
            }
            setLoading(true)
            if (products === undefined) return
            const filteredProducts = products.filter(product => product.category === filter)
            setFilteredProducts(filteredProducts)
            setLoading(false)
        }

        filterProducts()

    }, [filter, products]);

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value === "" ? undefined : value);
    };

    return (
        <div className='min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center'>
            <h1 className='text-4xl font-black text-slate-900 mb-8 tracking-tight'>
                Products Store
            </h1>
            <div className='flex items-center gap-3 mb-12 bg-white p-2 rounded-2xl shadow-sm border border-slate-200'>
                <select
                    ref={selectRef}
                    onChange={handleFilterChange}
                    value={filter || ""}
                    className='bg-transparent px-4 py-2 outline-none text-slate-700 font-medium cursor-pointer min-w-[200px]'
                >
                    <option value="">All Categories</option>
                    {categories && categories.map((category) => (
                        <option className='capitalize' key={category} value={category}>{category}</option>
                    ))}
                </select>
                <div className='w-px h-8 bg-slate-200'></div>
                <button
                    className='bg-slate-900 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-500 transition-all active:scale-95'
                    onClick={() => setFilter(undefined)}
                >
                    Clear
                </button>
            </div>

            <div className='max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {loading && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4">
                        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin"></div>
                        <p className='text-slate-500 font-medium'>Fetching products...</p>
                    </div>
                )}
                {!loading && filteredProducts && filteredProducts.map((product) => (
                    <div key={product.id}
                         className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-1">
                        <div className="h-56 bg-slate-100 overflow-hidden relative">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className='absolute top-3 left-3'>
                                <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-lg shadow-sm">
                                     {product.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                            <h2 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-sky-600 transition-colors">
                                {product.title}
                            </h2>

                            <p className="text-sm text-slate-500 line-clamp-2 flex-grow leading-relaxed">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-50">
                                <span className="text-2xl font-black text-slate-900">
                                    ${product.price}
                                </span>
                                <button className='bg-slate-100 text-slate-900 px-4 py-2 rounded-lg font-bold text-sm hover:bg-slate-900 hover:text-white transition-colors'>
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App