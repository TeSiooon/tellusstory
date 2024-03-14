import ReportedList from "@/components/report/ReportedList";
import { MongoClient } from "mongodb";
import CheckRole from "@/components/admin/CheckRole";

const index = (props) => {
  return (
    <CheckRole>
      <ReportedList reports={props.reports} />
    </CheckRole>
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
