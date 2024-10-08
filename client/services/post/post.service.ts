import { ApolloError } from "@apollo/client";
import createApolloClient from "../../apollo-client";
import {
  CREATE_POST_MUTATION,
  QUERY_POSTS_PAGGINATION,
  LIKE_DISLIKE_POST,
  Add_CCOMMENT_TO_POST,
  GET_SINGLE_POST,
  SAVE_UNSAVE_POST,
  GET_USER_SAVED_POSTS,
  DELETE_POST,
  EDIT_POST,
  GET_SEARCH_POSTS
} from "./post.gql";

const client = createApolloClient();

export async function createPost(
  textContent: string,
  userEmail: string,
  imageContentUrl?: any,
) {
  try {
    const { data } = await client.mutate({
      mutation: CREATE_POST_MUTATION,
      variables: {
        textContent: textContent.trim(),
        imageContentUrl: imageContentUrl?.trim() || null,
        userEmail,
      },
    });

    const newPost = data.newPost;

    if (!newPost) {
      throw new Error("Failed to create post: No data returned.");
    }

    return newPost;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

export async function getPaginatedPosts(lastPostId?: string) {
  try {
    const { data } = await client.query({
      query: QUERY_POSTS_PAGGINATION,
      variables: { lastPostId },
    });

    const posts = data.paginatedPosts;
    return posts;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

export async function clickOnLike(
  postId: string,
  userId: string,
  isLiked: boolean,
) {
  try {
    const result = await client.mutate({
      mutation: LIKE_DISLIKE_POST,
      variables: {
        postId,
        userId,
        isLiked,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

export async function clickOnSave(
  postId: string,
  userId: string,
  isSaved: boolean,
) {
  try {
    const result = await client.mutate({
      mutation: SAVE_UNSAVE_POST,
      variables: {
        postId,
        userId,
        isSaved,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

export async function createComment(
  textContent: string,
  userEmail: string,
  postId: string,
  imageContentUrl?: any,
) {
  try {
    const result = await client.mutate({
      mutation: Add_CCOMMENT_TO_POST,
      variables: {
        textContent,
        userEmail,
        postId,
        imageContentUrl,
      },
    });

    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

export async function getUserSavePosts(userEmail: string) {
  try {
    const { data } = await client.query({
      query: GET_USER_SAVED_POSTS,
      variables: {
        userEmail,
      },
    });

    const result = data.userSavedPosts;
    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}


export async function getSearchResultsPosts(searchPostsQuery: string) {
  console.log("searchPostsQuery",searchPostsQuery);
  try {
    const { data } = await client.query({
      query: GET_SEARCH_POSTS,
      variables: {
        searchPostsQuery,
      },
    });

    const result = data.userSavedPosts;
    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

export async function getSinglePost(postId: string) {
  try {
    const { data } = await client.query({
      query: GET_SINGLE_POST,
      variables: {
        postId,
      },
    });

    const result = data.singlePost;
    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

export async function deletePost(userEmail: string, postId: string) {
  try {
    const { data } = await client.mutate({
      mutation: DELETE_POST,
      variables: {
        userEmail,
        postId,
      },
    });

    const result = data.deletedPost;
    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

export async function editPost(
  textContent: string,
  userEmail: string,
  postId: string,
) {
  try {
    const { data } = await client.mutate({
      mutation: EDIT_POST,
      variables: {
        textContent,
        userEmail,
        postId,
      },
    });

    const result = data.editedPost;
    return result;
  } catch (error) {
    if (error instanceof ApolloError) {
      console.error("GraphQL error details:", error.graphQLErrors);
      console.error("Network error details:", error.networkError);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}
