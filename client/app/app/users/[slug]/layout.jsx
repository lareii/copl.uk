export async function generateMetadata({ params }) {
  return {
    title: params.slug
  };
}

export default function Layout({ children }) {
  return children;
}
