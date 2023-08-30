import DaiIcon from "./assets/icons/dai.svg";
import EthIcon from "./assets/icons/eth.svg";
import UsdtIcon from "./assets/icons/usdt.svg"

export const approveAbi = {
  approve: [
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address"
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256"
        }
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool"
        }
      ],
      stateMutability: "nonpayable",
      type: "function"
    }
  ]
}
export const pools = [
  {
    id: 1,
    token0: {
      name: "DAI",
      address: "0x6b175474e89094c44da98b954eedeac495271d0f",
      icon: DaiIcon.src
    },
    token1: {
      name: "ETH",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      icon: EthIcon.src
    },
    pool: "0x1df52680C823ceA6A154B3187711f8a4F641c453",
    fee: 500,
    apr: 3.58
  },
  {
    id: 2,
    token0: {
      name: "ETH",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      icon: EthIcon.src
    },
    token1: {
      name: "USDT",
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
      icon: UsdtIcon.src
    },
    pool: "0x228246199Dc09e0643fa92eC8268e175986f4e74",
    fee: 3000,
    apr: 5.01
  }
];
