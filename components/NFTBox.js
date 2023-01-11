import { useState, useEffect } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import prismStakingAbi from "../constants/PrismStaking.json";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import nftAbi from "../constants/IpfsNft.json";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";
import UpdateListingModal from "./UpdateListingModal";
import ListItemModal from "./ListItemModal";

const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr;

  const separator = "...";
  const seperatorLength = separator.length;
  const charsToShow = strLen - seperatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

export default function NFTBox({
  price,
  nftAddress,
  tokenId,
  marketplaceAddress,
  prismStakingAddress,
  seller,
  isListed,
  isActive,
  toStake,
}) {
  const { isWeb3Enabled, account, chainId } = useMoralis();
  const [imageURI, setImageURI] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showListItemModal, setShowListItemModal] = useState(false);
  const hideUpdateModal = () => setShowUpdateModal(false);
  const hideListItemModal = () => setShowListItemModal(false);
  const dispatch = useNotification();
  const { runContractFunction } = useWeb3Contract();

  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  });

  const { runContractFunction: buyItem } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "buyItem",
    msgValue: price,
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
    },
  });

  const { runContractFunction: cancelListing } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: "cancelListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
    },
  });

  async function approveAndStake() {
    console.log("Approvin nft contract...");

    const approveOptions = {
      abi: nftAbi,
      contractAddress: nftAddress,
      functionName: "approve",
      params: {
        to: prismStakingAddress,
        tokenId: tokenId,
      },
    };

    await runContractFunction({
      params: approveOptions,
      onSuccess: () => handleApproveStakeSuccess(tokenId),
      onError: (error) => {
        console.log(error);
      },
    });
  }

  async function handleApproveStakeSuccess(tokenId) {
    console.log("Ok! Now time to list");
    const listOptions = {
      abi: prismStakingAbi,
      contractAddress: prismStakingAddress,
      functionName: "stake",
      params: {
        tokenIds: [tokenId],
      },
    };

    await runContractFunction({
      params: listOptions,
      onSuccess: handleStakeSuccess,
      onError: (error) => console.log(error),
    });
  }

  async function handleStakeSuccess(tx) {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "NFT staked",
      title: "NFT staked",
      position: "topR",
    });
  }

  async function updateUI() {
    const tokenURI = await getTokenURI();
    // We are going to cheat a little here...
    if (tokenURI) {
      // IPFS Gateway: A server that will return IPFS files from a "normal" URL.
      const requestURL = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      const tokenURIResponse = await (await fetch(requestURL)).json();
      const imageURI = tokenURIResponse.image;
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      setImageURI(imageURIURL);
      setTokenName(tokenURIResponse.name);
      // We could render the Image on our sever, and just call our sever.
      // For testnets & mainnet -> use moralis server hooks
      // Have the world adopt IPFS
      // Build our own IPFS gateway
    }
    // get the tokenURI
    // using the image tag from the tokenURI, get the image
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled, chainId]);

  let isOwnedByUser = seller === account || seller === undefined;
  let formattedSellerAddress = isOwnedByUser
    ? "you"
    : truncateStr(seller || "", 15);

  const handleButtonClick = () => {
    isOwnedByUser
      ? setShowUpdateModal(true)
      : buyItem({
          onError: (error) => console.log(error),
          onSuccess: () => handleBuyItemSuccess(),
        });
  };

  const handleCancelButtonClick = () => {
    cancelListing({
      onError: (error) => console.log(error),
      onSuccess: () => handleCancelItemSuccess(),
    });
  };

  const handleListButtonClick = () => {
    setShowListItemModal(true);
  };

  const handleBuyItemSuccess = () => {
    dispatch({
      type: "success",
      message: "Item bought!",
      title: "Item Bought",
      position: "topR",
    });
  };

  const handleCancelItemSuccess = () => {
    dispatch({
      type: "success",
      message: "Item canceled!",
      title: "Item canceled",
      position: "topR",
    });
  };

  return (
    <div>
      <div>
        {imageURI ? (
          <div>
            <ListItemModal
              isVisible={showListItemModal}
              tokenId={tokenId}
              marketplaceAddress={marketplaceAddress}
              nftAddress={nftAddress}
              onClose={hideListItemModal}
            />
            <UpdateListingModal
              isVisible={showUpdateModal}
              tokenId={tokenId}
              marketplaceAddress={marketplaceAddress}
              nftAddress={nftAddress}
              onClose={hideUpdateModal}
            />
            <div className="rounded-lg bg-gradient-to-r from-pink-500/50 via-red-500/50 to-yellow-500/50 p-[2px]">
              <div className="flex flex-col rounded-lg bg-[rgb(31,32,32)] mx-auto">
                <div className="p-4 gap-2">
                  <div className="flex flex-row justify-between">
                    <h3 className="text-md font-bold text-slate-300">
                      Prism #{tokenId}
                    </h3>
                    {price && (
                      <h3 className="font-bakbak font-bold text-md text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-red-600">
                        {ethers.utils.formatUnits(price, "ether")} ETH
                      </h3>
                    )}
                  </div>
                  <div className="flex flex-row justify-between">
                    <h3 className="flex justify-start text-[9px] text-slate-300 pb-1">
                      Owned by {formattedSellerAddress}
                    </h3>
                    {tokenName == "uncommon" ? (
                      <h3 className="flex justify-start text-[10px] font-bold text-blue-300 pb-1">
                        {tokenName}
                      </h3>
                    ) : tokenName == "rare" ? (
                      <h3 className="flex justify-start text-[10px] font-bold text-purple-500 pb-1">
                        {tokenName}
                      </h3>
                    ) : tokenName == "common" ? (
                      <h3 className="flex justify-start text-[10px] font-bold text-gray-500 pb-1">
                        {tokenName}
                      </h3>
                    ) : tokenName == "legendary" ? (
                      <h3 className="flex justify-start text-[10px] text-orange-500 pb-1">
                        {tokenName}
                      </h3>
                    ) : (
                      <p></p>
                    )}
                  </div>

                  <img
                    src={imageURI}
                    alt="nftbox"
                    className="flex justify-center items-center mx-auto w-[200px] h-[200px] pb-2"
                  />
                  <div className="flex flex-row p-1 gap-2 justify-center">
                    {isActive ? (
                      <div hidden={!isOwnedByUser || !isListed || toStake}>
                        <button
                          type="button"
                          className="flex items-center h-fit py-2 px-[15px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                          disabled={!isWeb3Enabled}
                          onClick={handleButtonClick}
                        >
                          <span className="font-bold text-xs text-white">
                            UPDATE
                          </span>
                        </button>
                      </div>
                    ) : (
                      <div hidden={!isActive && !isListed}>
                        <div className="py-1 text-md font-bold text-slate-300">
                          Currently Listed
                        </div>
                      </div>
                    )}
                    <div
                      hidden={
                        !isOwnedByUser ||
                        !isListed ||
                        toStake ||
                        (isOwnedByUser && !isActive)
                      }
                    >
                      <button
                        type="button"
                        className="flex items-center h-fit py-2 px-[20px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                        disabled={!isWeb3Enabled}
                        onClick={handleCancelButtonClick}
                      >
                        <span className="font-bold text-xs text-white">
                          CANCEL
                        </span>
                      </button>
                    </div>
                    <div hidden={isOwnedByUser || !isListed || toStake}>
                      <button
                        type="button"
                        className="flex items-center h-fit py-2 px-[20px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                        disabled={!isWeb3Enabled}
                        onClick={handleButtonClick}
                      >
                        <span className="font-bold text-xs text-white">
                          BUY
                        </span>
                      </button>
                    </div>
                    <div
                      hidden={
                        !isOwnedByUser ||
                        isListed ||
                        toStake ||
                        (isOwnedByUser && isListed)
                      }
                    >
                      <button
                        type="button"
                        className="flex items-center h-fit py-2 px-[20px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                        disabled={!isWeb3Enabled}
                        onClick={handleListButtonClick}
                      >
                        <span className="font-bold text-xs text-white">
                          LIST ITEM
                        </span>
                      </button>
                    </div>
                    <div hidden={!toStake || (isOwnedByUser && isListed)}>
                      <button
                        type="button"
                        className="flex items-center h-fit py-2 px-[20px] bg-gradient-to-r from-pink-500 to-orange-300 rounded-[32px] gap-[12px]"
                        disabled={!isWeb3Enabled}
                        onClick={approveAndStake}
                      >
                        <span className="font-bold text-xs text-white">
                          STAKE
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
