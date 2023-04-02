import React, { createContext, useState } from 'react';

const ButcherContext = createContext();

const ButcherContextProvider = ({ children }) => {
	const [img, setImg] = useState('');
    const [imgBlob, setImgBlob] = useState('');
    const [metadata, setMetadata] = useState([]);
    const [tokenContract, setTokenContract] = useState('');
    const [tokenId, setTokenId] = useState('');
    const [chain, setChain] = useState('');
    const [butcheredImage, setButcheredImage] = useState('');
    const [ethTx, setEthTx] = useState('');
    const [polygonTx, setPolygonTx] = useState('');
    const [walletAddress, setWalletAddress ] = useState('');

	return (
		<ButcherContext.Provider value={{ 
                                        img, setImg,
                                        imgBlob, setImgBlob,
                                        metadata, setMetadata,
                                        tokenContract, setTokenContract,
                                        tokenId, setTokenId,
                                        chain, setChain,
                                        butcheredImage, setButcheredImage,
                                        ethTx, setEthTx,
                                        polygonTx, setPolygonTx,
                                        walletAddress, setWalletAddress
                                    }}>
			{children}
		</ButcherContext.Provider>
	);
};

export { ButcherContext, ButcherContextProvider };
