import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const path = 'https://reqres.in/api';

export const getUserDetailById = createAsyncThunk(
  'user/getUserDetailById',
  async (id_user, thunkAPI) => {
    try {
      const response = await fetch(`${path}/users/${id_user}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const user = await response.json();
      console.log(user);
      return user.data;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const getUserList = createAsyncThunk(
  'user/getUserList',
  async (params, thunkAPI) => {
    try {
      const queryParams = new URLSearchParams(params).toString();
      const response = await fetch(`${path}/users/?${queryParams}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      const users = await response.json();
      console.log(users);
      return users.data;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);
export const postUser = createAsyncThunk(
  'user/postUser',
  async (data, thunkAPI) => {
    try {
      const response = await fetch(`${path}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }
      const users = await response.json();
      console.log(users);
      return users.data;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const patchUser = createAsyncThunk(
  'user/patchUser',
  async ({ data, id }, thunkAPI) => {
    try {
      const response = await fetch(`${path}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }
      const users = await response.json();
      console.log(users);
      return users.data;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${path}/users/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        const errorObject = JSON.parse(errorText);
        console.log('Error response:', errorObject);
        return thunkAPI.rejectWithValue(errorObject);
      }

      console.log('deleteUser was deleted');
      return;
    } catch (error) {
      console.error('Get data error:', error);
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  }
);

const usersSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      id: '',
      first_name: '',
      last_name: '',
      birth_date: '',
      job: '',
      sex: 'FEMALE',
    },
    usersList: [],
    isLoading: false,
  },
  reducers: {
    updateUser: (state, action) => {
      if (state !== undefined) {
        state.user = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    //!get
    builder.addCase(getUserDetailById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserDetailById.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserDetailById.rejected, (state, action) => {
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    builder.addCase(getUserList.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.usersList = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.isLoading = false;
      console.log('Fail to get user data');
    });
    //! post
    builder.addCase(postUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(postUser.rejected, (state, action) => {
      console.log('Fetch error to postuser', action.payload);
    });
    //!patch
    builder.addCase(patchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(patchUser.rejected, (state, action) => {
      console.log('Fetch error to patchUser', action.payload);
    });
    //!delete
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      console.log('Fail to deleteUser');
    });
  },
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;
