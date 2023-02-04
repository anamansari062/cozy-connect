import {
  HuddleClientProvider,
  getHuddleClient,
} from "@huddle01/huddle01-client";

import { useHuddleStore } from "@huddle01/huddle01-client/store";
import PeerVideoAudioElem from "../components/PeerVideoAudioElem";
import MeVideoElem from "../components/MeVideoElem";

function VideoChat(id) {
  const huddleClient = getHuddleClient("58464e10c43b6db20610a6634f6b4ab8f0ae0860239a1255b6e80735dca2b69e");
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
  const roomState = useHuddleStore((state) => state.roomState);
  const recordingState = useHuddleStore((state) => state.recordingState);
  const recordings = useHuddleStore((state) => state.recordings);

  const handleJoin = async () => {
    try {
      await huddleClient.join(id, {
        address: "0x15900c698ee356E6976e5645394F027F0704c8Eb",
        wallet: "",
        ens: "axit.eth",
      });

      console.log("joined");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <HuddleClientProvider value={huddleClient}>
      <div className="App grid grid-cols-2">
        <div>
            <h2 className={`text-${!roomState.joined ? "red" : "green"}`}>
                Room Joined:&nbsp;{roomState.joined.toString()}
            </h2>
            <div> 
                <MeVideoElem />

                <div>
                    {lobbyPeers.map((peer) => (
                    <div>{peer.peerId}</div>
                    ))}
                </div>

                {peersKeys[0] && <h2>Peers</h2>}

                <div className="peers-grid">
                    {peersKeys.map((key) => (
                    <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} />
                    ))}
                </div>
            </div>   

            <div className="card">
                <button onClick={handleJoin}>Join Room</button>
                <button onClick={() => huddleClient.enableWebcam()}>
                Enable Webcam
                </button>
                <button onClick={() => huddleClient.disableWebcam()}>
                Disable Webcam
                </button>
            </div>
        </div>
      </div>
    </HuddleClientProvider>
  );
}

export default VideoChat;
