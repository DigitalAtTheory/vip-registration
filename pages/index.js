import Form from "../components/Form";
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-medium text-center my-10">
          Sebring VIP Hospitality Registration
        </h1>
        <Form />
      </div>
    </>
  );
}
