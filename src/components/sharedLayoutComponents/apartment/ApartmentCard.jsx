import { Handshake, Loader2, CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ApartmentCard({
  apt,
  alreadyRequested,
  agreeingId,
  onAgreementClick,
}) {
  return (
    <Card className="flex flex-col bg-[#f8f8f6] shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={apt.image}
          alt={`Apartment ${apt.apartmentNo}`}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg text-[#373536]">
            Apartment No: {apt.apartmentNo}
          </CardTitle>
          <CardDescription className="text-[#373536]">
            Floor: {apt.floor}
          </CardDescription>
          <CardDescription className="text-[#373536]">
            Block: {apt.block}
          </CardDescription>
          <CardDescription className="font-semibold text-[#373536]">
            Rent: ৳{apt.rent}
          </CardDescription>
        </div>

        {alreadyRequested ? (
          <Button
            disabled
            className="w-full mt-4 mx-auto py-2 px-4 flex items-center justify-center gap-2 bg-green-100 text-green-700 border border-green-300 cursor-not-allowed"
          >
            <CheckCircle className="h-4 w-4 text-[#dd4b08]" />
            Already Requested
          </Button>
        ) : (
          <Button
            className="w-full mx-auto py-2 px-4 mt-4 flex items-center justify-center gap-2 bg-[#373536] text-white hover:bg-[#b63a06] disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            onClick={() => onAgreementClick(apt._id)}
            disabled={agreeingId === apt._id}
          >
            {agreeingId === apt._id ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                Submitting...
              </>
            ) : (
              <>
                <Handshake className="h-4 w-4 text-white" />
                Agreement
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
