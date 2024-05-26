import Image from "next/image";
import AddPrduct from '../components/AddProduct'
import AddCategory from "@/components/AddCategory";
export default function Home() {
  return (
    <>
     <AddPrduct />
    <AddCategory />
    </>
  );
}
