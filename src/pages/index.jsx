import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { Inter, Tenor_Sans } from '@next/font/google'
import { useContext, useState } from "react";
import { Textarea, Grid, useInput, Spacer, Button } from "@nextui-org/react";
import Link from "next/link";
import getEmotionsFromSentence from "controllers/openaiController";
import VideoChat from "components/VideoChat";
import { ethers } from "ethers";
import ABI from "../../contracts/abi.json";
import { Text } from "@nextui-org/react";

const contractAddress = "0x2BA5f008CD1Eedc9836f89b4f64d036668B0D816";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [thoughts, setThoughts] = useState("");
  const [emotions, setEmotions] = useState();


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
          alert("NFT Minted");
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }

  const getEmotions = async() => {
  const emotions = await getEmotionsFromSentence(thoughts);
  setEmotions(emotions);
  }

  return (
    <div>
      <Head>
        <title>CosyConnect</title>
        <meta name="description" content="CosyConnect Us" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='bg-peace grid v-screen place-items-center w-screen overflow-hidden'
      >
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, $blue300 -20%, $pink300 50%",
          }}
          weight="bold"
        >
          CozyConnect Us
        </Text>
        <Text color="#93c5fd">
           Find your tribe, talk with people who share common grounds.
        </Text>
        <Spacer y={5}/>
        { emotions && <VideoChat id={"dev"} className="grid v-screen place-items-center"/> }
        { !emotions &&  <div className='grid v-screen place-items-center'>
           <Textarea 
            minRows={10}
            maxRows={12}
            width={800}
            labelPlaceholder="Write your thoughts and feelings"
            size="xl"
            status="secondary"
            id="thoughts"
            onChange={(e) => setThoughts(e.target.value)}
          />
          <Spacer y={0.5} />
          <div className="relative inline-block px-4 py-2 font-medium group grid v-screen place-items-center ">
            <button
              className="relative inline-block px-4 py-2 font-medium group "
              onClick={async () => {
                await getEmotions();
              }}
            >
              <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-tertiary border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-tertiary"></span>
              <span className="relative text-black">Find Matches</span>
            </button>
            <Spacer y={0.5} />
            <Text color="#93c5fd">
              We will find a video call match for you. You will have 5 minutes
              max to have a conversation with them.
            </Text>
        
          </div>
        </div>
}
      </div>
    </div>
  );
}
