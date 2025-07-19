import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "../../services/apiClient";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const ManageCoupons = () => {
  const { firebaseUser } = useAuth();

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
      toast.error("Failed to fetch coupons");
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
      toast.error("Not authenticated");
      return;
    }
    try {
      await axios.post("/coupons/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Coupon created!");
      fetchCoupons();
      setOpen(false);
      setForm({ code: "", percentage: "", description: "" });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create coupon");
    }
  };

  const toggleAvailability = async (id, currentStatus) => {
    if (!token) {
      toast.error("Not authenticated");
      return;
    }
    try {
      await axios.patch(
        `/coupons/${id}`,
        { available: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Coupon availability updated");
      fetchCoupons();
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Manage Coupons</h2>
        <Button onClick={() => setOpen(true)}>Add Coupon</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Code</th>
              <th className="px-4 py-2 text-left">Discount %</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Available</th>
              <th className="px-4 py-2 text-left">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : coupons.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  No coupons found.
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => (
                <tr key={coupon._id} className="border-t">
                  <td className="px-4 py-2">{coupon.code}</td>
                  <td className="px-4 py-2">{coupon.percentage}%</td>
                  <td className="px-4 py-2">{coupon.description}</td>
                  <td className="px-4 py-2">
                    {coupon.available ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>Add New Coupon</DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <div>
              <Label>Coupon Code</Label>
              <Input
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Discount Percentage</Label>
              <Input
                type="number"
                value={form.percentage}
                onChange={(e) =>
                  setForm({ ...form, percentage: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageCoupons;
