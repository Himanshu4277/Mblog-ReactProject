import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../Appwrite/C";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Container from "../components/container/Container";
import ColorThief from "colorthief";

export default function Post() {
  const [post, setPost] = useState(null);
  const [bgColor, setBgColor] = useState("#ffffff");
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.UserId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) {
          setPost(post);

          // Extract dominant color using ColorThief
          const imageUrl = services.getFilePreview(post["Featured-Images"]);
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = imageUrl;

          img.onload = () => {
            try {
              const colorThief = new ColorThief();
              const result = colorThief.getColor(img); // returns [r, g, b]
              setBgColor(`rgb(${result[0]}, ${result[1]}, ${result[2]})`);
            } catch (error) {
              console.error("ColorThief error:", error);
              setBgColor("#ffffff"); // fallback
            }
          };
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    services.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10">
      <Container>
        <div
          className="w-full flex justify-center mb-6 relative border rounded-2xl p-4 shadow-md"
          style={{ backgroundColor: bgColor }}
        >
          {post["Featured-Images"] && (
            <img
              src={services.getFilePreview(post["Featured-Images"])}
              alt={post.Title}
              className="rounded-xl max-h-[300px] w-full object-contain"
              crossOrigin="anonymous"
            />
          )}

          {isAuthor && (
            <div className="absolute right-4 top-4 flex space-x-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="px-4 py-1 text-sm">
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="px-4 py-1 text-sm"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{post.Title}</h1>
        </div>

        <div className="prose prose-lg max-w-none text-gray-700">
          {parse(post.Content)}
        </div>
      </Container>
    </div>
  ) : null;
}
