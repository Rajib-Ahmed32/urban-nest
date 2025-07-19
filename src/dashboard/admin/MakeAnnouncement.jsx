import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import axios from "../../services/apiClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MakeAnnouncement = () => {
  const { firebaseUser, loading: authLoading } = useAuth();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset } = useForm();
  const { toast } = useToast();

  useEffect(() => {
    const getToken = async () => {
      if (firebaseUser) {
        const fetchedToken = await firebaseUser.getIdToken();
        setToken(fetchedToken);
      }
    };
    getToken();
  }, [firebaseUser]);

  const onSubmit = async (data) => {
    setError(null);
    setSubmitting(true);

    try {
      await axios.post(
        "/announcements/create",
        { title: data.title, description: data.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Announcement Posted",
        description: "Your announcement has been posted successfully.",
        variant: "success",
      });
      reset();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post announcement.");
      toast({
        title: "Error",
        description:
          err.response?.data?.message || "Failed to post announcement.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#f9f9f7]">
        <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-[#f9f9f7] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-orange-600 mb-6">
        Make an Announcement
      </h2>

      {error && (
        <p className="mb-4 text-red-600 font-semibold text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            type="text"
            placeholder="Enter announcement title"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            placeholder="Write your announcement here..."
            rows={5}
            {...register("description", { required: true })}
          />
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting...
            </>
          ) : (
            "Post Announcement"
          )}
        </Button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
