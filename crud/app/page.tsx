import AddForm from "./components/AddForm";
import { ProductsList } from "./components/ProductsList";
export default function Home() {
  return (
    <div className="mt-5 flex justify-center flex-col p-3 items-center">
      <AddForm />
      <ProductsList />
    </div>
  );
}
