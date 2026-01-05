import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../Api.jsx";
import moment from "moment";

const Blog = () => {


  const { register, handleSubmit, reset } = useForm();



  const [blogList, setBlogList] = useState([]);

  const [id, setId] = useState(null);

  const [image, setImage] = useState("");

  const formatDate = (date) =>
    moment(date).format("MMMM Do YYYY, h:mm:ss A");





  async function onSubmit(data) {


    const formData = new FormData();



    formData.append("b_title", data.b_title);
    formData.append("b_category", data.b_category);



    if (data.b_image?.[0]) {
      formData.append("b_image", data.b_image[0]);
    }

    if (id === null) {
      await Api.post("/blog", formData, { withCredentials: true });
      alert("Blog Created");
    } else {
      await Api.put(`/blog?id=${id}`, formData, {
        withCredentials: true,
      });
      alert("Blog Updated");
    }

    resetForm();
    fetchBlogs();

  }



 
  async function fetchBlogs() {

    const res = await Api.get("/blog", { withCredentials: true });

    if (res.data.records) {
      setBlogList(res.data.records);
    } else {
      setBlogList([]);
    }
  }




  async function trash(id) {

    if (confirm("Are you sure?")) {
      await Api.delete(`/blog/${id}`, { withCredentials: true });
      fetchBlogs();
    }

  }


  
  function update(blog) {

    setId(blog._id);
    setImage(
      `${import.meta.env.VITE_IMAGE_URL}/${blog.b_image}`
    );
    reset({
      b_title: blog.b_title,
      b_category: blog.b_category,
      b_desc: blog.b_desc,
    });
  }


  function resetForm() {
    reset({
      b_title: "",
      b_category: "",
      b_desc: "",
      b_image: "",
    });
    setId(null);
    setImage("");
  }



  useEffect(() => {
    fetchBlogs();
  }, []);




  return (
    <>
      <div className="container mt-5">
        <div className="card modern-card p-4" style={{maxWidth: '600px', margin: '0 auto'}}>
          <div className="card-header card-header-modern text-center mb-3">
            <h4 className="mb-0">Add Blog</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="mb-4">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                placeholder="Enter title"
                {...register("b_title")}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Category</label>
              <input
                className="form-control"
                placeholder="Enter category"
                {...register("b_category")}
              />  
            </div>

            <div className="mb-4">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                {...register("b_image")}
              />
            </div>

            {id && (
              <div className="mb-4 text-center">
                <img src={image} width="100" height="100" className="rounded mb-3" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}} alt="Preview" />
              </div>
            )}

            <button className="btn btn-primary w-100 btn-modern">
              {id === null ? "Submit" : "Update"}
            </button>
          </form>
        </div>
      </div>

      <div className="container mt-4">
        <div className="modern-table-wrapper" style={{overflowX: 'auto'}}>
          <table className="table modern-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Image</th>
                <th>Created</th>
                <th>Updated</th>
                <th>User Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {blogList.map((blog, index) => (
                <tr key={blog._id}>
                  <td>{index + 1}</td>
                  <td>{blog.b_title}</td>
                  <td>{blog.b_category}</td>
                  <td>
                    <img
                      src={`${import.meta.env.VITE_IMAGE_URL}/${blog.b_image}`}
                      width="80"
                      height="80"
                      className="rounded"
                      alt="Blog"
                    />
                  </td>
                  <td>{formatDate(blog.createdAt)}</td>
                  <td>{formatDate(blog.updatedAt)}</td>
                  <td>{blog.user_id?.u_email}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => trash(blog._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => update(blog)}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Blog;
