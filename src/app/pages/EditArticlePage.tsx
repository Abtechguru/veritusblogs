import { useParams } from 'react-router';
import { CreateArticlePage } from './CreateArticlePage';

export const EditArticlePage = () => {
  const { id } = useParams<{ id: string }>();

  // In production, this would fetch the article data and populate the form
  // For now, we'll reuse the CreateArticlePage component
  return <CreateArticlePage />;
};
