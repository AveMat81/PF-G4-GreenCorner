import {GET_ALL_PRODUCT, GET_PRODUCT_BY_SEARCHBAR, GET_PRODUCT_BY_ID} from './actions/action-types'

const initialState = {
    searchProduct:[],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case GET_PRODUCT_BY_ID:
            return{
                ...state, searchProduct:action.payload
            }

        default:
            return { ...state };
    }
};
                
export default rootReducer; 