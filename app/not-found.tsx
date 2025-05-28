import NotFoundClient from "@/components/NotFoundClient"

export default function NotFoundPage() {
  return (
    <NotFoundClient
      title="404 - Page Not Found"
      message="Sorry, we couldn't find the page you were looking for."
      suggestions={[
        "Check the URL for typos",
        "Visit our homepage to start fresh",
        "Browse our blog for interesting articles",
        "Use the search feature to find specific content",
      ]}
    />
  )
}
