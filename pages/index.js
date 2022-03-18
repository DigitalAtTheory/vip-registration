import ClosedForm from "../components/ClosedForm";
import Form from "../components/Form";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header badges={true} />
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl md:text-4xl font-medium text-center my-10">
          Sebring VIP Hospitality Registration
        </h1>
        <ClosedForm />
      </div>
    </>
  );
}
