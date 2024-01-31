"use client";

export default function DashboardWelcome({
  isExample,
}: {
  isExample: boolean;
}) {
  if (!isExample) {
    return (
      <>
        <h1 className="text-3xl pb-4 pt-2 text-[hsl(317,100%,81%)]">
          Your freezer! :)
        </h1>
        {/* <p className="text-orange-300 text-justify sm:text-center w-full sm:min-w-auto sm:max-w-[60%] px-4 leading-[1.1] sm:leading-snug text-sm sm:text-auto sm:p-auto pb-4  ">
          Do not use this freezer for your important personal items - all users
          of this website have access to this freezer and can change or remove
          the items in it!
        </p> */}
      </>
    );
  } else {
    return (
      <>
        <h1 className="text-3xl pb-4 pt-2 text-[hsl(317,100%,81%)]">
          EXAMPLE freezer! :)
        </h1>
        <p className="text-orange-300 sm:text-base text-justify sm:text-center w-full sm:min-w-auto sm:max-w-[60%] px-4 leading-[1.1] sm:leading-snug text-sm sm:text-auto sm:p-auto pb-4  ">
          Do not use this freezer for your important personal items - all users
          of this website have access to this freezer and can change or remove
          the items in it!
        </p>
      </>
    );
  }
}
