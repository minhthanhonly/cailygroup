import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import { useEffect, useState } from "react";

export default function NewApplicationDetailEdit(){
  const {id} = useParams();
  const [appName, setAppName] = useState();

  const fetchApplicationById = async () => {
    const res = await axiosPrivate.get("application/edit/" + id);
    const data = res.data;
    const parsedDataJson = JSON.parse(data.datajson);
    setAppName(parsedDataJson.appName)
    const field = [
      ...parsedDataJson.formData, // Giữ nguyên các trường từ dữ liệu cũ
    ];
    // console.log(field);

    const getAllApp = await axiosPrivate.get("newapplication/");
    console.log(getAllApp.data);
  }

  // const fetchNewApplicationByName = async () => {
  //   try {
  //     const res = await axiosPrivate.get("newapplication/detail/" + appName);
  //     const data = res.data;
  //     const parsedFormJson = JSON.parse(data[0].form);
  //     const field = [
  //       ...parsedFormJson.reactFormData, // Giữ nguyên các trường từ dữ liệu cũ
  //     ];
  //   } catch (error) {
  //     console.error('Error fetching data: ', error);
  //   }
  // }

  useEffect(()=>{
    fetchApplicationById();
    // fetchNewApplicationByName();
  },[])
  return (
    <h1>{id}</h1>
  )
}
