import ReportedList from "@/components/report/ReportedList";
import { useSession } from "next-auth/react";
import { MongoClient } from "mongodb";

const index = (props) => {
  const { data: session } = useSession();

  if (session?.user.role !== "admin") {
    return (
      <>
        <p>You are not authorized to view this page</p>
      </>
    );
  }
  return (
    <>
      {/* Dodac liste zgloszonych postow po kolorze */}
      <ReportedList reports={props.reports} />
    </>
  );
};

export default index;

export async function getServerSideProps() {
  require("dotenv").config();
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  const db = client.db("storiesDB");
  const reportsCollection = await db.collection("reports");
  const reportsCursor = await reportsCollection.find(
    {},
    { projection: { reportText: 1, storyId: 1 } }
  );
  const reports = await reportsCursor.toArray();
  client.close();

  return {
    props: {
      reports: JSON.parse(JSON.stringify(reports)),
    },
  };
}
