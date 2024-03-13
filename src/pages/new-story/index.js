import NewStory from "@/components/stories/NewStory";
import { useRouter } from "next/navigation";

const Index = (props) => {
  const router = useRouter();

  const addStoryHandler = async (enteredStoryData) => {
    const response = await fetch("/api/new-story", {
      method: "POST",
      body: JSON.stringify(enteredStoryData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/");
    }
  };

  return <NewStory onAddStory={addStoryHandler} />;
};

export default Index;
