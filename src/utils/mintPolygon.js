const axios = require('axios');



export const mintPolygon = async(data, ethTokenId) => {
    try{

        // login to get jwt
        const login = await axios.post(process.env.BUTCHER_LOGIN, {"username": process.env.JWT_USER, "password": process.env.JWT_PASSWORD}, 
            { headers: { 'Content-Type': 'application/json' } } )
        
        const jwt = login.data.jwt

        // mint polygon
        let polygonMint;
        const polyData = {}
        polyData.id = data.id;
        polyData.ethTokenId = ethTokenId;

        polygonMint = await axios.post(process.env.BUTCHER_API + '/mint', polyData, {
            headers: {
                'authorization' : 'Bearer ' + jwt,
                'Content-Type' : 'application/json'
            }
        }) ;

        console.log("POLYGON MINT =>", polygonMint)
        console.log("POLYGON TOKEN =>", polygonMint.data.polygonTokenId)

        return {
            success: true,
            status: "Minting complete",
            polygonTokenId: polygonMint.data.polygonTokenId,
        }

    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
       }    
    }


    
}



