import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IArabicSound, defaultValue } from 'app/shared/model/arabic-sound.model';

export const ACTION_TYPES = {
  FETCH_ARABICSOUND_LIST: 'arabicSound/FETCH_ARABICSOUND_LIST',
  FETCH_ARABICSOUND: 'arabicSound/FETCH_ARABICSOUND',
  CREATE_ARABICSOUND: 'arabicSound/CREATE_ARABICSOUND',
  UPDATE_ARABICSOUND: 'arabicSound/UPDATE_ARABICSOUND',
  DELETE_ARABICSOUND: 'arabicSound/DELETE_ARABICSOUND',
  RESET: 'arabicSound/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IArabicSound>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ArabicSoundState = Readonly<typeof initialState>;

// Reducer

export default (state: ArabicSoundState = initialState, action): ArabicSoundState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ARABICSOUND_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ARABICSOUND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ARABICSOUND):
    case REQUEST(ACTION_TYPES.UPDATE_ARABICSOUND):
    case REQUEST(ACTION_TYPES.DELETE_ARABICSOUND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ARABICSOUND_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ARABICSOUND):
    case FAILURE(ACTION_TYPES.CREATE_ARABICSOUND):
    case FAILURE(ACTION_TYPES.UPDATE_ARABICSOUND):
    case FAILURE(ACTION_TYPES.DELETE_ARABICSOUND):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARABICSOUND_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ARABICSOUND):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ARABICSOUND):
    case SUCCESS(ACTION_TYPES.UPDATE_ARABICSOUND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ARABICSOUND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/arabic-sounds';

// Actions

export const getEntities: ICrudGetAllAction<IArabicSound> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ARABICSOUND_LIST,
  payload: axios.get<IArabicSound>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IArabicSound> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ARABICSOUND,
    payload: axios.get<IArabicSound>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IArabicSound> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ARABICSOUND,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IArabicSound> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ARABICSOUND,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IArabicSound> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ARABICSOUND,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
