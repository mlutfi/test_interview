'use client'
import React, { FC, useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { type ResponseData } from '../../types/types';

async function getData() {
  const { BASE_URL_API } = process.env
  const res = await fetch(BASE_URL_API + '/products', {
      headers: {
          "Content-Type": "application/json"
      },
      cache: 'no-cache'
  })
  const data: ResponseData = await res.json()
  if (!res.ok) {
      throw new Error(`Failed to fetch data, ${data.code || res.status} ${data.message || res.statusText}`)
  }
  return data.data
}


const ProductPage: FC = async () => {
  const products = await getData()
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>List Product</h2>
            <p className='text-muted-foreground'>Product</p>
          </div>
          <div className='flex gap-2'>
            <Button className='space-x-1' onClick={() => console.log('test') }>
              <span>Add New</span> <IconPlus size={18} />
            </Button>
          </div>
        </div>
        
        <div className='-mx-4 mt-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={products} columns={columns} />
        </div>
      </Main>
    </>
  )
}
export default ProductPage;