import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const CreateTask = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    console.log(data);
    // const status = 'todo';
    // const task = {
    //   data,
    //   status,
    // };

    fetch('http://localhost:5000/addtask', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.data); // Update status locally

        Swal.fire({
          title: 'WOOHOOO!!!! Welcome To The World!!!!',
          width: 600,
          padding: '3em',
          color: '#7CFC00',
          background: '#fff url()',
          backdrop: `
              rgba(0,0,123,0.4)
              top
              no-repeat
            `,
        });
      });
  };


  return (
    <div className="max-w-3xl mx-auto mt-20">
    <h1 className="text-5xl font-bold text-center mb-7">Add a Task</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Title
          </label>
          <input
            className="input input-bordered bg-[#F2F2F2]"
            type="text"
            id="title"
            {...register('title')}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Description
          </label>
          <textarea
            className="input input-bordered bg-[#F2F2F2]"
            type="text"
            id="description"
            {...register('description')}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Deadline
          </label>
          <input
            className="input input-bordered bg-[#F2F2F2]"
            type="date"
            id="date"
            {...register('date')}
          />
        </div>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Priority
          </label>
          <select
            className="input input-bordered bg-[#F2F2F2]"
            id="priority"
            {...register('priority')}
          >
            <option defaultValue value="high">
              High
            </option>
            <option value="medium">Moderate</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="flex gap-3 justify-end">
          <button type="submit" className="btn btn-primary ">
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
