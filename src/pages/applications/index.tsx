import { Head } from "components/layout/Head";
import { CardList } from "components/layout/CardList";
import { Text } from "@chakra-ui/react";
import TokenIcon from "assets/icons/token.png";
import { pools } from "../../pools";

export const ExampleItems = [
  // {
  //   title: "Sign-in with Ethereum",
  //   description: "Sign-in with Ethereum is a new form of authentication that enables users to control their identity with their Ethereum account.",
  //   image: [AuthIcon.src],
  //   url: "/applications/siwe"
  // },
  // {
  //   title: "Gitcoin Passport",
  //   description:
  //     "Gitcoin Passport is an identity protocol that proves your trustworthiness without needing to collect personally identifiable information.",
  //   image: [PassportIcon.src],
  //   url: "/applications/passport"
  // },
  // {
  //   title: "Custom Contract",
  //   description: "This example shows a custom Solidity smart contract deployed using Hardhat. You can find sample contract under /contracts.",
  //   image: [CustomIcon.src],
  //   url: "/applications/custom-message"
  // },
  // {
  //   title: "Send Ether",
  //   description: "Sending Ether to another address is the most basic, common transaction that you can do.",
  //   image: [EtherIcon.src],
  //   url: "/applications/send-ether"
  // },
  // {
  //   title: "Send ERC20 Token",
  //   description: "ERC20 introduces a standard interface for fungible tokens. Use this example to send any ERC20 to another address.",
  //   image: [TokenIcon.src],
  //   url: "/applications/send-erc20"
  // },
  // {
  //   title: "Mint NFT",
  //   description: "A Non-Fungible Token (NFT) is used to identify something or someone in a unique way. Use this ERC721 example to mint your own NFT.",
  //   image: [NFTIcon.src],
  //   url: "/applications/mint-nft"
  // },
  {
    title: "More support soon",
    description: "We're putting more pools on the shelves. Follow our official account to get discounts and airdrops first",
    image: [TokenIcon.src],
    url: "/"
  }
];

export default function Examples() {
  // @ts-ignore
  // @ts-ignore
  const items = pools.concat(ExampleItems)
  return (
    <>
      <Head />

      <main>
        {/*<HeadingComponent as="h2">Nexth Examples</HeadingComponent>*/}
        <CardList title="Pools" intro={
          <Text pb={4}>
            Put your funds to work by providing liquidity.
            <br />
            Providing liquidity to a pool allows you to earn a percentage of the pools traded volume as well as any extra
            rewards if the pool is incentivized.
          </Text>
        } items={items} />
      </main>
    </>
  );
}
