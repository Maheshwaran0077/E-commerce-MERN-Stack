import React, { Fragment, useEffect, useState } from 'react'
import Sidebar from "../../components/admin/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { createNewProduct } from '../../actions/ProductsActions'
import { toast } from 'react-toastify'
import { clearError, clearProductCreated } from '../../slices/productSlices'
function NewProduct() {


    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState("")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const { loading, isProductCreated, error } = useSelector(state => state.productState)

    const categories = [
        "Beauty/Health",
        "Clothes/Shoes",
        "Mobile Phones",
        "Accessories",
        "Electronics",
        "Headphones",
        "Laptops",
        "Foods",
        "Books",
        "Sports",
        "Home",
        "Outdoor"
    ]
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onImageChange = (e) => {
        const files = Array.from(e.target.files);

        // files.forEach(file => {
        //     const reader = new FileReader();

        //     reader.onload = () => {
        //         if (reader.readyState == 2) {
        //             setImagesPreview(oldArry => [...oldArry, reader.result])
        //             setImages(oldArry => [...oldArry, file])
        //         }
        //     }
        //     reader.readAsDataURL(file)
        // })
        files.forEach(file => {
            
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState == 2 ) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, file])
                }
            }

            reader.readAsDataURL(file)


        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("name", name)
        formData.append("price", price)
        formData.append("stock", stock)

        formData.append("description", description)
        formData.append("seller", seller)
        formData.append("category", category)
        images.forEach(image => {
            formData.append("images", image)

        })
        dispatch(createNewProduct(formData))


    }
    useEffect(() => {
        // if (isProductCreated) {
        //     toast("product Created Successfully", {
        //         type: 'success',
        //         position: toast.POSITION.BOTTOM_CENTER,
        //         onOpen: () => dispatch(clearProductCreated())
        //     })
        //     navigate("/admin/products")
        //     return
        // }
        if(isProductCreated) {
            toast('Product Created Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductCreated())
            })
            navigate('/admin/products')
            return;
        }
        if (error) {
            toast(error, {
                type: 'error',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => { dispatch(clearError()) }
            })
            return
        }

    }, [isProductCreated, error, dispatch])


    return (
        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <h1 className="my-4">Product List</h1>
                <Fragment>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">New Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input type="text" onChange={e => setName(e.target.value)}
                                    id="name_field" className="form-control" value={name} />

                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input type="text" id="price_field" className="form-control"
                                    onChange={e => setPrice(e.target.value)} value={price} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control"
                                    onChange={e => setDescription(e.target.value)} value={description}
                                    id="description_field" rows="8"></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>
                                <select onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                    <option value="" >Select</option>
                                    {/* {categories.map(category => (

                                        <option value={category} key={category}>{category}</option>
                                    ))} */}

                                    {categories.map( category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input type="number"
                                    onChange={e => setStock(e.target.value)} value={stock}

                                    id="stock_field" className="form-control" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="seller_field">Seller Name</label>
                                <input type="text" id="seller_field" className="form-control"
                                    onChange={e => setSeller(e.target.value)} value={seller} />
                            </div>

                            <div className='form-group'>
                                <label>Images</label>

                                <div className='custom-file'>
                                    <input type='file' name='product_images'
                                        className='custom-file-input' id='customFile'
                                        onChange={onImageChange}
                                        multiple />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Images
                                    </label>
                                </div>
                                {imagesPreview.map(image => (
                                    <img
                                        className='mt-5 mr-3'
                                        key={image}
                                        src={image}
                                        alt={`image Preview`}
                                        width='55'
                                        height='53'



                                    />
                                ))}
                            </div>


                            <button id="login_button"
                                disabled={loading}
                                type="submit" className="btn btn-block py-3"
                            >
                                CREATE
                            </button>

                        </form>
                    </div>
                </Fragment>
            </div>
        </div>
    )
}

export default NewProduct