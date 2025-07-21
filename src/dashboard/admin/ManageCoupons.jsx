import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../services/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ManageCoupons = () => {
  const { firebaseUser } = useAuth();
  const { toast } = useToast();

  const [token, setToken] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    code: "",
    percentage: "",
    description: "",
  });

  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getToken = async () => {
      if (firebaseUser) {
        const idToken = await firebaseUser.getIdToken();
        setToken(idToken);
      }
    };
    getToken();
  }, [firebaseUser]);

  const fetchCoupons = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await axios.get("/coupons", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupons(res.data);
    } catch (err) {
      toast({
        title: "Failed to fetch coupons",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast({
        title: "Not authenticated",
        description: "Please log in to create a coupon.",
        variant: "destructive",
      });
      return;
    }
    try {
      await axios.post("/coupons/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: "Coupon Created",
        description: "Your coupon has been successfully added.",
      });
      fetchCoupons();
      setOpen(false);
      setForm({ code: "", percentage: "", description: "" });
    } catch (err) {
      toast({
        title: "Failed to create coupon",
        description: err?.response?.data?.message || "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    if (!token) {
      toast({
        title: "Authentication error",
        description: "Please login again.",
        variant: "destructive",
      });
      return;
    }
    try {
      await axios.patch(
        `/coupons/${id}`,
        { available: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Updated Successfully",
        description: "Coupon availability has been changed.",
      });
      fetchCoupons();
    } catch {
      toast({
        title: "Failed to update",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 bg-white rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-[#ec5407]">
          Manage Coupons
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#373634] text-white hover:bg-[#2c2b2a] px-5 py-2 rounded-md font-medium">
              + Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-xl p-6 bg-[#f9f9f7]">
            <DialogHeader>
              <DialogTitle className="text-lg text-[#ec5407] font-semibold">
                Add New Coupon
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div>
                <Label className="text-sm text-gray-700">Coupon Code</Label>
                <Input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label className="text-sm text-gray-700">
                  Discount Percentage
                </Label>
                <Input
                  type="number"
                  min={0}
                  value={form.percentage}
                  onChange={(e) =>
                    setForm({ ...form, percentage: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label className="text-sm text-gray-700">Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-center items-center pt-2">
                <Button
                  type="submit"
                  className="py-3 px-6 rounded-md bg-[#373634] text-white hover:opacity-90"
                >
                  Submit
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Discount %</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : coupons.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  No coupons found.
                </td>
              </tr>
            ) : (
              coupons.map((coupon, idx) => (
                <tr
                  key={coupon._id}
                  className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                >
                  <td className="px-4 py-3 font-medium">{coupon.code}</td>
                  <td className="px-4 py-3">{coupon.percentage}%</td>
                  <td className="px-4 py-3">{coupon.description}</td>
                  <td className="px-4 py-3">
                    {coupon.available ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-3">
                    <Switch
                      checked={coupon.available}
                      onCheckedChange={() =>
                        toggleAvailability(coupon._id, coupon.available)
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCoupons;
