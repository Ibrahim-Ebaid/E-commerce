// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Loader, Trash2, Eye } from "lucide-react";
// import toast from "react-hot-toast";
// import {
//   getAllAddresses,
//   addAddress,
//   removeAddress,
//   getAddressById,
// } from "../../Services/AddressService";

// /* ================= Schema ================= */

// const addressSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   details: z.string().min(3, "Details must be at least 3 characters"),
//   phone: z
//     .string()
//     .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
//   city: z.string().min(2, "City is required"),
// });

// type AddressFormValues = z.infer<typeof addressSchema>;

// interface Props {
//   token: string | null;
// }

// export default function AddressManager({ token }: Props) {
//   const [addresses, setAddresses] = useState<any[]>([]);
//   const [selectedAddress, setSelectedAddress] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [formLoading, setFormLoading] = useState(false);
//   const [deleteAddressId, setDeleteAddressId] = useState<string | null>(null);

//   const form = useForm<AddressFormValues>({
//     resolver: zodResolver(addressSchema),
//     defaultValues: {
//       name: "",
//       details: "",
//       phone: "",
//       city: "",
//     },
//   });

//   /* ================= Fetch Addresses ================= */
//   const fetchAddresses = async () => {
//     setLoading(true);
//     try {
//       const data = await getAllAddresses(token);
//       if (data.status === "success") setAddresses(data.data || []);
//       else toast.error(data.message || "Failed to fetch addresses");
//     } catch {
//       toast.error("Network error while fetching addresses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAddresses();
//   }, []);

//   /* ================= Add Address ================= */
//   const onSubmit = async (values: AddressFormValues) => {
//     setFormLoading(true);
//     try {
//       const data = await addAddress(values, token);
//       if (data.status === "success") {
//         toast.success("Address added successfully 🎉");
//         form.reset();
//         fetchAddresses();
//       } else {
//         toast.error(data.message || "Failed to add address");
//       }
//     } catch {
//       toast.error("Network error while adding address");
//     } finally {
//       setFormLoading(false);
//     }
//   };

//   const handleDelete = (id: string) => {
//     setDeleteAddressId(id); // open modal
//   };

//   /* ================= View Specific Address ================= */
//   const handleView = async (id: string) => {
//     try {
//       const data = await getAddressById(id, token);
//       if (data.status === "success") setSelectedAddress(data.data);
//       else toast.error(data.message || "Failed to fetch address");
//     } catch {
//       toast.error("Network error while fetching address");
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
//       {/* ===== Add Address Form ===== */}
//       <Card className="w-full max-w-md shadow-lg rounded-xl p-6 mb-8 border border-gray-200 bg-white">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Add New Address
//         </h2>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">Address Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Home, Work..."
//                       {...field}
//                       className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="details"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">Details</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Apartment, Street..."
//                       {...field}
//                       className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">Phone</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="010xxxxxxxx"
//                       {...field}
//                       className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="city"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-gray-700">City</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Giza"
//                       {...field}
//                       className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//               type="submit"
//               disabled={formLoading}
//             >
//               {formLoading ? (
//                 <Loader className="animate-spin h-5 w-5 mr-2 inline" />
//               ) : (
//                 "Add Address"
//               )}
//             </Button>
//           </form>
//         </Form>
//       </Card>

//       {/* ===== Address List ===== */}
//       <div className="w-full max-w-2xl">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//           Your Addresses
//         </h2>
//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : addresses.length === 0 ? (
//           <p className="text-center text-gray-400">No addresses found</p>
//         ) : (
//           <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {addresses.map((addr) => (
//               <Card
//                 key={addr._id}
//                 className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow flex flex-col justify-between border border-gray-200"
//               >
//                 <div>
//                   <p className="font-semibold text-gray-800 text-lg">
//                     {addr.name}
//                   </p>
//                   <p className="text-gray-500">{addr.details}</p>
//                   <p className="text-gray-500">{addr.city}</p>
//                   <p className="text-gray-500">{addr.phone}</p>
//                 </div>
//                 <div className="mt-4 flex gap-2 justify-end">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="hover:bg-gray-100"
//                     onClick={() => handleView(addr._id)}
//                   >
//                     <Eye className="w-4 h-4" />
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     className="hover:bg-red-600 hover:text-white"
//                     onClick={() => handleDelete(addr._id)}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </Card>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* ===== Selected Address ===== */}
//       {selectedAddress && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <Card className="relative w-full max-w-md p-6 bg-white rounded-xl shadow-xl border border-gray-200">
//             {/* Close Button */}
//             <button
//               onClick={() => setSelectedAddress(null)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
//             >
//               ✕
//             </button>

//             <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//               Selected Address
//             </h3>

//             <div className="space-y-2 text-gray-700 text-center">
//               <p>
//                 <span className="font-semibold">Name:</span>{" "}
//                 {selectedAddress.name}
//               </p>
//               <p>
//                 <span className="font-semibold">Details:</span>{" "}
//                 {selectedAddress.details}
//               </p>
//               <p>
//                 <span className="font-semibold">Phone:</span>{" "}
//                 {selectedAddress.phone}
//               </p>
//               <p>
//                 <span className="font-semibold">City:</span>{" "}
//                 {selectedAddress.city}
//               </p>
//             </div>

//             <div className="mt-6 flex justify-center">
//               <Button
//                 onClick={() => setSelectedAddress(null)}
//                 variant="outline"
//               >
//                 Close
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}

//       {deleteAddressId && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//           onClick={() => setDeleteAddressId(null)} // click outside to cancel
//         >
//           <Card
//             className="relative w-full max-w-sm p-6 bg-white rounded-xl shadow-xl border border-gray-200"
//             onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
//           >
//             <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
//               Delete Address
//             </h3>
//             <p className="text-gray-600 text-center mb-6">
//               Are you sure you want to delete this address?
//             </p>

//             <div className="flex justify-center gap-4">
//               <Button
//                 variant="outline"
//                 onClick={() => setDeleteAddressId(null)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="destructive"
//                 onClick={async () => {
//                   if (!deleteAddressId) return;
//                   try {
//                     const data = await removeAddress(deleteAddressId, token);
//                     if (data.status === "success") {
//                       toast.success("Address deleted!");
//                       fetchAddresses();
//                     } else {
//                       toast.error(data.message || "Failed to delete address");
//                     }
//                   } catch {
//                     toast.error("Network error while deleting address");
//                   } finally {
//                     setDeleteAddressId(null);
//                   }
//                 }}
//               >
//                 Delete
//               </Button>
//             </div>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
Form,
FormControl,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { addAddress } from "@/Services/AddressService";
import { useRouter } from "next/navigation";

const addressSchema = z.object({
  name: z.string().min(2),
  details: z.string().min(3),
  phone: z.string().regex(/^01[0125][0-9]{8}$/),
  city: z.string().min(2),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddAddressForm({ token }: { token: string | null }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: { name: "", details: "", phone: "", city: "" },
  });

  const onSubmit = async (values: AddressFormValues) => {
    setLoading(true);
    try {
      const data = await addAddress(values, token);

      if (data.status === "success") {
        toast.success("Address added successfully 🎉");
        router.push("/profile");
      } else {
        toast.error(data.message || "Failed to add address");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  }; // ←←← VERY IMPORTANT (you missed this)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-md p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Add New Address
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field}/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? <Loader className="animate-spin"/> : "Save Address"}
            </Button>

          </form>
        </Form>
      </Card>
    </div>
  );
}
