import AddAddressForm from "@/components/Address/AddAddressForm";
import { getUserToken } from "@/app/(pages)/Helpers/getUserToken";

export default async function AddAddressPage() {
const token = await getUserToken();

return <AddAddressForm token={token} />;
}
