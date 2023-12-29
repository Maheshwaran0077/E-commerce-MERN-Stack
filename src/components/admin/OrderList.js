import { Fragment, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearError, clearOrderDeleted } from "../../slices/OrderSlice";
import {
  adminGetAllProduct,
  deleteProduct,
} from "../../actions/ProductsActions";
import {  clearProductDeleted, deleteProductRequest } from "../../slices/productSlices";
import { Loader } from "../layouts/Loader";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
import { deleteOrders,adminOrders as adminOrdersAction } from "../../actions/OrderActions";
 
export default function OrderList() {
  const {
    adminOrders = [],
    loading = true,
    error,
    isOrderDeleted,
   } = useSelector((state) => state.orderState);
 
  const dispatch = useDispatch();

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        { 
          label: "Number Of Items",
          field: "NOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    adminOrders.forEach((order) => {
      data.rows.push({
        id: order._id,
        NOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status: <p style={{color:order.orderStatus.includes("processing")?"green":"red"}}> {order.orderStatus}</p>,
        actions: (
          <Fragment>
            <Link
              to={`/admin/order/${order._id}`}
              className="btn btn-primary"
            >
              {" "}
              
              <i className="fa fa-pencil"></i>
            </Link>
            <Button className="btn btn-danger py-1 px-2 ml-2" onClick={e=>deleteHandler(e,order._id )}>
              <i className="fa fa-trash"></i>
            </Button>
          </Fragment>
        ),
      });
    });

    return data;
  };
  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteOrders(id));
  };

  useEffect(() => {
    if (error ) {
      toast(error , {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        onOpen: () => {
          dispatch(clearError());
        },
      });
      return;
    }
    if(isOrderDeleted) {
        toast('Order Deleted Succesfully!',{
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearOrderDeleted())
        })
        // navigate('/admin/products')
        return;
    }

    dispatch(adminOrdersAction);
  }, [dispatch, error,isOrderDeleted]);

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h1 className="my-4">Order List</h1>
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <MDBDataTable
              data={setOrders()}
              bordered
              striped
              hover
              className="px-3"
            />
          )}
        </Fragment>
      </div>
    </div>
  );
}
