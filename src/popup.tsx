import axios from "axios"
import "~style.css"
import React, { useState } from "react"

// location type 
interface locationType {
  city: String
  country: String
}

function IndexPopup() {
  
  const [location, setLocation] = useState<locationType | null>(null)
  const [btnState, setBtnState] = useState<Boolean>(false)

  // function to fetch location
  const getLocation = async (): Promise<void> => {
    try{
      setBtnState(true)
      const ipAddr = await getIpAddress()
      const { data } = await axios.get(`https://ipinfo.io/${ipAddr}?token=${process.env.PLASMO_PUBLIC_TOKEN}`);
      setLocation({ city: data.city, country: data.country })
      setBtnState(false)
    }catch(err){
      alert("Error Occurred")
      setBtnState(false);
      console.log(err);
    }
  }

  // function to get ip address
  const getIpAddress = async (): Promise<String> => {
    const { data } = await axios.get("https://api.ipify.org?format=json")
    return data?.ip
  }

  return (
    <div className="plasmo-w-[500px] plasmo-h-[500px] plasmo-bg-[#171e2e] plasmo-flex plasmo-justify-center plasmo-items-center">
      <button
        onClick={getLocation}
        className="plasmo-bg-[] hover:plasmo-bg-white hover:plasmo-text-[#171e2e]
         plasmo-text-white plasmo-p-[16px] plasmo-rounded plasmo-border-white 
         plasmo-border-solid plasmo-border-[1px] plasmo-text-[18px]"
        disabled={btnState as boolean}
      >
        {btnState ? "Loading..." : "Show My Location"}
      </button>

      {location && (
        <div className="plasmo-absolute plasmo-top-[20%] plasmo-text-[24px] plasmo-text-white  ">
          Your country is {location?.country} and city is {location?.city}
        </div>
      )}
    </div>
  )
}

export default IndexPopup
