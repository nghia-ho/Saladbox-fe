import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: true,
  error: null,
  order: {},
  orderDetail: {},
  orderPay: {},
  ordersList: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
    createOrderSuccess: (state, action) => {
      state.order = action.payload;
      state.isLoading = false;
    },
    getSingleOrderSuccess: (state, action) => {
      state.orderDetail = action.payload;
      state.isLoading = false;
    },
    payOrderSuccess: (state, action) => {
      state.orderPay = action.payload;
      state.orderDetail = action.payload;
      state.isLoading = false;
    },
    getOrdersSuccess: (state, action) => {
      state.ordersList = action.payload;
      state.isLoading = false;
    },
  },
});

export const createOrder1 =
  ({ orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice }) =>
  async (dispatch) => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const data = {
        orderItems,
        shippingAddress,
        paymentMethod,
        shippingPrice,
        totalPrice,
      };
      const response = await apiService.post("/order", data);
      dispatch(orderSlice.actions.createOrderSuccess(response.data.data));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };

export const getSingleOrder = (id) => async (dispatch) => {
  dispatch(orderSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/order/${id}`);
    dispatch(orderSlice.actions.getSingleOrderSuccess(response.data.data));
  } catch (error) {
    dispatch(orderSlice.actions.hasError(error));
  }
};

export const payOrder = (id, paymetResult) => async (dispatch) => {
  dispatch(orderSlice.actions.startLoading());
  try {
    const response = await apiService.put(`/order/${id}/pay`, paymetResult);
    console.log(response);
    dispatch(orderSlice.actions.payOrderSuccess(response.data.data));
  } catch (error) {
    dispatch(orderSlice.actions.hasError(error));
  }
};
export const getOrders = () => async (dispatch) => {
  dispatch(orderSlice.actions.startLoading());
  try {
    const response = await apiService.get(`/order`);
    dispatch(orderSlice.actions.getOrdersSuccess(response.data.data));
  } catch (error) {
    dispatch(orderSlice.actions.hasError(error));
  }
};

export default orderSlice.reducer;
