import { createFileRoute } from "@tanstack/react-router";
import { SecretHairCareApp } from "@/components/secret-hair-care-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Secret Hair Care App Prototype" },
      {
        name: "description",
        content:
          "Premium iPhone-first mobile app prototype for Secret Hair Care with AI assessment, expert consultation, shopping, payment, and usage tracking.",
      },
      { property: "og:title", content: "Secret Hair Care App Prototype" },
      {
        property: "og:description",
        content:
          "Explore the complete personalized hair-care mobile flow: questionnaire, smart kit recommendations, expert booking, checkout, and long-term tracking.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <SecretHairCareApp />;
}
