import Head from 'next/head'
import { Inter, Tenor_Sans } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { AppContext } from "@/../context/AppContext"
import { useContext } from "react";
import { Textarea, Grid, useInput, Spacer, Button } from "@nextui-org/react";
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { account, connectWallet, error } = useContext(AppContext);
  return (
    <>
      <Head>
        <title>Video Chat</title>
        <meta name="description" content="Video Call Application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <div className={styles.card}>
          <h2>
            Wallet <span className="block"></span>
          </h2>
          {account ? (
            <div className="account-box">
              <p className="shadow-border">Connected</p>
            </div>
          ) : (
            <button className="btn shadow-border" onClick={connectWallet}>
              Connect
            </button>
          )}
          {error && <p className={`error shadow-border`}>{`Error: ${error}`}</p>}
          </div>
          <div>
            <Link href="/users/0">Profile</Link>
          </div>
        </div>

        <video className={styles.center}/>

        <div className={styles.center}>
           <Textarea 
            minRows={10}
            maxRows={12}
            width={800}
            labelPlaceholder="Write your thoughts and feelings" 
            size="xl"
            />
            <Spacer y={0.5} />
            <div className={styles.card}>
              <h2 className={inter.className}>
                Find a Match 
              </h2>
              <p className={inter.className}>
                We will find a video call match for you. You will have 5 minutes max to have a conversation with them.
              </p>
            </div>
        </div>
        
      </main>
    </>
  )
}
