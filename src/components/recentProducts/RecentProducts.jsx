import { use } from "react"
import { Link, NavLink } from "react-router"

const RecentProducts = ({recentProducts}) => {

  return (
<div>
<p className="text-5xl text-center font-semibold ">Recent <span className="text-primary">Products</span></p>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5 m-3">
     {recentProducts.map(product => (
       <div className="card bg-base-100 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      {product.title}
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>{product.description}</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div>
      <div className="badge badge-outline">Products</div>
    </div>
  </div>

   <Link to={`/productDetail/${product._id}`} className="mx-auto m-3 btn btn-primary"> 
    View Detaild
  </Link>
</div>
      ))}
      
      </div>
</div>
  ) 
}

export default RecentProducts
