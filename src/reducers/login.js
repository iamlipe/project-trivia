// Esse reducer será responsável por tratar as informações da pessoa usuária
import { getUser } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
  nome: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case getUser:
    return { ...state, email: action.email, nome: action.nome };
  default:
    return state;
  }
};

export default user;
