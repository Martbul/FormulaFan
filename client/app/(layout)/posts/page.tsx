"use client";

import { useEffect, useState, useCallback } from "react";
import { PostsMenu } from "@/components/posts/postsMenu/PostsMenu";
import Post from "@/components/post/Post";

import { getPaginatedPosts } from "@/services/post/post.service";

import Image from "next/image";
import images from "@/constants/images";
import { useInView } from "react-intersection-observer";

import "./Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const fetchMorePosts = useCallback(async () => {
    let paginatedPosts;
    if (posts.length !== 0) {
      paginatedPosts = await getPaginatedPosts(posts[posts.length - 1].id);
    } else {
      paginatedPosts = await getPaginatedPosts();
    }

    if (paginatedPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...paginatedPosts]);
    }
  }, [posts]);

  useEffect(() => {
    fetchMorePosts();
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMorePosts();
    }
  }, [inView, hasMore, fetchMorePosts]);

  return (
    <>
      <div className="layout">
        <div className="posts">
          <PostsMenu />
          <div className="feedContainer">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
            {hasMore && (
              <div ref={ref} className="loading">
                Loading more posts...
              </div>
            )}
          </div>
        </div>

        <div className="news">
          <div className="searchContainer">
            {/* Example of a news item */}
            <div className="newsItem">
              <div className="newsImage">
                <Image src={images.madridNews} alt="News" />
                <div className="newsTextOverlay">
                  <h3 className="newsTitle">News Title</h3>
                  <p className="newsTimestamp">Timestamp</p>
                  <p className="newsCreator">Creator</p>
                </div>
              </div>
            </div>
            <div className="newsItem">
              <div className="newsImage">
                <Image src={images.f1RaceCalendar} alt="News" />
                <div className="newsTextOverlay">
                  <h3 className="newsTitle">News Title</h3>
                  <p className="newsTimestamp">Timestamp</p>
                  <p className="newsCreator">Creator</p>
                </div>
              </div>
            </div>
            <div className="newsItem">
              <div className="newsImage">
                <Image src={images.crashLanceStroll} alt="News" />
                <div className="newsTextOverlay">
                  <h3 className="newsTitle">News Title</h3>
                  <p className="newsTimestamp">Timestamp</p>
                  <p className="newsCreator">Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Posts;
