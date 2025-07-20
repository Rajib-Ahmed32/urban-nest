import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import axios from "../../services/apiClient";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import PageWrapper from "../../components/commonReusableComponents/PageWrapper";

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
      <div className="h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 sm:p-10 md:p-12 max-w-lg mx-auto">
        <h2
          className="text-2xl font-semibold mb-8 text-center tracking-wide"
          style={{ color: "#ec5407" }}
        >
          Make an Announcement
        </h2>

        {error && (
          <p className="mb-6 text-red-600 font-semibold text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Title
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Enter announcement title"
              {...register("title", { required: true })}
              className="bg-gray-50 dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Write your announcement here..."
              rows={5}
              {...register("description", { required: true })}
              className="bg-gray-50 dark:bg-gray-800 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#373634] text-white py-3 rounded-md hover:bg-[#2f2e2d] focus:ring-2 focus:ring-offset-2 focus:ring-[#ec5407]"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Announcement"
            )}
          </Button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default MakeAnnouncement;
