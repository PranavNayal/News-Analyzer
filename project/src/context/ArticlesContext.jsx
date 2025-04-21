import { createContext, useState, useContext, useEffect } from 'react';

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  // Initialize with stored articles or empty array
  const [articles, setArticles] = useState(() => {
    const savedArticles = localStorage.getItem('analyzedArticles');
    return savedArticles ? JSON.parse(savedArticles) : [];
  });

  // Save articles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('analyzedArticles', JSON.stringify(articles));
  }, [articles]);

  // Add a new analyzed article
  const addArticle = (article) => {
    const newArticle = {
      ...article,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      votes: { upvotes: 0, downvotes: 0 },
      comments: []
    };
    
    setArticles(prevArticles => [newArticle, ...prevArticles]);
    return newArticle.id;
  };

  // Add a comment to an article
  const addComment = (articleId, comment) => {
    const newComment = {
      id: Date.now().toString(),
      text: comment,
      date: new Date().toISOString()
    };
    
    setArticles(prevArticles => 
      prevArticles.map(article => 
        article.id === articleId
          ? { ...article, comments: [newComment, ...article.comments] }
          : article
      )
    );
  };

  // Vote on an article
  const voteOnArticle = (articleId, voteType) => {
    setArticles(prevArticles => 
      prevArticles.map(article => {
        if (article.id === articleId) {
          const updatedVotes = { ...article.votes };
          updatedVotes[voteType] += 1;
          return { ...article, votes: updatedVotes };
        }
        return article;
      })
    );
  };

  // Get a specific article by ID
  const getArticleById = (id) => {
    return articles.find(article => article.id === id) || null;
  };

  return (
    <ArticlesContext.Provider value={{ 
      articles, 
      addArticle, 
      addComment, 
      voteOnArticle,
      getArticleById
    }}>
      {children}
    </ArticlesContext.Provider>
  );
};

// Custom hook for using the articles context
export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticlesProvider');
  }
  return context;
};

export default ArticlesContext;