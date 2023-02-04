import Head from 'next/head'
import { Inter, Tenor_Sans } from '@next/font/google'
import { useContext } from "react";
import { Textarea, Grid, useInput, Spacer, Button } from "@nextui-org/react";
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Video Chat</title>
        <meta name="description" content="Video Call Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2 >*Add Video Screen Here*</h2>
        <Spacer y={2}/>
        <div >
           <Textarea 
            minRows={10}
            maxRows={12}
            width={800}
            labelPlaceholder="Write your thoughts and feelings" 
            size="xl"
            color="success"
            />
            <Spacer y={0.5} />
            <div  className="relative inline-block px-4 py-2 font-medium group ">
              <button
                className="relative inline-block px-4 py-2 font-medium group "
              >
                <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-tertiary border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-tertiary"></span>
                <span className="relative text-black">Find Matches</span>
              </button>
              <Spacer y={0.5}/>
              <h2 className="text-primary">
                We will find a video call match for you. You will have 5 minutes max to have a conversation with them.
              </h2>
            </div>
        </div>
      </main>
    </>
  )
}
