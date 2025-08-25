'use client'

import { usePathname, useRouter } from "next/navigation";
import HeaderLayout from ".";
import { featureCards } from "@/app/libs/data/feature";

interface FormHeaderProps {

}
const FormHeader = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentTool = pathname.split('/')[1]
  const isHomePage = !currentTool.length
  const header = isHomePage ? "ابزارها" : featureCards.filter(dataItem => dataItem.id === currentTool)[0].title

  function redirectHome() {
    router.push('/')
  }

  return (
    <HeaderLayout header={header ?? ""} action={!isHomePage ? redirectHome : undefined} />
  );
}

export default FormHeader;