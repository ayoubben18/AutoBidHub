import EmptyFilter from "@/app/components/EmptyFilter";
import React from "react";

const Page = ({ searchParams }: { searchParams: { callbackUrl: string } }) => {
  return (
    <EmptyFilter
      title="You need to be logged-in to access this page"
      subtitle="Please click below to sign-in"
      callbackUrl={searchParams.callbackUrl}
      showLogin={true}
    />
  );
};

export default Page;
