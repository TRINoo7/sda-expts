import React,{useState} from "react"
import axios from "axios"

function App() {
  let nbsp="\u00A0"
  const [data,setState]=useState({
    "sid":"",
    "sname":"",
    "desc":""
  });
  const handleChange=(e)=>{
    setState(data=>({
      ...data,[e.target.name]:e.target.value
    }));
  }
  const storeData=()=>{
    const ud={
      SensorID:data.sid,
      SensorName:data.sname,
      Description:data.desc
    };
    axios.post("http://localhost:3001/c",ud).then((res)=>{
      console.log(res.status,res.data)
      alert("Data Sent successfully")
    });
  }
  const getData=()=>{
    axios.get("http://localhost:3001/g").then((res)=>{
      // console.log(res);
      res.data.result.map((ele)=>{
        console.log(ele);
      })
      alert("Data posted in console")
    });
  }
  const updateData=()=>{
    const ud={
      SensorID:data.sid,
      SensorName:data.sname,
      Description:data.desc
    };
    axios.post("http://localhost:3001/u",ud).then((res)=>{
      console.log(res.status,res.data)
      alert(res.data)
    })
  }
  const deleteData=()=>{
    const ud={
      SensorID:data.sid,
      SensorName:data.sname,
      Description:data.desc
    };
    axios.post("http://localhost:3001/d",ud).then((res)=>{
      console.log(res.status,res.data);
      alert("Data successfully deleted")
    })
  }
  return (
    <>
    <div>
      <p><label>Sensor ID:{nbsp}</label><input type="text" name="sid" value={data.sid} onChange={handleChange}/></p>
      <p><label>Sensor Name:{nbsp}</label><input type="text" name="sname" value={data.sname} onChange={handleChange}/></p>
      <p><label>Description:</label><br/><textarea rows={4} cols={20} name="desc" value={data.desc} onChange={handleChange}/></p>
      <p><button onClick={storeData}>Submit</button></p>
      <p><button onClick={getData}>Fetch</button></p>
      <p><button onClick={updateData}>Update</button></p>
      <p><button onClick={deleteData}>Delete</button></p>
    </div>
    </>
  );
}

export default App;
