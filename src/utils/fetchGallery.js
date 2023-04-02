const axios = require('axios');


export const fetchButcheredOwned = async(walletAddress) => {
    try{
        // post image to api
        let data = {"image": ''}
        let imgReturn = await axios.post(process.env.REACT_APP_BUTCHER_API + '/upload', data, {
            headers: {
                'authorization' : 'Bearer ',
                'Content-Type' : 'application/json'
            }
        }) 

                
        return {
            success: true,
            status: "NFT butchered. Minting tokens.",
        }

    } catch(error){
        return {
            success: false,
            butcherStatus: "😥 Something went wrong: " + error.message
        }    
    }
        
}


export const fetchButcheredProject = async(metadata) => {
    try{

        // post image to api
        let data = {"image": ''}
        let imgReturn = await axios.post(process.env.REACT_APP_BUTCHER_API + '/upload', data, {
            headers: {
                'authorization' : 'Bearer ',
                'Content-Type' : 'application/json'
            }
        }) 
        

                
        return {
            success: true,
            status: "NFT butchered. Minting tokens.",
        }

    } catch(error){
        return {
            success: false,
            butcherStatus: "😥 Something went wrong: " + error.message
        }    
    }
        
}

export const fetchButcheredAll = async() => {
    try{

        // post image to api
        let data = {"image": ''}
        let imgReturn = await axios.post(process.env.REACT_APP_BUTCHER_API + '/upload', data, {
            headers: {
                'authorization' : 'Bearer ',
                'Content-Type' : 'application/json'
            }
        }) 
        

                
        return {
            success: true,
            status: "NFT butchered. Minting tokens.",
        }

    } catch(error){
        return {
            success: false,
            butcherStatus: "😥 Something went wrong: " + error.message
        }    
    }
        
}



