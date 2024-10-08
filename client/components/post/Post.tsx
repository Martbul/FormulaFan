"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import {
  Heart,
  HeartFilled,
  CommentIcon,
  ShareIcon,
  SaveIcon,
  OptionsIcon,
  SaveIconFill,
} from "@/utils/svgIcons";
import { clickOnLike, clickOnSave } from "@/services/post/post.service";
import { useState, useOptimistic, startTransition } from "react";
import dynamic from "next/dynamic";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext2";
import moment from "moment";
import { Toaster } from "@/components/ui/toaster";

const DynamicCreateCommentModal = dynamic(
  () => import("../../components/posts/CreateCommentModal/CreateCommentModal"),
  {
    ssr: false,
  },
);

const DynamicAuthorPostOptionsMenu = dynamic(
  () => import("./AuthorPostOptionsMenu/AuthorPostOptionsMenu"),
  {
    ssr: false,
  },
);
const DynamicUserPostOptionsMenu = dynamic(
  () => import("./UserPostOptionsMenu/UserPostOptionsMenu"),
  {
    ssr: false,
  },
);

const DynamicSharePostModal = dynamic(
  () => import("../posts/SharePostModal/SharePostModal"),
  {
    ssr: false,
  },
);

const Post = ({ post, userId }) => {
  const { user } = useAuthContext();

  const router = useRouter();
  const [isLiked, setIsLiked] = useState<boolean>(
    post?.likedBy.some((user) => user.id === userId),
  );
  const [isAuthor, setIsAuthor] = useState<boolean>(
    post?.author.email === user.email,
  );

  const [isSaved, setIsSaved] = useState<boolean>(
    post?.savedBy.some((user) => user.id === userId),
  );
  const [likeCount, setLikeCount] = useState<number>(post?.likedBy.length);
  const [commentCount, setCommentCount] = useState<number>(
    post?.comments.length,
  );
  const [savesCount, setSavesCount] = useState<number>(post?.savedBy.length);

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(likeCount);
  const [optimisticSaves, setOptimisticSaves] = useOptimistic(savesCount);

  const handleLike = async () => {
    const newLikeCount = optimisticLikes + (isLiked ? -1 : 1);
    setOptimisticLikes(newLikeCount);
    setIsLiked(!isLiked);

    try {
      const result = await clickOnLike(post.id, userId, isLiked);
      if (result.data.likeDislike === "Post was liked") {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      } else if (result.data.likeDislike === "Post was disliked") {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      }
    } catch (error) {
      startTransition(() => {
        setOptimisticLikes(optimisticLikes);
        setIsLiked(!isLiked);
      });
      console.error("Failed to update like status:", error);
    }
  };

  const handleSave = async () => {
    startTransition(() => {
      const newSaveCount = optimisticSaves + (isSaved ? -1 : 1);
      setOptimisticSaves(newSaveCount);
      setIsSaved(!isSaved);
    });

    try {
      const result = await clickOnSave(post.id, userId, isSaved);
      if (result.data.saveUnsave === "Post was saved") {
        setIsSaved(true);
        setSavesCount(savesCount + 1);
      } else if (result.data.saveUnsave === "Post was unsaved") {
        setIsSaved(false);
        setSavesCount(savesCount - 1);
      }
    } catch (error) {
      startTransition(() => {
        setOptimisticSaves(optimisticSaves);
        setIsSaved(!isSaved);
      });
      console.error("Failed to update save status:", error);
    }
  };
  const handleRedirectToSinglePost = () => {
    router.push(`/posts/${post.id}`);
  };

  const formattedTimestamp = moment(post?.createdAt).fromNow();

  return (
    <div className="mb-4 flex rounded-lg border border-[#3a3a3a] bg-[#1c1c1c] p-4 text-gray-300">
      <div className="flex flex-1 flex-col">
        <div onClick={handleRedirectToSinglePost}>
          <div className="postHeader mb-4 flex items-center">
            <Image
              src={post?.author.picture}
              alt="pic"
              className="profilePic h-12 w-12"
              width={40}
              height={40}
            />
            <div className="postInfo ml-4 flex flex-col gap-1">
              <div className="userData flex flex-col">
                <span className="username font-bold">
                  {post?.author.username}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                <span className="timestamp">{formattedTimestamp}</span>
              </div>
            </div>
          </div>
          <div className="postContent mb-4 text-gray-300">
            {post?.textContent}
            {post?.imageContentUrl && (
              <Image
                src={post?.imageContentUrl}
                alt="pic"
                className="mt-2 h-36 w-36 rounded-lg"
                width={144}
                height={144}
              />
            )}
          </div>
        </div>

        <div className="postActions mt-2 flex items-center justify-between border-t border-gray-600 pt-2 text-gray-400">
          <div className="flex items-center space-x-4">
            <div
              className="likes flex cursor-pointer items-center space-x-1"
              onClick={handleLike}
            >
              {isLiked ? (
                <HeartFilled className="h-6 w-6 text-red-500" />
              ) : (
                <Heart className="h-6 w-6" />
              )}
              <p className="text-sm">{optimisticLikes}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className="comments flex cursor-pointer items-center space-x-1">
                  <CommentIcon className="h-5 w-5" />
                  <p className="text-sm">{commentCount}</p>
                </div>
              </DialogTrigger>
              <DynamicCreateCommentModal
                postId={post?.id}
                setCommentCount={setCommentCount}
              />
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="shares flex cursor-pointer items-center space-x-1">
                  <ShareIcon className="h-6 w-6" />
                  <p className="text-sm">{post?.shares}</p>
                </div>
              </DialogTrigger>
              <DynamicSharePostModal postId={post?.id} />
            </Dialog>

            <div
              className="saves flex cursor-pointer items-center space-x-1"
              onClick={handleSave}
            >
              {isSaved ? (
                <SaveIconFill className="h-6 w-6 text-red-500" />
              ) : (
                <SaveIcon className="h-6 w-6" />
              )}
              <p className="text-sm">{optimisticSaves}</p>
            </div>
          </div>
        </div>
      </div>
      {isAuthor === true && (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-full flex-col hover:rounded-full hover:bg-gray-700 hover:opacity-70">
            <OptionsIcon className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DynamicAuthorPostOptionsMenu post={post} />
        </DropdownMenu>
      )}

      {isAuthor === false && (
        <DropdownMenu>
          <DropdownMenuTrigger className="h-full flex-col hover:rounded-full hover:bg-gray-700 hover:opacity-70">
            <OptionsIcon className="h-5 w-5" />
          </DropdownMenuTrigger>
          <DynamicUserPostOptionsMenu post={post.id} />
        </DropdownMenu>
      )}
      <Toaster />
    </div>
  );
};

export default Post;
