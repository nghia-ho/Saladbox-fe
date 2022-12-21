import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: true,
  error: null,
  order: null,
  orderPay: {},
  ordersList: [],
  ordersCustomList: [],
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
      state.order = action.payload;
      state.isLoading = false;
    },
    payOrderSuccess: (state, action) => {
      state.orderPay = action.payload;
      state.order = action.payload;
      state.isLoading = false;
    },
    getOrdersSuccess: (state, action) => {
      state.ordersList = action.payload.orders;
      state.totalSale = action.payload.totalSale;
      state.count = action.payload.count;
      state.isLoading = false;
    },
    getOrdersCustomSuccess: (state, action) => {
      state.ordersCustomList = action.payload.orders;
      state.totalSaleCustom = action.payload.totalSale;
      state.count = action.payload.count;
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
      return response.data.data;
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
export const createOrderCustom =
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
      const response = await apiService.post("/order/custom", data);
      dispatch(orderSlice.actions.createOrderSuccess(response.data.data));
      return response.data.data;
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
    dispatch(orderSlice.actions.payOrderSuccess(response.data.data));
  } catch (error) {
    dispatch(orderSlice.actions.hasError(error));
  }
};
export const getOrders =
  ({ query, page = 1, limit = 10, sort }) =>
  async (dispatch) => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const params = { page, limit };
      if (query) params.query = query;
      if (sort) params.sort = sort;
      const response = await apiService.get(`/order`, { params });
      dispatch(orderSlice.actions.getOrdersSuccess(response.data.data));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
export const getOrdersCustom =
  ({ query, page = 1, limit = 10, sort }) =>
  async (dispatch) => {
    dispatch(orderSlice.actions.startLoading());
    try {
      const params = { page, limit };
      if (query) params.query = query;
      if (sort) params.sort = sort;
      const response = await apiService.get(`/order/custom`, { params });
      dispatch(orderSlice.actions.getOrdersCustomSuccess(response.data.data));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
export const editOrder =
  ({ id, isDeliverd, phone, address, district }) =>
  async (dispatch) => {
    dispatch(orderSlice.actions.startLoading());
    try {
      await apiService.put(`/order/${id}`, {
        isDeliverd,
        phone,
        address,
        district,
      });
      const response = await apiService.get(`/order/${id}`);
      dispatch(orderSlice.actions.getSingleOrderSuccess(response.data.data));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
export const editOrderCustom =
  ({ id, isDeliverd, phone, address, district, day }) =>
  async (dispatch) => {
    dispatch(orderSlice.actions.startLoading());
    try {
      await apiService.put(`/order/custom/${id}`, {
        isDeliverd,
        phone,
        address,
        district,
        day,
      });
      // const response = await apiService.get(`/order/${id}`);
      // dispatch(orderSlice.actions.getSingleOrderSuccess(response.data.data));
    } catch (error) {
      dispatch(orderSlice.actions.hasError(error));
    }
  };
export const deleteOrder = (id) => async (dispatch) => {
  dispatch(orderSlice.actions.startLoading());
  try {
    await apiService.delete(`/order/${id}`);
    const response = await apiService.get(`/order`);
    dispatch(orderSlice.actions.getOrdersSuccess(response.data.data));
  } catch (error) {
    dispatch(orderSlice.actions.hasError(error));
  }
};
export default orderSlice.reducer;
