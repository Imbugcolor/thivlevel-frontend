import React, { createContext, useState, useEffect } from 'react'
import ProductsAPI from 'https://thivlevel-ecommerce-production.up.railway.app/api/ProductsAPI'
import UserAPI from 'https://thivlevel-ecommerce-production.up.railway.app/api/UserAPI'
import CategoriesAPI from 'https://thivlevel-ecommerce-production.up.railway.app/api/CategoriesAPI'
import axios from 'axios'
import OrdersAPI from 'https://thivlevel-ecommerce-production.up.railway.app/api/OrdersAPI'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(false)


    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            const refreshToken = async () => {
                const res = await axios.get('https://thivlevel-ecommerce-production.up.railway.app/user/refresh_token')

                setToken(res.data.accesstoken)

                setTimeout(() => {
                    refreshToken()

                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    }, [])

    ProductsAPI()
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI(),
        ordersAPI: OrdersAPI(token)
    }


    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
