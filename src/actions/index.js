import _ from 'lodash';
import jsonPlaceholder from "../api/jsonPlaceholder";

export const fetchPostsAndUser = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // Different version of the code below, using lodash .chain
  // const userIds = _.uniq(_.map(getState().posts, 'userId'));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
}

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data})
}

export const fetchUser = id => async dispatch => {
  const response = await  jsonPlaceholder(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data })
}
