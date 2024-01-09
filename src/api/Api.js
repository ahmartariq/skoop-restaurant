import axiosClient from "../../axiosClient";


// restaurant login API
export const LoginApi = async (data) => {
    const response = await axiosClient.post("sign-in", data);
    return response.data;
};

// restaurant register API
export const RegisterApi = async (data) => {
    const response = await axiosClient.post("register", data);
    return response.data;
};

// verify email
export const VerifyEmail = async (email) => {
    const response = await axiosClient.get(`verify/${email}`);
    return response.data;
};

// current restaurant
export const currentRestaurant = async () => {
    const response = await axiosClient.get(`restaurant`);
    return response.data.restaurant;
};

// get categories
export const getCategories = async () => {
    const response = await axiosClient.get(`viewfoodcategory`);
    return response.data;
};

// get category only names
export const getCategoryNames = async () => {
    const response = await axiosClient.get(`viewallcategorynames`);
    return response.data;
}

// add category
export const addCategory = async (data) => {
    const response = await axiosClient.post(`add-category`, data);
    return response.data;
};

// update category
export const updateCategory = async (data, _id) => {
    const response = await axiosClient.patch(`edit-foodcategory/${_id}`, data);
    return response.data;
};

// delete category
export const deleteCategory = async (_id) => {
    const response = await axiosClient.delete(`delete-foodcategory/${_id}`);
    return response.data;
};

// get foods
export const getFoods = async () => {
    const response = await axiosClient.get(`viewfooditems`);
    return response.data;
};

// get food only names
export const getFoodNames = async () => {
    const response = await axiosClient.get(`allProductsnames`);
    return response.data;
};

// add food
export const addFood = async (data) => {
    const response = await axiosClient.post(`add-fooditem`, data);
    return response.data;
};

// update food
export const updateFood = async (data, _id) => {
    const response = await axiosClient.patch(`edit-fooditem/${_id}`, data);
    return response.data;
};

// delete food
export const deleteFood = async (_id) => {
    const response = await axiosClient.delete(`delete-fooditem/${_id}`);
    return response.data;
};

// Add Deal
export const addDeal = async (data) => {
    const response = await axiosClient.post(`add-fooddeal`, data);
    return response.data;
};

// Get Deals
export const getDeals = async () => {
    const response = await axiosClient.get(`all-fooddeals`);
    return response.data;
};

// Update Deal
export const updateDeal = async (data, _id) => {
    const response = await axiosClient.patch(`edit-fooddeal/${_id}`, data);
    return response.data;
};

// Delete Deal
export const deleteDeal = async (_id) => {
    const response = await axiosClient.delete(`delete-fooddeal/${_id}`);
    return response.data;
};

// update Profile
export const updateProfile = async (data) => {
    const response = await axiosClient.patch(`edit-restaurant`, data);
    return response.data;
};

// opening hours
export const openingHours = async (data) => {
    const response = await axiosClient.patch(`openinghours`, data);
    return response.data;
};

// open close restaurant
export const openCloseRestaurant = async (data) => {
    const response = await axiosClient.patch(`opening`, data);
    return response.data;
};

// get orders by status
export const getOrders = async (status) => {
    const response = await axiosClient.get(`get-ordersbystatus/${status}`);
    return response.data;
};

// single food item
export const singleFood = async (id) => {
    const response = await axiosClient.get(`get-singlefooditem/${id}`);
    return response.data;
};

// single customer 
export const singleCustomer = async (id) => {
    const response = await axiosClient.get(`get-customer/${id}`);
    return response.data;
};

// single address
export const singleAddress = async (id) => {
    const response = await axiosClient.get(`get-singleaddress/${id}`);
    return response.data;
};

// view all inventory
export const viewInventory = async () => {
    const response = await axiosClient.get(`all-products`);
    return response.data;
};

// view all vendors
export const viewVendors = async () => {
    const response = await axiosClient.get(`all-vendors`);
    return response.data;
};

// view single vendor
export const singleVendor = async (id) => {
    const response = await axiosClient.get(`single-vendor/${id}`);
    return response.data;
};

// view single ingredient category
export const singleIngredientCategory = async (id) => {
    const response = await axiosClient.get(`single-category/${id}`);
    return response.data;
};

// place inventory order
export const placeInventoryOrder = async (data) => {
    const response = await axiosClient.post(`place-order`, data);
    return response.data;
};

// view all my inventory orders
export const viewMyInventoryOrders = async () => {
    const response = await axiosClient.post(`/get-all-vendor-order`);
    return response.data;
};

// prediction api
export const predictionApi = async (id) => {
    const response = await axiosClient.get(`prediction/${id}`);
    return response.data;
};

// data last week
export const dataLastWeek = async () => {
    const response = await axiosClient.get(`datalastweek`);
    return response.data;
};

// total users and new Users
export const TotalUsers = async () => {
    const response = await axiosClient.get("dashboard");
    return response.data;
}

// all users 
export const AllUsers = async (page) => {
    const response = await axiosClient.get(`all-users?page=${page}`);
    return response.data;
}

// full user info 
export const FullUserInfo = async (id) => {
    const response = await axiosClient.get(`fulluserinfo/${id}`);
    return response.data;
}

// all restaurants
export const AllRestaurants = async (page) => {
    const response = await axiosClient.get(`all-restaurants?page=${page}`);
    return response.data;
}

// search restaurants and users
export const Search = async (data) => {
    const response = await axiosClient.get(`search?name=${data}`);
    return response.data;
}

export const PastOrders = async (id, role) => {
    const response = await axiosClient.get(`pastorders/${id}?role=${role}`);
    return response.data;
}