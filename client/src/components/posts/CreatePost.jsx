import { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoClose, IoEarth } from "react-icons/io5";
import Avatar from "../common/Avatar";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const addPost = async (data, axiosSecure) => {
    const { post, uid } = data;
    const postData = {
      post,
      uid,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const result = await axiosSecure.post("/posts", postData);
    console.log(result)
    return result;
};

const CreatePost = () => {
  const { user } = use(AuthContext);
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState("");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data)=>addPost(data, axiosSecure),
    onSuccess: () => {
      setOpen(false)
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
    },
  });

  const handleOnChangePost = (e) => {
    setPost(e.target.value);
  };

  const postSubmit = () => {
    mutation.mutate({ post, uid: user.uid }, axiosSecure);
  };

  return (
    <div className="bg-base-300 rounded-xl py-5">
      <div className="flex w-full gap-2 f  justify-center  ">
        <div className="">
          <div className="avatar avatar-online ">
            <div className="w-13 rounded-full">
              <img src={user.photoURL} />
            </div>
          </div>
        </div>
        <div onClick={() => setOpen(true)} className="min-w-[400px] relative">
          <div className="absolute top-[26%] pl-5 text-secondary-content cursor-pointer hover:opacity-20">
            {" "}
            What&apos; on your mind, {user?.displayName}?
          </div>
          <div className="bg-neutral opacity-25 w-full h-13 flex items-center pl-3 rounded-full"></div>
        </div>
      </div>
      <div className="divider"></div>
      <dialog
        onClose={() => setOpen(false)}
        open={open}
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <div>
            <h3 className="font-bold text-lg text-center">Create Post</h3>
            <div className="modal-action absolute top-1 right-5">
              <form method="dialog">
                <button className="w-7 h-7 bg-base-300 rounded-full flex justify-center items-center">
                  <IoClose />
                </button>
              </form>
            </div>
          </div>
          <div className="divider"></div>
          <div>
            <div className="flex gap-1">
              <Avatar
                className={"w-12"}
                photoURL={user?.photoURL}
                displayName={user?.displayName}
              />
              <div>
                <h1 className="font-bold">{user.displayName}</h1>
                <div className="flex gap-2">
                  <div className="text-sm flex items-center gap-1 text-shadow-secondary-content">
                    <IoEarth /> Public
                  </div>
                </div>
              </div>
            </div>

            <div>
              <textarea
                onChange={handleOnChangePost}
                className="w-full border-0 outline-0 focus:outline-0 focus:border-0 mt-5"
                placeholder={`What's on your mind, ${user?.displayName}?`}
              ></textarea>
            </div>

            <button onClick={postSubmit}
              disabled={post.trim().length <= 10 ? true : false}
              className="btn btn-primary w-full mt-5"
            >
              Post
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreatePost;
