import {GET_ALL_PRODUCT, GET_PRODUCT_BY_SEARCHBAR, GET_PRODUCT_BY_ID} from './actions/action-types'

const initialState = {
    allProducts:[],
    searchProduct:[]
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_ALL_PRODUCT:
            return {
                ...state,
                allProducts: action.payload
            }

        case GET_PRODUCT_BY_ID:
            console.log('llegó al reducer')
            console.log(action.payload)
            return{
                
                ...state, searchProduct:action.payload
            }

        default:
            return { ...state };
    }
};
                
export default rootReducer; 