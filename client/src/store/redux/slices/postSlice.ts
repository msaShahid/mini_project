import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { postApi } from "../../../api/postApi";
import { Post, CreatePostPayload } from "../../../types/Post";

interface PostState {
  posts: Post[];
  myPosts: Post[];
  selectedPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  myPosts: [],
  selectedPost: null,
  loading: false,
  error: null,
};


// Thunks

// Get all posts
export const fetchPosts = createAsyncThunk<Post[], void>(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await postApi.getAllPosts();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch posts");
    }
  }
);

// Get my posts
export const fetchMyPosts = createAsyncThunk<Post[], void>(
  "posts/fetchMyPosts",
  async (_, { rejectWithValue }) => {
    try {
      return await postApi.getMyPosts();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch your posts");
    }
  }
);

// Get post by ID
export const fetchPostById = createAsyncThunk<Post, string>(
  "posts/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      return await postApi.getPostById(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Post not found");
    }
  }
);

// Create Post
export const createPost = createAsyncThunk<Post, CreatePostPayload>(
  "posts/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await postApi.createPost(payload);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create post");
    }
  }
);

// Update Post
export const updatePost = createAsyncThunk<
  Post,
  { id: string; data: Partial<CreatePostPayload> }
>(
  "posts/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      return await postApi.updatePost(id, data);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update post");
    }
  }
);

// Delete Post
export const deletePost = createAsyncThunk<string, string>(
  "posts/delete",
  async (id, { rejectWithValue }) => {
    try {
      await postApi.deletePost(id);
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete post");
    }
  }
);

// Slice
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearSelectedPost: (state) => {
      state.selectedPost = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH ALL POSTS 
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH MY POSTS 
      .addCase(fetchMyPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.myPosts = action.payload;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH POST BY ID 
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action: PayloadAction<Post>) => {
        state.loading = false;
        state.selectedPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE POST 
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.posts.unshift(action.payload);
        state.myPosts.unshift(action.payload);
      })

      // UPDATE POST 
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        const updated = action.payload;
        state.posts = state.posts.map((p) => (p._id === updated._id ? updated : p));
        state.myPosts = state.myPosts.map((p) => (p._id === updated._id ? updated : p));
        state.selectedPost = updated;
      })

      // DELETE POST 
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        const removedId = action.payload;
        state.posts = state.posts.filter((p) => p._id !== removedId);
        state.myPosts = state.myPosts.filter((p) => p._id !== removedId);
      });
  },
});

export const { clearSelectedPost } = postSlice.actions;

export default postSlice.reducer;
