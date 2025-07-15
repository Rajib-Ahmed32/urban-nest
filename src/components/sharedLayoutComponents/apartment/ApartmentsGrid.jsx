import ApartmentCard from "./ApartmentCard";

export default function ApartmentsGrid({
  apartments,
  userAgreement,
  agreeingId,
  onAgreementClick,
}) {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {apartments.map((apt) => {
        const alreadyRequested = userAgreement?.apartmentNo === apt.apartmentNo;

        return (
          <ApartmentCard
            key={apt._id}
            apt={apt}
            alreadyRequested={alreadyRequested}
            agreeingId={agreeingId}
            onAgreementClick={onAgreementClick}
          />
        );
      })}
    </div>
  );
}
