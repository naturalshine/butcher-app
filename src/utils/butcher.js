const axios = require('axios');

export const butcherNft = async(minterAddress, imgBlob, metadata, tokenContract, tokenId, chain) => {

    function blobToBase64(blob) {
        return new Promise((resolve, _) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(blob);
        });
      }

    //make metadata
    try{
        const butcheredMetadata = new Object();
        butcheredMetadata.name = "Butchered " + metadata.nftName;
        butcheredMetadata.description = "IT'S THE BUTCHER, HOPE YOU'RE HUNGRY!";
        butcheredMetadata.attributes = [];
        butcheredMetadata.attributes.push({"trait_type": "project", "value": "BUTCHER"});
        butcheredMetadata.attributes.push({"trait_type": "butcheredContract", "value": tokenContract});
        if(chain !== "solana"){
            butcheredMetadata.attributes.push({"trait_type": "butcheredTokenId", "value": tokenId});
        }
        butcheredMetadata.attributes.push({"trait_type": "butcheredChain", "value": chain});
        butcheredMetadata.attributes.push({"trait_type": "butcheredName", "value": metadata.nftName});
        butcheredMetadata.attributes.push({"trait_type": "butcheredDescription", "value":  metadata.description});
        butcheredMetadata.attributes.push({"trait_type": "butcheredOwner", "value":  metadata.owner});
        butcheredMetadata.attributes.push({"trait_type": "butcheredSymbol", "value":  metadata.symbol});
        butcheredMetadata.attributes.push({"trait_type": "butcheredRoyaltyHolder", "value":  metadata.royaltyHolder});
        butcheredMetadata.attributes.push({"trait_type": "butcheredRoyalty", "value":  metadata.royaltyAmount});
        butcheredMetadata.attributes.push({"trait_type": "butcheredImageUrl", "value":  metadata.originalImage});
        butcheredMetadata.attributes.push({"trait_type": "butcheredMetadataUrl", "value":  metadata.token_uri});
        butcheredMetadata.attributes.push({"trait_type": "butcherMinter", "value": minterAddress});    
        
        // add existing attributes from original NFT
        butcheredMetadata.attributes = butcheredMetadata.attributes.concat(metadata.attributes);

        console.log("BUTCHERED METADATA SENDING =>", butcheredMetadata);
        // login to get token
        const login = await axios.post(process.env.NEXT_PUBLIC_BUTCHER_LOGIN, {"username": process.env.NEXT_PUBLIC_JWT_USER, "password": process.env.NEXT_PUBLIC_JWT_PASSWORD}, 
                { headers: { 'Content-Type': 'application/json' } } )
        
        // api jwt
        const jwt = login.data.jwt
        
        let imgReturn, imgToSend, nft;    

        // turn image into blob to send to api
        imgToSend = await blobToBase64(imgBlob);

        // post image to api
        let data = {"image": imgToSend}
        imgReturn = await axios.post(process.env.NEXT_PUBLIC_BUTCHER_API + '/upload', data, {
            headers: {
                'authorization' : 'Bearer ' + jwt,
                'Content-Type' : 'application/json'
            }
        }) 
        
        // post metadata to api
        nft = await axios.post(process.env.NEXT_PUBLIC_BUTCHER_API + '/butcher', 
            {"metadata": [butcheredMetadata], "butcherId": imgReturn.data.id }, 
            { headers: { 'Content-Type': 'application/json', 'authorization' : 'Bearer ' + jwt } 
        });
                
        return {
            success: true,
            status: "NFT butchered. Minting tokens.",
            data: nft.data,
        }

    } catch(error){
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }    
    }
        
}



