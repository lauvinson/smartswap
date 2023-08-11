import {
    useAccount,
    useContractEvent,
    useContractWrite,
    usePrepareContractWrite,
} from 'wagmi'
import {Button, FormControl, FormLabel, Select} from '@chakra-ui/react'
import {useState} from 'react'
import {NextSeo} from 'next-seo'
import {HeadingComponent} from 'components/layout/HeadingComponent'
import {dai_weth_approve_config} from "../../abis";

function Approve() {
    const account = useAccount()
    let [token, setToken] = useState('')
    const spender = dai_weth_approve_config.POOL
    const amount = BigInt(1.15 * 10**77);

    const {
        config,
        error: prepareError,
        isError: isPrepareError,
        isLoading: isPreparing,
    } = usePrepareContractWrite({
        address: token as `0x${string}`,
        abi: dai_weth_approve_config.ABI.approve,
        functionName: 'approve',
        args: [spender, amount],
        enabled: true,
    })

    const {
        data,
        error,
        isLoading: isWriteLoading,
        isError: isWriteError,
        write,
    } = useContractWrite(config)

    useContractEvent({
        address: token as `0x${string}`,
        abi: dai_weth_approve_config.ABI.approve,
        eventName: 'Approval',
        listener(log) {
            console.log(log)
        }
    })

    function submit() {
        write?.()
    }

    return (
        <div>
            <HeadingComponent as="h3">Deposit</HeadingComponent>

            <FormControl>
                <FormLabel>Select Token</FormLabel>

                <Select defaultValue={0} onChange={(e) => setToken(e.target.value)}>
                    <option value={dai_weth_approve_config.token0.address}>{dai_weth_approve_config.token0.name}</option>
                    <option value={dai_weth_approve_config.token1.address}>{dai_weth_approve_config.token1.name}</option>
                </Select>

                <Button mt={4} type="submit" onClick={submit}>
                    Approve
                </Button>

            </FormControl>
        </div>
    )
}

export default function SignExample() {
    const {isConnected} = useAccount()

    if (isConnected) {
        const token0Name = dai_weth_approve_config.token0.name
        const token1Name = dai_weth_approve_config.token1.name
        const swap_name = `${token0Name}-${token1Name} Swap`
        return (
            <div>
                <NextSeo title={swap_name}/>
                <HeadingComponent as="h2">{swap_name}</HeadingComponent>
                <hr />
                <ol>
                    <li>Approve either {token0Name} or {token1Name}, or both</li>
                    <li>Deposit any amounts of {token0Name} or {token1Name}</li>
                    <li>That's it! We do the rest. Withdraw whenever you want.</li>
                </ol>
                <br/>
                <Approve/>
            </div>
        )
    }

    return <div>Connect your wallet first to sign a message.</div>
}
