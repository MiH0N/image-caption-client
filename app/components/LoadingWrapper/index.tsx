import Box from "@mui/material/Box";
import { FC, PropsWithChildren } from "react";
import Image from 'next/image'
import Loading from '@/public/images/loading.webp'

interface LoadingWrapperProps {
  isLoading: boolean
}

const LoadingWrapper: FC<PropsWithChildren<LoadingWrapperProps>> = ({ isLoading, children }) => {
  return isLoading ?
    <Box width={'100%'} height={'100%'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
      <Image src={Loading} alt="" width={180} height={180} />
    </Box>
    : children;
}

export default LoadingWrapper;