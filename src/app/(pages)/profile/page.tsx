import AddressList from "@/components/Address/AddressList";
import { getUserToken } from "@/app/(pages)/Helpers/getUserToken";

export default async function Profile() {
const token = await getUserToken();

return <AddressList token={token} />;
}
