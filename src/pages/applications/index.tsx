import { Head } from 'components/layout/Head'
import { CardList } from 'components/layout/CardList'
import { Text } from '@chakra-ui/react'
import { pools } from '@/pools'
import React from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { Input } from '@nextui-org/react'

export default function Applications() {
  return (
    <>
      <Head />

      <main>
        {/*<HeadingComponent as="h2">Nexth Examples</HeadingComponent>*/}
        <div className="max-w-full px-2 py-2 md:py-5">
          <Input
            isClearable
            radius="lg"
            classNames={{
              input: ['bg-transparent', 'text-black/90 dark:text-white/90', 'placeholder:text-default-700/50 dark:placeholder:text-white/60'],
              innerWrapper: 'bg-transparent',
              inputWrapper: [
                'shadow-xl',
                'bg-default-200/50',
                'dark:bg-default/60',
                'backdrop-blur-xl',
                'backdrop-saturate-200',
                'hover:bg-default-200/70',
                'dark:hover:bg-default/70',
                'group-data-[focused=true]:bg-default-200/50',
                'dark:group-data-[focused=true]:bg-default/60',
                '!cursor-text',
              ],
            }}
            placeholder="Search..."
            startContent={<SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
          />
        </div>
        <CardList
          title={
            <>
              <Text fontWeight="bold" fontSize={{ base: '1xl', md: '2xl' }} mx={3.5}>
                Pools{' '}
                <Text as="span" opacity={0.5} fontSize={{ base: '4xs', md: '5xs' }}>
                  ({pools.length})
                </Text>
              </Text>
            </>
          }
          intro={<Text opacity={0.5}>Only the pools with the current network will be displayed. Please switch the network for other pools.</Text>}
          items={pools}
        />
      </main>
    </>
  )
}
