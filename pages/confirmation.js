import Header from "../components/Header";

export default function ConfirmationPage() {
  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto text-center px-4">
        <h1 className="text-center text-5xl mt-12 font-bold">{`You're In!`}</h1>
        <p className="my-10 text-xl">
          You have submitted your ticket request for Sebring 2022!
        </p>
        <p className="mb-10 text-xl">
          Stay tuned to your email for your confirmation number and further
          details once your ticket request is approved.
        </p>
      </div>
    </div>
  );
}
