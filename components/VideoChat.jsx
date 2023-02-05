import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "../components/PeerVideoAudioElem";
import MeVideoElem from "../components/MeVideoElem";
import { Button, Grid } from "@nextui-org/react";
import { useState } from "react";
import { Text } from "@nextui-org/react";
import { ethers } from "ethers";
import { Spacer } from "@nextui-org/react";
import ABI from "../contracts/abi.json";

const contractAddress = "0x2BA5f008CD1Eedc9836f89b4f64d036668B0D816";

function VideoChat(id) {
  const huddleClient = getHuddleClient(
    "58464e10c43b6db20610a6634f6b4ab8f0ae0860239a1255b6e80735dca2b69e"
  );
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const recordingState = useHuddleStore((state) => state.recordingState);
  const recordings = useHuddleStore((state) => state.recordings);
  const [webcam, setWebcam] = useState(false);
  const [callStatus, setCallStatus] = useState(false);
  const [claimNFT, setClaimNFT] = useState(false);

  const [buttonText, setButtonText] = useState("Claim NFT");

  const handleJoin = async () => {
    try {
      await huddleClient
        .join(id, {
          address: "0x15900c698ee356E6976e5645394F027F0704c8Eb",
          wallet: "",
          ens: "axit.eth",
        })
        .then((res) => {
          setCallStatus(true);
        });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  const provider = new ethers.providers.JsonRpcProvider(
    "https://chain-node.5ire.network"
  );

  const wallet = new ethers.Wallet(
    "0x2188eca5e482056749f8c5615a2245d6f8cf127b64aa85374f80533756675ee4",
    provider
  );

  async function claim() {
    console.log("This function work");
    console.log(wallet.address);
    const contractInstance = new ethers.Contract(contractAddress, ABI, wallet);
    console.log("Minting!!");
    try {
      const tx = await contractInstance
        .mint("0x4aB65FEb7Dc1644Cabe45e00e918815D3acbFa0a", 1, 1, "0x00")
        .then((res) => {
          alert("NFT Minted Successfully!");
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <HuddleClientProvider value={huddleClient}>
      <div className="App grid grid-cols-2 ">
        <div className="grid v-screen place-items-center">
          {claimNFT ? (
            <div className="grid v-screen place-items-center">
              <Text color="#93c5fd">
                Your rewards for this Video Session are here!
              </Text>
              <Button onClick={claim}>Claim NFT</Button>
            </div>
          ) : (
            <div>
              {!callStatus ? (
                <div className="grid v-screen place-items-center">
                  <Text color="#93c5fd">We have found your tribe!</Text>
                  <Button color="gradient" auto onClick={handleJoin}>
                    Start Call
                  </Button>
                </div>
              ) : (
                <div>
                  <div>
                    <MeVideoElem />

                    <div>
                      {lobbyPeers.map((peer) => (
                        <div>{peer.peerId}</div>
                      ))}
                    </div>

                    <Spacer y={0.5}></Spacer>
                    <Text color="#93c5fd">Your Tribe:</Text>

                    <div className="peers-grid">
                      {peersKeys.map((key) => (
                        <PeerVideoAudioElem
                          key={`peerId-${key}`}
                          peerIdAtIndex={key}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="card">
                    {webcam ? (
                      <Button
                        color="gradient"
                        auto
                        onClick={() => {
                          {
                            setWebcam(true);
                            huddleClient.enableWebcam();
                          }
                        }}
                      >
                        Enable Webcam
                      </Button>
                    ) : (
                      <Button
                        color="gradient"
                        auto
                        onClick={() => {
                          setWebcam(false);
                          huddleClient.disableWebcam();
                        }}
                      >
                        Disable Webcam
                      </Button>
                    )}
                    <Button
                      color="warning"
                      onClick={() => {
                        {
                          huddleClient.close();
                          setClaimNFT(true);
                        }
                      }}
                    >
                      Leave Call
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </HuddleClientProvider>
  );
}

export default VideoChat;
