import {
    HuddleClientProvider,
    getHuddleClient,
    useHuddleStore
} from "@huddle01/huddle01-client";
// import PeerVideoAudioElem from "../../components/PeerVideoAudioElem";
// import MeVideoElem from "../../components/MeVideoElem";

const huddleClient = getHuddleClient(process.env.HUDDLE_KEY);
const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
const lobbyPeers = useHuddleStore((state) => state.lobbyPeers);
const roomState = useHuddleStore((state) => state.roomState);
const recordingState = useHuddleStore((state) => state.recordingState);
const recordings = useHuddleStore((state) => state.recordings);

const handleJoin = async () => {
    try {
        await huddleClient.join("dev", {
            address: "0x15900c698ee356E6976e5645394F027F0704c8Eb",
            wallet: "",
            ens: "axit.eth",
        });

        console.log("joined");
    } catch (error) {
        console.log({ error });
    }
};
