import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Input, RtE, Select } from "..";
import appwriteService from "../../appwrite/conf";

export default function PostForm({post}) {
    console.log("PostForm rendered with post:", post);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            contenet: post?.contenet || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
//   const userId = userData.id;

  console.log("User data:", userData);

  if (!userData) {
    return <div>Please log in to access this form.</div>;
  }

    const submit = async (data) => {
    try {
        if (!userData) {
            throw new Error("User data is missing or user ID is not available");
        }

        // Ensure userData is defined
        // data.userid = userId; // Add userId to data

        if (post) {
            // Handle update case
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                await appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            // Handle create case
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
            }
            data.userid = userData.$id;
            const dbPost = await appwriteService.createPost({ ...data });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        }
    } catch (error) {
        console.error("PostForm :: submit :: error", error);
        alert("Failed to submit post. Please try again.");
    }
};

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-full md:w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4 w-full"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4 w-full"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RtE label="Content :" name="contenet" control={control} defaultValue={post?.contenet || ""} />
        </div>
        <div className="w-full md:w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4 w-full"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg w-full"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4 w-full"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
    );
}