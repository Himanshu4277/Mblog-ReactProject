import { useEffect } from "react"
import { useForm } from "react-hook-form"
import services from "../Appwrite/C"
import EditorE from "./Editor"
import Button from "../components/Button";
import Input from "./Input"
import Select from "./Select"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            Title: post?.Title || "",
            Content: post?.Content || "",
            status: post?.status || "active",
            slug: post?.slug || "",
        }
    })
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        try {
            if (post) {
                const file = (await data.image[0] ? services.uploadFile(data.image[0]) : null)
                if (file) {
                    services.deleteFile(post.featuredImage)
                }
                const dbPost = await services.updatePost(
                    post.$id,
                    {
                        ...data,
                        featuredImage: file ? file.$id : undefined,


                    }
                )
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                const file = await services.uploadFile(data.image[0])

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;

                    const dbPost = await services.createPost({
                        ...data,
                        UserId: userData.$id
                    })
                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.log("Error in submit:", error);

        }
    }
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "Title") {
                setValue("slug", value.Title.replace(/\s+/g, "-").toLowerCase())
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, setValue])
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("Title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", e.target.value.replace(/\s+/g, "-").toLowerCase(), { shouldValidate: true });
                    }}
                />
                <EditorE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        {post['Featured-Images'] && (
                            <img src={services.getFilePreview(post['Featured-Images'])} alt={post.Title} />
                        )}
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm