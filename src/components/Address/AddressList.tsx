"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Eye, Plus } from "lucide-react";
import toast from "react-hot-toast";
import {
  getAllAddresses,
  removeAddress,
  getAddressById,
} from "@/Services/AddressService";
import { useRouter } from "next/navigation";

export default function AddressList({ token }: { token: string | null }) {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<any>(null); // For view popup
  const [loading, setLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const router = useRouter();

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const data = await getAllAddresses(token);
      if (data.status === "success") setAddresses(data.data || []);
    } catch {
      toast.error("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const data = await removeAddress(id, token);
      if (data.status === "success") {
        toast.success("Deleted");
        fetchAddresses();
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleView = async (id: string) => {
    try {
      const data = await getAddressById(id, token);
      if (data.status === "success") setSelectedAddress(data.data);
    } catch {
      toast.error("Failed to fetch address");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Addresses</h1>

        <Button onClick={() => router.push("/profile/Address/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Address
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : addresses.length === 0 ? (
        <p>No addresses yet</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <Card key={addr._id} className="p-4">
              <p className="font-semibold">{addr.name}</p>
              <p>{addr.details}</p>
              <p>{addr.city}</p>
              <p>{addr.phone}</p>

              <div className="flex justify-end gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleView(addr._id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => setDeleteTarget(addr._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* View Address Popup */}
      {selectedAddress && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full relative">
            <h2 className="text-xl font-semibold mb-4">{selectedAddress.name}</h2>
            <p className="mb-2">
              <span className="font-semibold">Details:</span> {selectedAddress.details}
            </p>
            <p className="mb-2">
              <span className="font-semibold">City:</span> {selectedAddress.city}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Phone:</span> {selectedAddress.phone}
            </p>
            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setSelectedAddress(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Popup */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this address?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(deleteTarget)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}