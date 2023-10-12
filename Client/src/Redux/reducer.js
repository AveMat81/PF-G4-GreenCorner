import {
  POST_PRODUCT,
  DELETE_PRODUCT_BY_ID,
  UPDATE_PRODUCT_BY_ID,
  GET_ALL_PRODUCT,
  RESET_ALL_FAVORITES,
  GET_PRODUCT_CART,
  GET_PRODUCT_TRENDING,
  GET_PRODUCT_BY_NAME,
  GET_CATEGORIES,
  FILTER_CATEGORY,
  FILTER_FAV__CATEGORY,
  GET_PRODUCT_BY_ID,
  ORDER_BY_NAME,
  ORDER_FAV_BY_NAME,
  ORDER_BY_PRICE,
  ORDER_FAV_BY_PRICE,
  RESET_ALL_PRODUCT,
  GET_ALL_USER,
  GET_USER_BY_NAME,
  GET_USER_BY_ROL,
  GET_USER_BY_ID,
  DELETE_USER,
  POST_USER,
  GET_CATEGORIES_SHOP,
  GET_USER_BY_EMAIL,
  UPDATE_USER,
  SET_CURRENT_PAGE,
  GET_FAVORITES,
  POST_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  FIND_FAV_BY_NAME
} from "./actions/action-types";

const initialState = {
  allProducts: [],
  favorites: [],
  product: [],
  productCart: [],
  productTrending: [],
  categories: [],
  searchProduct: [],
  searchByName: [],
  productDetail: [],
  allUsers: [],
  userDetail: [],
  pagination: {
    currentPage: 1,
  },
  allFavorites: [],
};

function updater(product, id, updatedProductData) {
  const index = product.findIndex((item) => item.id === id);

  if (index !== -1) {
    const currentProduct = product[index];

    for (const property in updatedProductData) {
      if (updatedProductData.hasOwnProperty(property)) {
        if (currentProduct.hasOwnProperty(property)) {
          currentProduct[property] = updatedProductData[property];
        }
      }
    }

    product[index] = currentProduct;
  }
}

let productSorted = [];
let favoritesSorted = [];
let products = [];
let favorites = [];
//Para filtro en favorites
let productMatch= []
let availableProducts = [];
let availableSearchbar = [];

/* Edit */
let updatedProductId;
let updatedProductData;
let updatedAllProducts;

