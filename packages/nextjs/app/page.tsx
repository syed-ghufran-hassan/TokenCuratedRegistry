"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import SubmitTopic from './components/SubmitTopic';
import VoteForTopic from './components/VoteForTopic';
import ChallengeTopic from './components/ChallengeTopic';
import ResolveChallenge from './components/ResolveChallenge';

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <div className="block text-4xl font-bold">
              <div className="inline-block relative w-10 h-10 align-bottom mr-2">
                <Image alt="Base logo" className="cursor-pointer" fill src="/Base_Symbol_Blue.svg" />
              </div>
              Token Curated Registry
            </div>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          {/* New Components */}
          <div className="mt-16">
            <SubmitTopic />
            <VoteForTopic />
            <ChallengeTopic />
            <ResolveChallenge />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
