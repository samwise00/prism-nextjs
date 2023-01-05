import { Modal, Input, useNotification } from "web3uikit";
import { useState } from "react";
import { useWeb3Contract } from "react-moralis";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import nftAbi from "../constants/IpfsNft.json";
import { ethers } from "ethers";

export default function UpdateListingModal({
  nftAddress,
  tokenId,
  isVisible,
  marketplaceAddress,
  onClose,
}) {
  const dispatch = useNotification();
  const { runContractFunction } = useWeb3Contract();

  const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0);

  async function approveAndList() {
    console.log("Approving...");
    const price = ethers.utils.parseEther(priceToUpdateListingWith || "0");

    const approveOptions = {
      abi: nftAbi,
      contractAddress: nftAddress,
      functionName: "approve",
      params: {
        to: marketplaceAddress,
        tokenId: tokenId,
      },
    };

    await runContractFunction({
      params: approveOptions,
      onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price),
      onError: (error) => {
        console.log(error);
      },
    });
  }

  async function handleApproveSuccess(nftAddress, tokenId, price) {
    console.log("Ok! Now time to list");
    const listOptions = {
      abi: nftMarketplaceAbi,
      contractAddress: marketplaceAddress,
      functionName: "listItem",
      params: {
        nftAddress: nftAddress,
        tokenId: tokenId,
        price: price,
      },
    };

    await runContractFunction({
      params: listOptions,
      onSuccess: handleListSuccess,
      onError: (error) => console.log(error),
    });
  }

  async function handleListSuccess(tx) {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "NFT listing",
      title: "NFT listed",
      position: "topR",
    });
  }

  // const handleUpdateListingSuccess = () => {
  //   dispatch({
  //     type: "success",
  //     message: "listing updated",
  //     title: "Listing updated - please refresh (and move blocks)",
  //     position: "topR",
  //   });
  //   onClose && onClose();
  //   setPriceToUpdateListingWith("0");
  // };

  return (
    <Modal
      isVisible={isVisible}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
      onOk={approveAndList}
    >
      <Input
        label="List NFT in L1 Currency (ETH)"
        name="New listing price"
        type="number"
        onChange={(event) => {
          setPriceToUpdateListingWith(event.target.value);
        }}
      />
    </Modal>
  );
}
