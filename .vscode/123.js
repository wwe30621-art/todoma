async function  getYouBike() {
  try{
    const resp=await fetch ("https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json")
    const data=await resp.json()
    console.log(data)

  } catch(err)  {
  console.error(err)
}
}
 















async function getYouBike() {
  try { 
    const res =await fetch("https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json");
    const data = await res.json();
    console.log("資料:",data);
     
  }  catch(err)  {
    console.error("錯誤發生: ", err)
  }
  
}

getYouBike()