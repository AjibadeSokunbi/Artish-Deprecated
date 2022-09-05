
import { AUTH, LOGOUT, UPDATEAUTH, COMPLETEAUTH, UPDATE_USER } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: true, errors: null };

      case UPDATEAUTH:
     return { authData: action.data, loading: true, errors: null }; 

    case COMPLETEAUTH:
      console.log(COMPLETEAUTH)
    localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
    return { ...state, authData: state.authData.map((user) => (user._id === action.data._id ? action.data : user)) 
     
    };



     

      case LOGOUT:
        localStorage.clear();
      return { ...state, authData: null, loading: false, errors: null };
     default:
      return state;
  }
};

export default authReducer;