import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useArticles } from '../context/ArticlesContext';
import ArticleResult from '../components/ArticleResult';

const ResultPage = () => {
  const { articleId } = useParams();
  const { getArticleById } = useArticles();
  const article = getArticleById(articleId);
  
  // Set page title
  useEffect(() => {
    document.title = `Analysis Results | Fake News Detector`;
    return () => {
      document.title = 'Fake News Detector';
    };
  }, []);

  return (
    <div className="result-page page-container">
      <ArticleResult article={article} />
    </div>
  );
};

export default ResultPage;