import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../Api.jsx";
// import { update } from "../../backend/controllers/blog.controller";

import moment from 'moment'

const AddImage = () => {


  const formatDate = (date) => {
    // return new Date(date).toLocaleDateString();
    // return moment(date).format('MMMM Do YYYY')
    // return moment(date).format('MMM Do YYYY')
    // return moment(date).format('MM Do YYYY')
    // return moment(date).format('M Do YY')
    // return moment(date).format('MMM do YY')
    // return moment(date).format('MMM dd YY')
    return moment(date).format('MMMM Do YYYY, h:mm:ss A');
  };


  const { register, reset, handleSubmit } = useForm();


  const [taskList, setBlog] = useState([]);

  const [id, setID] = useState(null)


  const [image, setImage] = useState("")

  async function Add(data) {
    const formData = new FormData();


    console.log(data.task_image);

    const images = data.task_image

    // console.log(images)

    for (var i in images) {
      formData.append("task_image", images[i]);
    }


    formData.append("category", data.category);
    formData.append("title", data.title);




    const res = await Api.post('/task', formData)
    console.log(res.data)
    alert("inserted")


    reset({
      category: "",
      title: "",
      task_image :""
      
    })






    //   await Api.post("/blog", formData);
    showApi()
    reset();
    alert("inserted");








  }




  async function showApi() {

    const res = await Api.get("/task");
    console.log("first")
    console.log(res.data.records);
    setBlog(res.data.records);

  }

  useEffect(() => {
    showApi();
  }, []);



  return (

    <>
      <div className="container mt-5">
        <div className="card modern-card p-4" style={{maxWidth: '600px', margin: '0 auto'}}>
          <div className="card-header card-header-modern text-center mb-3">
            <h4 className="mb-0">Add Image</h4>
          </div>
          <form
            action=""
            encType="multipart/form-data"
            onSubmit={handleSubmit(Add)}
          >
            <div className="mb-4">
              <label className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                {...register("category")}
                placeholder="Enter category"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                {...register("title")}
                placeholder="Enter title"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Image</label>
              <input
                type="file"
                className="form-control"
                {...register("task_image")}
                accept="image/*" multiple
              />
            </div>

            {
              id === null ? <button className="btn btn-primary w-100 btn-modern" type="submit">
                Submit
              </button> : <button className="btn btn-primary w-100 btn-modern" type="submit">
                Update
              </button>

            }
            {
              id === null ? "" : <div className="mt-3 text-center"><img src={image} width="100px" height="100px" className="rounded" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}} alt="Preview" /></div>
            }
          </form>
        </div>
      </div>
      <br />

      <div className="container mt-4">
        <div className="modern-table-wrapper" style={{overflowX: 'auto'}}>
          <table className="table modern-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Title</th>
                <th>Image</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>User Name</th>
              </tr>
            </thead>

            <tbody>

              {taskList &&
                taskList.map((task, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.category}</td>
                    <td>{task.title}</td>

                    <td>
                      <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                        {
                          task.task_image.map((ele, index) => (
                          <img
                          key={index}
                          src={`${import.meta.env.VITE_IMAGE_URL}/${ele}`}
                          width="80"
                          height="80"
                          alt=""
                          className="rounded"
                        />))
                        }
                      </div>
                    </td>
                    <td>{formatDate(task.createdAt)}</td>
                    <td>{formatDate(task.updatedAt)}</td>
                    <td>dummy user</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddImage;
