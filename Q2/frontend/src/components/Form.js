import React,{useState} from 'react'
import axios from "axios"
import './Form.css'

export default function Form() 
{
    let nbsp="\u00A0"
    const [state,setState]=useState(
        {
            snode:"End Node",
            sid:"",
            desc:"This is end device"
        }
    );

    const handleChange=(e)=>{
        setState((state)=>({
            ...state,[e.target.name]:e.target.value,
        }));
    };

    const valform=()=>{
        if(state.sid.length!=6)
        {
            alert("SensorID must be six characters or must start with SID!");
            return false;
        }
        let subs=state.sid.substring(0,3);
        if(!(subs=="SID"))
        {
            alert("Sensor ID not starting with SID");
            return false;
        }
        subs=state.sid.substring(3);
        for(let i=0;i<subs.length;i++)
        {
            if(!((subs[i]-'0')>=0 && (subs[i]-'0')<=9))
            {
                alert("Last three characters must be digits!");
                return false;
            }
        }
        return true;
    }

    const handleSubmit=(e)=>{
        if(valform())
        {
            e.preventDefault()
            const userdata={
                SensorNode:state.snode,
                SensorID:state.sid,
                Description:state.desc
            };
            axios.post("http://localhost:3001/submit",userdata).then((res)=>{
                console.log(res.status,res.data);
                alert("Data Posted Successfully")
            });
        }
    }

    const getDetails=()=>{
        try{
            axios.get("http://localhost:3001/getdata").then((res)=>{
                alert(res.data);
            });
        }
        catch(e)
        {
            console.log(e);
        }
    }

    return (
    <div className='body'>
    <div className='Head'>
        IoT Data 
    </div>
    <div className='FormBG'>
        <form onSubmit={handleSubmit}>
            <label>Sensor Node Type:{nbsp}</label>
            <select name="snode" onChange={handleChange}>
                <option value="End Node">End Node</option>
                <option value="Edge Device">Edge Device</option>
                <option value="Gateway">Gateway</option>
            </select><br/><br/>
            <label>Sensor ID:{nbsp}</label>
            <input type='text' name="sid" onChange={handleChange}/><br/><br/>
            <label>Description:{nbsp}</label><br/>
            <textarea rows="4" cols="25" name="desc" onChange={handleChange}/><br/><br/>
            <input type='submit' value="Send Data"/><br/>
        </form>
    </div>
    <div className='Button'><br/>
        <button onClick={getDetails}>Get Data</button>
    </div>
    </div>
  )
}
