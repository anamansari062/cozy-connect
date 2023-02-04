import { useAccount, useConnect, useEnsName, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import toast from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";



const Navbar = (props) => {

  const { address, isConnected } = useAccount();
  const { setIsAuthenticated } = props;
  setIsAuthenticated(isConnected);
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect({
    onSuccess() {
      toast("Account disconnected!", {
        style: {
          border: "2px solid #000",
        },
      });
      setIsAuthenticated(false);
    },
    onError() {
      toast.error("Failed to disconnect account!", {
        style: {
          border: "2px solid #000",
        },
      });
    },
  });
  const { connect } = useConnect({
    chainId: 997,
    connector: new InjectedConnector(),
    onSuccess() {
      toast.success("Account connected!", {
        style: {
          border: "2px solid #000",
        },
      });
      setIsAuthenticated(true);
    },
    onError() {
      toast.error("Error connecting account!", {
        style: {
          border: "2px solid #000",
        },
      });
    },
  });

  return (
    <div id="navbar" className="navbar sticky top-0 z-50 text-tertiary">
      <div className="navbar-end">
        <button
          onClick={() => {
            if (isConnected) {
              disconnect();
            } else {
              connect();
            }
          }}
          className="relative inline-block px-4 py-2 font-medium group "
        >
          <span className="absolute rounded-lg inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-tertiary border-[2px] border-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute rounded-lg inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-tertiary"></span>
          {address ? (
            <span className="relative text-black">
              {address.slice(0, 6) + "..." + address.slice(-4)}
            </span>
          ) : (
            <span className="relative text-black">Connect Wallet</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