//action.payload === allFavorites 
// paso 1= filtrar todos los productos por el action.payload( voy a tener de resultado todos ls productos con sus categorias pero que sean de favoritos)
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      availableProducts = action.payload.filter(
        (product) => product.available === true
      );
      // console.log (availableProducts)
      return {
        ...state,
        allProducts: action.payload,
        product: state.product.length ? state.product : availableProducts,
      };

    case RESET_ALL_PRODUCT:
      return {
        ...state,
        product: availableProducts,
      };
      case RESET_ALL_FAVORITES:
        return {
          ...state,
          favorites: state.allFavorites,
        };
    case GET_PRODUCT_BY_NAME:
      availableSearchbar = action.payload.filter(
        (product) => product.available === true
      );
      return {
        ...state,
        product: availableSearchbar,
        allProducts: action.payload,
      };

    case GET_PRODUCT_CART:
      return {
        ...state,
        productCart: action.payload,
      };

    case POST_PRODUCT_CART:
      return {
        ...state,
        productCart: [...state.productCart, action.payload],
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };

    case UPDATE_PRODUCT_BY_ID:
      updatedProductId = action.payload.id;
      updatedProductData = action.payload.updatedProductData;
      updatedAllProducts = state.allProducts.map((product) => {
        if (product.product_id === updatedProductId) {
          return { ...product, ...updatedProductData };
        } else {
          return product;
        }
      });
      return {
        ...state,
        allProducts: updatedAllProducts,
      };
    case GET_PRODUCT_TRENDING:
      return {
        ...state,
        productTrending: state.allProducts.filter(
          (product) => product.isTrending === true
        ),
      };

    case POST_PRODUCT:
      return {
        ...state,
        product: [...state.product, action.payload],
      };

    //Por ahora no va
    case GET_CATEGORIES:
      // const categories = [];

      // state.product.forEach((product) => {
      //   product.categories.forEach((category) => {
      //     categories.push(category);
      //   });
      // });

      // const Category = Array.from(new Set(categories.map(JSON.stringify))).map(JSON.parse);

      return {
        ...state,
        categories: action.payload,
      };

    case GET_CATEGORIES_SHOP:
      const categories = [];

      state.product.forEach((product) => {
        product.categories.forEach((category) => {
          categories.push(category);
        });
      });

      const Category = Array.from(new Set(categories.map(JSON.stringify))).map(
        JSON.parse
      );

      return {
        ...state,
        categories: Category,
      };
    case FIND_FAV_BY_NAME:
    
      favorites=state.allFavorites.find((fav)=> { if(fav.Product){ return fav.Product.name === action.payload} else {return fav.name===action.payload}})
      favorites ? console.log('sii') : console.log('noo')
      return{
        ...state,
        favorites:favorites
      }

    case FILTER_CATEGORY:
      return {
        ...state,
        product: state.allProducts.filter((products) => {
          return products.categories.some(
            (category) => category.name === action.payload
          );
        }),
      };
      case FILTER_FAV__CATEGORY:
        productMatch=state.allProducts.filter((p)=>state.allFavorites.some(fav=>fav.Product ? fav.Product.product_id===p.product_id : fav.product_id===p.product_id))
        console.log( productMatch)
        return {
          ...state,
          favorites: productMatch.filter((pm) => {
            return pm.categories.some(
              (category) => category.name === action.payload
            );
          }),
        };
  
      case DELETE_PRODUCT_BY_ID:
        return {
          ...state,
          allProducts: state.allProducts.filter((product) => product.id !== action.payload.id),
        };

    /*       case UPDATE_PRODUCT_BY_ID:

                  const { id, updatedProductData } = action.payload;
                  const newProducts = [...state.product]
      
                  updater(newProducts, id, updatedProductData)
                  return {
                      ...state,
                      product: newProducts
      
                  } */

    case ORDER_FAV_BY_NAME:
      favorites = [...state.favorites];
     
      favoritesSorted = favorites.sort(function (a, b) { if(a.Product){
        if (a.Product.name > b.Product.name) {
          return action.payload === "asc" ? 1 : -1;
        }
        if (a.Product.name < b.Product.name) {
          return action.payload === "asc" ? -1 : 1;
        }} 
         if (a.name > b.name) {
          return action.payload === "asc" ? 1 : -1;
        }
        if (a.name < b.name) {
          return action.payload === "asc" ? -1 : 1;
        }
        
        return 0;
      });
      return {
        ...state,
        favorites: favoritesSorted,
      };

      case ORDER_BY_NAME:
        products = [...state.product];
        productSorted = products.sort(function (a, b) {
          if (a.name > b.name) {
            return action.payload === "asc" ? 1 : -1;
          }
          if (a.name < b.name) {
            return action.payload === "asc" ? -1 : 1;
          }
          return 0;
        });
        return {
          ...state,
          product: productSorted,
        };
  

    case ORDER_BY_PRICE:
      products = [...state.product];
      productSorted = 
        action.payload === "low"
          ? products.sort((a, b) => a.price - b.price)
          : products.sort((a, b) => b.price - a.price);

      return {
        ...state,
        product: productSorted,
      };

      case ORDER_FAV_BY_PRICE:
        favorites = [...state.favorites];
       
        favoritesSorted = favorites[0].Product ?
          action.payload === "low"
            ? favorites.sort((a, b) => a.Product.price - b.Product.price)
             
            : favorites.sort((a, b) => b.Product.price - a.Product.price)
            :
            action.payload === "low"
            ? favorites.sort((a, b) => a.price - b.price)
             
            : favorites.sort((a, b) => b.price - a.price)
  
            console.log(favoritesSorted)
        return {
          ...state,
          favorites: favoritesSorted,
        };
  
    //case GET_ALL_USER:
    //return {
    // ...state,
    // user: state.user,
    // };

    case GET_USER_BY_NAME:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        userDetail: action.payload,
        userDetail: action.payload,
      };

    case GET_USER_BY_ROL:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_USER_BY_EMAIL:
      return {
        ...state,
        userDetail: action.payload,
      };

      case POST_USER:
        return {
          ...state,
          userDetail: action.payload,
        };

    case UPDATE_USER:
      return {
        ...state,
        userDetail: action.payload,
      };

    case SET_CURRENT_PAGE: // Nuevo caso para manejar la acción de paginación
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload,
        },
      };

    case GET_FAVORITES:
      console.log(action.payload);
      return {
        ...state,
        allFavorites: action.payload,
          favorites:action.payload,
      };
    case DELETE_PRODUCT_CART:
      return {
        ...state,
        productCart: state.productCart.filter(
          (product) => product.id !== action.payload
        ),
      };

    case GET_ALL_USER:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default rootReducer;