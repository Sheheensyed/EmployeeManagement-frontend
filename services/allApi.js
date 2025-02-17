import { commonApi } from "./commonApi"
import { serverUrl } from "./serviceUrl"

// register request
export const requestApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody,"")
}

// login request
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody,"")
}

// add-products
export const addproductApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-products`,reqBody,reqHeader)
}

// get home products
export const getHomeProductsApi = async()=>{
    return await commonApi('GET',`${serverUrl}/home-products`)
}

// get all-products
// query-parameter - syntax - baseUrl?key=value
export const getAllProductsApi = async(searchKey)=>{
    return await commonApi('GET',`${serverUrl}/all-products?search=${searchKey}`)
}

// assign work api
export const assignWorkApi=async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/assign-work`,reqBody,reqHeader)
}